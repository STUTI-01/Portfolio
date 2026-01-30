import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";
import { Camera, ArrowLeft, MapPin } from "lucide-react";
import ContentSkeletonLoader from "@/components/ContentSkeleton";
import EmptyState from "@/components/EmptyState";

interface Photo {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: string | null;
  location: string | null;
  is_featured: boolean | null;
}

const ThroughMyLens = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filter, setFilter] = useState("all");
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("gallery_photos").select("*").order("display_order");
      if (data) setPhotos(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const categories = ["all", ...new Set(photos.map((p) => p.category).filter(Boolean))];
  const filtered = filter === "all" ? photos : photos.filter((p) => p.category === filter);

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Link to="/wanderer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Wanderer
        </Link>

        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-accent/40" />
            <Camera className="w-5 h-5 text-accent/70" />
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-accent/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poetry font-bold text-foreground mb-3">Through My Lens</h1>
          <p className="text-muted-foreground/70 font-poetry italic max-w-md mx-auto">A visual diary of moments captured through photography.</p>
        </motion.div>

        <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm border transition-all duration-300 ${
                filter === cat ? "border-accent/50 text-accent bg-accent/10" : "border-border/40 text-muted-foreground hover:border-accent/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <ContentSkeletonLoader variant="card" count={6} />
        ) : filtered.length === 0 ? (
          <EmptyState icon={Camera} title="No photos yet" subtitle="The gallery is empty — come back when new moments are captured." />
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((photo, i) => (
              <motion.div
                key={photo.id}
                className="break-inside-avoid group border border-accent/10 rounded-sm overflow-hidden hover:border-accent/25 transition-all duration-300"
                style={{ background: "hsla(30, 15%, 12%, 0.25)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <Link to={`/wanderer/gallery/${photo.id}`} className="block cursor-pointer">
                  {photo.image_url !== "/placeholder.svg" ? (
                    <img src={photo.image_url} alt={photo.title || ""} className="w-full group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="aspect-[4/3] flex items-center justify-center" style={{ background: "hsla(30, 15%, 15%, 0.4)" }}>
                      <Camera className="w-10 h-10 text-accent/15" />
                    </div>
                  )}
                  <div className="p-4">
                    {photo.title && <h3 className="font-poetry font-bold text-sm text-foreground group-hover:text-accent transition-colors">{photo.title}</h3>}
                    {photo.location && (
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-accent/40" />
                        <span className="text-[10px] font-mono text-muted-foreground/50">{photo.location}</span>
                      </div>
                    )}
                    <span className="text-[10px] font-mono text-accent/50 inline-block mt-1">
                      View details →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
    </PageTransition>
  );
};

export default ThroughMyLens;
