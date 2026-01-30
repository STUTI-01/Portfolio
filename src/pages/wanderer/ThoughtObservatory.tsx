import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, ArrowLeft, Tag } from "lucide-react";
import ContentSkeletonLoader from "@/components/ContentSkeleton";
import EmptyState from "@/components/EmptyState";

interface Thought {
  id: string;
  title: string;
  content: string;
  category: string | null;
  tags: string[] | null;
  cover_image_url: string | null;
  created_at: string;
}

const categoryColors: Record<string, string> = {
  essay: "text-secondary",
  reflection: "text-accent",
  science: "text-primary",
  personal: "text-name-highlight",
};

const ThoughtObservatory = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("thoughts").select("*").order("created_at", { ascending: false });
      if (data) setThoughts(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const categories = ["all", ...new Set(thoughts.map((t) => t.category).filter(Boolean))];
  const filtered = filter === "all" ? thoughts : thoughts.filter((t) => t.category === filter);

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link to="/wanderer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Wanderer
        </Link>

        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-accent/40" />
            <BookOpen className="w-5 h-5 text-accent/70" />
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-accent/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poetry font-bold text-foreground mb-3">The Thought Observatory</h1>
          <p className="text-muted-foreground/70 font-poetry italic max-w-lg mx-auto">Scientific explorations, technical essays, spiritual reflections, and the spaces between.</p>
        </motion.div>

        <div className="flex items-center justify-center gap-3 flex-wrap mb-14">
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
          <ContentSkeletonLoader variant="list" count={4} />
        ) : filtered.length === 0 ? (
          <EmptyState icon={BookOpen} title="No thoughts yet" subtitle="The observatory awaits its first observation." />
        ) : (
          <div className="space-y-8">
            {filtered.map((thought, i) => (
              <motion.article
                key={thought.id}
                className="border border-accent/10 rounded-sm p-6 md:p-8 hover:border-accent/20 transition-all duration-300"
                style={{ background: "hsla(30, 15%, 12%, 0.25)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${categoryColors[thought.category || ""] || "text-muted-foreground/50"}`}>
                      {thought.category}
                    </span>
                    <h2 className="font-poetry text-xl md:text-2xl font-bold text-foreground mt-1">{thought.title}</h2>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/40 whitespace-nowrap">
                    {new Date(thought.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                  </span>
                </div>

                <div className="w-8 h-[1px] bg-accent/20 my-4" />

                <p className="text-sm text-muted-foreground/70 leading-relaxed line-clamp-3">
                  {thought.content}
                </p>

                {thought.tags && thought.tags.length > 0 && (
                  <div className="flex items-center gap-2 mt-4 flex-wrap">
                    <Tag className="w-3 h-3 text-accent/30" />
                    {thought.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-accent/40 tracking-wider">#{tag}</span>
                    ))}
                  </div>
                )}

                <Link to={`/wanderer/thoughts/${thought.id}`} className="text-[10px] font-mono text-accent/50 hover:text-accent transition-colors mt-3 inline-block">
                  Read more →
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
    </PageTransition>
  );
};

export default ThoughtObservatory;
