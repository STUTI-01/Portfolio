import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ADMIN_PASSCODE = Deno.env.get("ADMIN_PASSCODE") || "282108";

async function categorizeSkills(techStack: string[], supabase: any) {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY || techStack.length === 0) return;

  // Fetch existing categories
  const { data: existing } = await supabase
    .from("skill_categories")
    .select("*")
    .order("display_order");

  const existingCategories = existing || [];
  const existingMap: Record<string, string[]> = {};
  for (const cat of existingCategories) {
    existingMap[cat.category] = cat.skills || [];
  }

  const prompt = `You are a skill categorizer for a software engineer's portfolio.

Given these tech keywords: ${JSON.stringify(techStack)}

And these existing categories with their skills:
${JSON.stringify(existingMap, null, 2)}

Categorize each keyword into an appropriate category. If a keyword already exists in a category, skip it. If no existing category fits, create a new one.

Common categories: Languages, Backend & Systems, Cloud & DevOps, AI/ML, Databases, Tools, Frontend, Mobile, Security, Data Engineering.

Return ONLY a JSON object where keys are category names and values are arrays of ALL skills that should be in that category (existing + new ones).`;

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are a precise JSON-only responder. Return only valid JSON, no markdown, no explanation." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      console.error("AI gateway error:", response.status);
      return;
    }

    const aiResult = await response.json();
    const content = aiResult.choices?.[0]?.message?.content || "";
    
    // Extract JSON from response (handle potential markdown wrapping)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in AI response:", content);
      return;
    }

    const categorized: Record<string, string[]> = JSON.parse(jsonMatch[0]);

    // Upsert categories
    let order = existingCategories.length;
    for (const [category, skills] of Object.entries(categorized)) {
      const existingCat = existingCategories.find(
        (c: any) => c.category.toLowerCase() === category.toLowerCase()
      );

      if (existingCat) {
        // Merge skills (deduplicate)
        const merged = Array.from(new Set([...(existingCat.skills || []), ...skills]));
        await supabase
          .from("skill_categories")
          .update({ skills: merged })
          .eq("id", existingCat.id);
      } else {
        order++;
        await supabase
          .from("skill_categories")
          .insert({ category, skills, display_order: order });
      }
    }
  } catch (e) {
    console.error("AI categorization error:", e);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const contentType = req.headers.get("content-type") || "";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Handle file uploads via multipart form
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const passcode = formData.get("passcode") as string;
      if (passcode !== ADMIN_PASSCODE) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const file = formData.get("file") as File;
      const folder = (formData.get("folder") as string) || "uploads";

      if (!file) {
        return new Response(JSON.stringify({ error: "No file provided" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("wanderer-media")
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("wanderer-media")
        .getPublicUrl(fileName);

      return new Response(
        JSON.stringify({ url: urlData.publicUrl, path: fileName }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Handle JSON requests (CRUD)
    const { passcode, action, table, data, id } = await req.json();

    if (passcode !== ADMIN_PASSCODE) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const allowedTables = [
      "adornments",
      "thoughts",
      "bird_logs",
      "gallery_photos",
      "poems",
      "detail_images",
      "experiences",
      "projects",
      "education",
      "honors",
      "skill_categories",
      "resumes",
      "site_content",
      "site_stats",
      "contact_submissions",
      "page_visits",
    ];
    if (!allowedTables.includes(table)) {
      return new Response(JSON.stringify({ error: "Invalid table" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let result;

    switch (action) {
      case "create": {
        const { data: created, error } = await supabase
          .from(table)
          .insert(data)
          .select()
          .single();
        if (error) throw error;
        result = created;

        // Auto-categorize skills when a project is created
        if (table === "projects" && data.tech_stack?.length > 0) {
          await categorizeSkills(data.tech_stack, supabase);
        }
        // Also auto-categorize when experience is added
        if (table === "experiences" && data.tech_stack?.length > 0) {
          await categorizeSkills(data.tech_stack, supabase);
        }
        break;
      }
      case "update": {
        const { data: updated, error } = await supabase
          .from(table)
          .update(data)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        result = updated;

        // Re-categorize on update too
        if ((table === "projects" || table === "experiences") && data.tech_stack?.length > 0) {
          await categorizeSkills(data.tech_stack, supabase);
        }
        break;
      }
      case "delete": {
        const { error } = await supabase.from(table).delete().eq("id", id);
        if (error) throw error;
        result = { success: true };
        break;
      }
      case "list": {
        const { data: list, error } = await supabase
          .from(table)
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        result = list;
        break;
      }
      default:
        return new Response(JSON.stringify({ error: "Invalid action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
