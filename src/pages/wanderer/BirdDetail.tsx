import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import WandererDetailPage from "@/components/WandererDetailPage";
import { MapPin, TreePine } from "lucide-react";

const BirdDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const { data } = await supabase.from("bird_logs").select("*").eq("id", id).single();
      if (data) setItem(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground/50 font-mono text-sm">Loading...</div>;
  if (!item) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground/50 font-mono text-sm">Not found</div>;

  return (
    <WandererDetailPage
      entityType="bird_logs"
      entityId={item.id}
      backPath="/wanderer/birds"
      backLabel="Back to Field Notes"
      coverImage={item.image_url}
      title={item.common_name || item.species_name}
      subtitle={item.species_name}
      footnote={item.footnote}
      meta={
        <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">
          {item.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-accent/30" /> {item.location}
            </span>
          )}
          {item.habitat && (
            <span className="flex items-center gap-1">
              <TreePine className="w-3 h-3 text-accent/30" /> {item.habitat}
            </span>
          )}
          {item.sighting_date && (
            <span>
              {new Date(item.sighting_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          )}
        </div>
      }
      content={
        <p className="text-foreground/80 leading-relaxed font-poetry text-base md:text-lg">
          {item.description || "No field notes recorded."}
        </p>
      }
    />
  );
};

export default BirdDetail;
