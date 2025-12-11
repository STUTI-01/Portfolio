import { motion } from "framer-motion";
import { Terminal, Zap, Globe, ArrowUp } from "lucide-react";

const quickStats = [
  { icon: Terminal, value: "50K+", label: "Lines of Code", delay: 0.1 },
  { icon: Zap, value: "10+", label: "Production Systems", delay: 0.2 },
  { icon: Globe, value: "6+", label: "Companies", delay: 0.3 },
  { icon: ArrowUp, value: "99.9%", label: "System Uptime", delay: 0.4 },
];

const EngineeringAtScale = () => (
  <section className="relative py-24 px-6 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{
      background: "radial-gradient(ellipse at 50% 50%, hsla(217, 91%, 60%, 0.04) 0%, transparent 70%)",
    }} />

    <div className="max-w-5xl mx-auto relative z-10">
      <motion.div
        className="text-center mb-16"
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
        {quickStats.map((stat) => (
          <motion.div
            key={stat.label}
            className="glass-card p-6 text-center group hover:border-secondary/30 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: stat.delay }}
            whileHover={{ y: -4 }}
          >
            <stat.icon className="w-6 h-6 text-secondary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-2xl md:text-3xl font-display font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Terminal element */}
      <motion.div
        className="mt-16 glass-card p-5 max-w-xl mx-auto font-mono text-xs"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
          <span className="text-muted-foreground ml-2">stuti@systems ~</span>
        </div>
        <div className="space-y-1 text-muted-foreground">
          <p><span className="text-secondary">$</span> cat philosophy.txt</p>
          <p className="text-foreground/80 pl-2">"Great engineering is invisible —</p>
          <p className="text-foreground/80 pl-2"> users should only feel the speed,</p>
          <p className="text-foreground/80 pl-2"> never the complexity."</p>
          <p className="mt-2"><span className="text-secondary">$</span> <span className="animate-cursor-blink border-r-2 border-secondary">&nbsp;</span></p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default EngineeringAtScale;
