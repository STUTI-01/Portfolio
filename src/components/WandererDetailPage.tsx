import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, X, BookmarkCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";

interface DetailImage {
  id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
}

interface WandererDetailPageProps {
  entityType: string;
  entityId: string;
  backPath: string;
  backLabel: string;
  coverImage: string | null;
  title: string;
  subtitle?: string | null;
  content: React.ReactNode;
  footnote?: string | null;
  meta?: React.ReactNode;
}

const WandererDetailPage = ({
  entityType,
  entityId,
  backPath,
  backLabel,
  coverImage,
  title,
  subtitle,
  content,
  footnote,
  meta,
}: WandererDetailPageProps) => {
  const [gallery, setGallery] = useState<DetailImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase
        .from("detail_images")
        .select("*")
        .eq("entity_type", entityType)
        .eq("entity_id", entityId)
        .order("display_order");
      if (data) setGallery(data);
    };
    fetchGallery();
  }, [entityType, entityId]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + gallery.length) % gallery.length : null));
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % gallery.length : null));

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, gallery.length]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Cover Photo */}
        {coverImage && coverImage !== "/placeholder.svg" && (
          <motion.div
            className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </motion.div>
        )}

        <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
          {/* Back link */}
          <Link
            to={backPath}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </Link>

          {/* Title area */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-poetry font-bold text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm font-mono text-accent/60 mt-2 uppercase tracking-wider">
                {subtitle}
              </p>
            )}
            {meta && <div className="mt-3">{meta}</div>}
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Left: Article */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="prose prose-invert max-w-none">
                {content}
              </div>
            </motion.div>

            {/* Right: The Footnote + Gallery */}
            <motion.aside
              className="space-y-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* The Footnote */}
              {footnote && (
                <div
                  className="border border-accent/15 rounded-sm p-6"
                  style={{ background: "hsla(30, 15%, 12%, 0.3)" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <BookmarkCheck className="w-4 h-4 text-accent/60" />
                    <h3 className="text-xs font-mono uppercase tracking-wider text-accent/70">
                      The Footnote
                    </h3>
                  </div>
                  <div className="w-6 h-[1px] bg-accent/20 mb-4" />
                  <p className="text-sm text-muted-foreground/80 leading-relaxed font-poetry italic">
                    {footnote}
                  </p>
                </div>
              )}

              {/* Photo Gallery */}
              {gallery.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground/50 mb-4">
                    Gallery
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {gallery.map((img, i) => (
                      <motion.div
                        key={img.id}
                        className="aspect-square overflow-hidden rounded-sm cursor-pointer border border-accent/10 hover:border-accent/30 transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => openLightbox(i)}
                      >
                        <img
                          src={img.image_url}
                          alt={img.caption || ""}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.aside>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && gallery[lightboxIndex] && (
            <motion.div
              className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              {/* Close */}
              <button
                className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors z-10"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev */}
              {gallery.length > 1 && (
                <button
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
              )}

              {/* Image */}
              <motion.div
                className="max-w-4xl max-h-[80vh] px-12"
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={gallery[lightboxIndex].image_url}
                  alt={gallery[lightboxIndex].caption || ""}
                  className="max-w-full max-h-[70vh] object-contain rounded-sm mx-auto"
                />
                {gallery[lightboxIndex].caption && (
                  <p className="text-center text-sm text-muted-foreground/70 mt-4 font-poetry italic">
                    {gallery[lightboxIndex].caption}
                  </p>
                )}
                <p className="text-center text-[10px] font-mono text-muted-foreground/30 mt-2">
                  {lightboxIndex + 1} / {gallery.length}
                </p>
              </motion.div>

              {/* Next */}
              {gallery.length > 1 && (
                <button
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default WandererDetailPage;
