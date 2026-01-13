import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";
import { Bird, ArrowLeft, MapPin, TreePine } from "lucide-react";

interface BirdLog {
  id: string;
  species_name: string;
  common_name: string | null;
  location: string | null;
  habitat: string | null;
  description: string | null;
  image_url: string | null;
  sighting_date: string | null;
}

const FieldNotes = () => {
  const [logs, setLogs] = useState<BirdLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("bird_logs").select("*").order("sighting_date", { ascending: false });
      if (data) setLogs(data);
      setLoading(false);
    };
    fetch();
  }, []);

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
            <Bird className="w-5 h-5 text-accent/70" />
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-accent/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poetry font-bold text-foreground mb-3">Field Notes — Bird Log</h1>
          <p className="text-muted-foreground/70 font-poetry italic max-w-md mx-auto">Documenting avian encounters across habitats and seasons.</p>
        </motion.div>

        {loading ? (
          <div className="text-center text-muted-foreground/50 py-20 font-mono text-sm">Loading field notes...</div>
        ) : (
          <div className="space-y-6">
            {logs.map((log, i) => (
              <motion.div
                key={log.id}
                className="relative border border-accent/10 rounded-sm p-6 md:p-8 hover:border-accent/20 transition-all duration-300"
                style={{ background: "hsla(30, 15%, 12%, 0.25)" }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-2 top-8 w-4 h-4 rounded-full border-2 border-accent/30 bg-background" />

                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {log.image_url && log.image_url !== "/placeholder.svg" ? (
                    <img src={log.image_url} alt={log.common_name || log.species_name} className="w-24 h-24 object-cover rounded-sm flex-shrink-0" />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center rounded-sm flex-shrink-0" style={{ background: "hsla(30, 15%, 15%, 0.4)" }}>
                      <Bird className="w-8 h-8 text-accent/20" />
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="font-poetry text-lg md:text-xl font-bold text-foreground">{log.common_name || log.species_name}</h2>
                        <p className="text-xs font-mono text-accent/50 italic">{log.species_name}</p>
                      </div>
                      {log.sighting_date && (
                        <span className="text-[10px] font-mono text-muted-foreground/40 whitespace-nowrap">
                          {new Date(log.sighting_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">
                      {log.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-accent/30" /> {log.location}
                        </span>
                      )}
                      {log.habitat && (
                        <span className="flex items-center gap-1">
                          <TreePine className="w-3 h-3 text-accent/30" /> {log.habitat}
                        </span>
                      )}
                    </div>

                    {log.description && (
                      <>
                        <div className="w-6 h-[1px] bg-accent/15" />
                        <p className="text-sm text-muted-foreground/70 leading-relaxed font-poetry italic line-clamp-2">{log.description}</p>
                      </>
                    )}
                    <Link to={`/wanderer/birds/${log.id}`} className="text-[10px] font-mono text-accent/50 hover:text-accent transition-colors inline-block mt-1">
                      Read more →
                    </Link>
                  </div>
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

export default FieldNotes;
