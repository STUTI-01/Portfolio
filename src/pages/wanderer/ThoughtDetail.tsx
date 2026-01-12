import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import WandererDetailPage from "@/components/WandererDetailPage";
import { Tag } from "lucide-react";

const ThoughtDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const { data } = await supabase.from("thoughts").select("*").eq("id", id).single();
      if (data) setItem(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground/50 font-mono text-sm">Loading...</div>;
  if (!item) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground/50 font-mono text-sm">Not found</div>;

  return (
    <WandererDetailPage
      entityType="thoughts"
      entityId={item.id}
      backPath="/wanderer/thoughts"
      backLabel="Back to Thought Observatory"
      coverImage={item.cover_image_url}
      title={item.title}
      subtitle={item.category}
      footnote={item.footnote}
      meta={
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[10px] font-mono text-muted-foreground/40">
            {new Date(item.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          {item.tags && item.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="w-3 h-3 text-accent/30" />
              {item.tags.map((tag: string) => (
                <span key={tag} className="text-[10px] font-mono text-accent/40">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      }
      content={
        <div className="text-foreground/80 leading-relaxed font-poetry text-base md:text-lg whitespace-pre-wrap">
          {item.content}
        </div>
      }
    />
  );
};

export default ThoughtDetail;
