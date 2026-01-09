import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_PASSCODE = "282108";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { passcode, action, table, data, id } = await req.json();

    if (passcode !== ADMIN_PASSCODE) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const allowedTables = ["adornments", "thoughts", "bird_logs", "gallery_photos", "poems"];
    if (!allowedTables.includes(table)) {
      return new Response(JSON.stringify({ error: "Invalid table" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let result;

    switch (action) {
      case "create": {
        const { data: created, error } = await supabase.from(table).insert(data).select().single();
        if (error) throw error;
        result = created;
        break;
      }
      case "update": {
        const { data: updated, error } = await supabase.from(table).update(data).eq("id", id).select().single();
        if (error) throw error;
        result = updated;
        break;
      }
      case "delete": {
        const { error } = await supabase.from(table).delete().eq("id", id);
        if (error) throw error;
        result = { success: true };
        break;
      }
      case "list": {
        const { data: list, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
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
