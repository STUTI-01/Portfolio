import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Zap, Globe, ArrowUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, React.ComponentType<any>> = { Terminal, Zap, Globe, ArrowUp };

const EngineeringAtScale = () => {
  const [stats, setStats] = useState<{ icon: string; value: string; label: string; color: string }[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await (supabase as any).from("site_stats").select("*").order("display_order");
      if (data) setStats(data);
    };
    fetchStats();
  }, []);

  if (stats.length === 0) return null;

  return (
    <section className="relative py-16 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, hsla(142, 71%, 45%, 0.04) 0%, transparent 70%)",
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono text-secondary tracking-[0.3em] uppercase mb-3">
            Impact in Numbers
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Engineering at Scale
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Terminal;
            return (
              <motion.div
                key={stat.label}
                className="glass-card p-6 text-center group hover:border-[hsl(142,71%,45%)]/30 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                <p className="text-2xl md:text-3xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngineeringAtScale;
