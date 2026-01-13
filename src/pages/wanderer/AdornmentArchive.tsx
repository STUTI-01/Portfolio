import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";
import { Gem, ArrowLeft, Sparkles } from "lucide-react";

interface Adornment {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  materials: string | null;
  is_featured: boolean | null;
}

const AdornmentArchive = () => {
  const [adornments, setAdornments] = useState<Adornment[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("adornments")
        .select("*")
        .order("display_order");
      if (data) setAdornments(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const categories = ["all", ...new Set(adornments.map((a) => a.category).filter(Boolean))];
  const filtered = filter === "all" ? adornments : adornments.filter((a) => a.category === filter);

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Back */}
        <Link to="/wanderer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Wanderer
        </Link>

        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-accent/40" />
            <Gem className="w-5 h-5 text-accent/70" />
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-accent/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poetry font-bold text-foreground mb-3">Adornment Archive</h1>
          <p className="text-muted-foreground/70 font-poetry italic max-w-md mx-auto">A curated collection of handcrafted jewellery, each piece carrying a story.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm border transition-all duration-300 ${
                filter === cat
                  ? "border-accent/50 text-accent bg-accent/10"
                  : "border-border/40 text-muted-foreground hover:border-accent/30 hover:text-accent/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center text-muted-foreground/50 py-20 font-mono text-sm">Loading treasures...</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                className="group border border-accent/10 rounded-sm overflow-hidden transition-all duration-300 hover:border-accent/25"
                style={{ background: "hsla(30, 15%, 12%, 0.25)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                {item.image_url && item.image_url !== "/placeholder.svg" ? (
                  <div className="aspect-square overflow-hidden">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="aspect-square flex items-center justify-center" style={{ background: "hsla(30, 15%, 15%, 0.4)" }}>
                    <Gem className="w-12 h-12 text-accent/20" />
                  </div>
                )}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-poetry font-bold text-foreground group-hover:text-accent transition-colors">{item.title}</h3>
                    {item.is_featured && <Sparkles className="w-3.5 h-3.5 text-accent/60" />}
                  </div>
                  {item.description && <p className="text-sm text-muted-foreground/70 leading-relaxed line-clamp-2">{item.description}</p>}
                  {item.materials && (
                    <p className="text-[10px] font-mono text-accent/50 tracking-wider uppercase">{item.materials}</p>
                  )}
                  <Link to={`/wanderer/adornments/${item.id}`} className="text-[10px] font-mono text-accent/50 hover:text-accent transition-colors inline-block mt-1">
                    Read more →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
    </PageTransition>
  );
};

export default AdornmentArchive;
