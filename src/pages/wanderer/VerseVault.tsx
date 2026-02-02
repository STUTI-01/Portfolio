import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";
import { PenTool, ArrowLeft, Sparkles } from "lucide-react";
import ContentSkeletonLoader from "@/components/ContentSkeleton";
import EmptyState from "@/components/EmptyState";

interface Poem {
  id: string;
  title: string;
  content: string;
  language: string;
  theme: string | null;
  is_featured: boolean | null;
}

const VerseVault = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [langFilter, setLangFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("poems").select("*").order("created_at", { ascending: false });
      if (data) setPoems(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const languages = ["all", ...new Set(poems.map((p) => p.language))];
  const filtered = langFilter === "all" ? poems : poems.filter((p) => p.language === langFilter);

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link to="/wanderer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Wanderer
        </Link>

        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-accent/40" />
            <PenTool className="w-5 h-5 text-accent/70" />
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-accent/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poetry font-bold text-foreground mb-3">Verse Vault</h1>
          <p className="text-muted-foreground/70 font-poetry italic max-w-md mx-auto">Poetry in Hindi, English, and Odia — the language of the soul.</p>
        </motion.div>

        {/* Language filter */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-14">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLangFilter(lang)}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm border transition-all duration-300 ${
                langFilter === lang
                  ? "border-accent/50 text-accent bg-accent/10"
                  : "border-border/40 text-muted-foreground hover:border-accent/30"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {loading ? (
          <ContentSkeletonLoader variant="poem" count={3} />
        ) : filtered.length === 0 ? (
          <EmptyState icon={PenTool} title="No verses found" subtitle="Try a different language filter or check back soon." />
        ) : (
          <div className="space-y-12">
            {filtered.map((poem, i) => (
              <motion.div
                key={poem.id}
                className="relative border border-accent/10 rounded-sm p-8 md:p-10"
                style={{ background: "hsla(30, 15%, 12%, 0.25)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-poetry text-xl md:text-2xl font-bold text-foreground">{poem.title}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-mono text-accent/60 uppercase tracking-wider">{poem.language}</span>
                      {poem.theme && <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">• {poem.theme}</span>}
                    </div>
                  </div>
                  {poem.is_featured && <Sparkles className="w-4 h-4 text-accent/50 flex-shrink-0" />}
                </div>
                <div className="w-8 h-[1px] bg-accent/20 mb-6" />
                <pre className="font-poetry text-foreground/80 text-base md:text-lg leading-[1.9] whitespace-pre-wrap">{poem.content}</pre>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
    </PageTransition>
  );
};

export default VerseVault;
