import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import wandererHero from "@/assets/wanderer-hero.jpg";
import profilePhoto from "@/assets/profile-photo.png";
import { Gem, BookOpen, Bird, Camera, PenTool, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: Gem,
    title: "Adornment Archive",
    description: "A curated collection of handcrafted jewellery pieces, each with a story.",
    path: "/wanderer/adornments",
    color: "text-accent",
  },
  {
    icon: BookOpen,
    title: "The Thought Observatory",
    description: "Scientific explorations, technical essays, spiritual reflections, and more.",
    path: "/wanderer/thoughts",
    color: "text-secondary",
  },
  {
    icon: Bird,
    title: "Field Notes — Bird Log",
    description: "Documenting avian encounters across habitats and seasons.",
    path: "/wanderer/birds",
    color: "text-primary",
  },
  {
    icon: Camera,
    title: "Through My Lens",
    description: "A visual diary of moments captured through photography.",
    path: "/wanderer/gallery",
    color: "text-accent",
  },
  {
    icon: PenTool,
    title: "Verse Vault",
    description: "Poetry in Hindi, English, and Odia — the language of the soul.",
    path: "/wanderer/poetry",
    color: "text-secondary",
  },
];

const WandererMode = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Dreamy Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with heavy overlay for dreamy feel */}
        <div className="absolute inset-0">
          <img
            src={wandererHero}
            alt="Dreamy landscape"
            className="w-full h-full object-cover scale-110"
            style={{ filter: "blur(2px) saturate(0.7)" }}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, hsl(var(--background) / 0.7) 0%, hsl(var(--background) / 0.5) 40%, hsl(var(--background) / 0.85) 80%, hsl(var(--background)) 100%)",
          }} />
        </div>

        {/* Dreamy floating particles effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 4 + Math.random() * 6,
                height: 4 + Math.random() * 6,
                left: `${15 + Math.random() * 70}%`,
                top: `${20 + Math.random() * 60}%`,
                background: `hsl(var(--accent) / ${0.15 + Math.random() * 0.2})`,
                filter: "blur(1px)",
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* Profile photo — softer, dreamy treatment */}
          <motion.div
            className="mx-auto mb-10 relative w-40 h-40 md:w-52 md:h-52"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 rounded-full blur-[40px] bg-accent/20" />
            <img
              src={profilePhoto}
              alt="Stuti Mohanty"
              className="w-full h-full object-cover object-top rounded-full relative z-10"
              style={{
                border: "2px solid hsl(var(--accent) / 0.3)",
                boxShadow: "0 0 60px hsl(var(--accent) / 0.15)",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-accent/60" />
              <p className="text-xs font-mono text-accent/70 tracking-[0.4em] uppercase">
                Beyond the code
              </p>
              <Sparkles className="w-4 h-4 text-accent/60" />
            </div>

            <h1 className="text-4xl md:text-6xl font-poetry font-bold text-foreground leading-tight mb-6">
              A soul that writes in
              <br />
              <span className="text-accent italic">verses & visions</span>
            </h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              When the compiler rests, the poet awakens. Here lives the art, the wonder, 
              and the quiet observations of a curious mind.
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="w-6 h-10 mx-auto rounded-full border-2 border-accent/30 flex items-start justify-center p-1.5"
              animate={{ borderColor: ["hsl(var(--accent) / 0.2)", "hsl(var(--accent) / 0.5)", "hsl(var(--accent) / 0.2)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-accent/60"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Grid */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono text-accent/60 tracking-[0.3em] uppercase mb-3">
            Explore
          </p>
          <h2 className="text-3xl md:text-4xl font-poetry font-bold text-foreground">
            Windows to My World
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={section.path} className="block glass-card-hover p-6 space-y-3 h-full">
                <section.icon className={`w-8 h-8 ${section.color}`} />
                <h3 className="font-display font-bold text-lg">{section.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Poetry teaser */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-poetry text-2xl md:text-3xl text-foreground/80 italic max-w-xl mx-auto leading-relaxed">
            "Deep Dive Into,
            <br />
            The World of Poetry"
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WandererMode;
