import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Camera, ArrowLeft, MapPin, Sparkles } from "lucide-react";

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
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
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
          <div className="text-center text-muted-foreground/50 py-20 font-mono text-sm">Loading gallery...</div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((photo, i) => (
              <motion.div
                key={photo.id}
                className="break-inside-avoid group cursor-pointer border border-accent/10 rounded-sm overflow-hidden hover:border-accent/25 transition-all duration-300"
                style={{ background: "hsla(30, 15%, 12%, 0.25)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelectedPhoto(photo)}
              >
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
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-6 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div className="max-w-4xl w-full" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
              {selectedPhoto.image_url !== "/placeholder.svg" ? (
                <img src={selectedPhoto.image_url} alt={selectedPhoto.title || ""} className="w-full rounded-sm" />
              ) : (
                <div className="aspect-video flex items-center justify-center rounded-sm" style={{ background: "hsla(30, 15%, 15%, 0.4)" }}>
                  <Camera className="w-16 h-16 text-accent/15" />
                </div>
              )}
              <div className="mt-4 text-center">
                {selectedPhoto.title && <h2 className="font-poetry text-xl font-bold text-foreground">{selectedPhoto.title}</h2>}
                {selectedPhoto.description && <p className="text-sm text-muted-foreground/70 mt-1">{selectedPhoto.description}</p>}
                {selectedPhoto.location && (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <MapPin className="w-3 h-3 text-accent/40" />
                    <span className="text-xs font-mono text-muted-foreground/50">{selectedPhoto.location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ThroughMyLens;
