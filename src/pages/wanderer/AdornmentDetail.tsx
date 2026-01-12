import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import WandererDetailPage from "@/components/WandererDetailPage";
import { Gem } from "lucide-react";

const AdornmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const { data } = await supabase.from("adornments").select("*").eq("id", id).single();
      if (data) setItem(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground/50 font-mono text-sm">Loading...</div>;
  if (!item) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground/50 font-mono text-sm">Not found</div>;

  return (
    <WandererDetailPage
      entityType="adornments"
      entityId={item.id}
      backPath="/wanderer/adornments"
      backLabel="Back to Adornment Archive"
      coverImage={item.image_url}
      title={item.title}
      subtitle={item.category}
      footnote={item.footnote}
      meta={
        item.materials && (
          <div className="flex items-center gap-2">
            <Gem className="w-3 h-3 text-accent/40" />
            <span className="text-[10px] font-mono text-accent/50 uppercase tracking-wider">{item.materials}</span>
          </div>
        )
      }
      content={
        <p className="text-foreground/80 leading-relaxed font-poetry text-base md:text-lg">
          {item.description || "No description available."}
        </p>
      }
    />
  );
};

export default AdornmentDetail;
