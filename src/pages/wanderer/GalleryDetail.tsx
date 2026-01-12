import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import WandererDetailPage from "@/components/WandererDetailPage";
import { MapPin } from "lucide-react";

const GalleryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const { data } = await supabase.from("gallery_photos").select("*").eq("id", id).single();
      if (data) setItem(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground/50 font-mono text-sm">Loading...</div>;
  if (!item) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground/50 font-mono text-sm">Not found</div>;

  return (
    <WandererDetailPage
      entityType="gallery_photos"
      entityId={item.id}
      backPath="/wanderer/gallery"
      backLabel="Back to Through My Lens"
      coverImage={item.image_url}
      title={item.title || "Untitled"}
      subtitle={item.category}
      footnote={item.footnote}
      meta={
        item.location && (
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-accent/40" />
            <span className="text-[10px] font-mono text-muted-foreground/50">{item.location}</span>
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

export default GalleryDetail;
