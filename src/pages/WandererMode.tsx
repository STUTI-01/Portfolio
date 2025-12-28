import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import wandererHero from "@/assets/wanderer-hero.jpg";
import profilePhoto from "@/assets/profile-photo.png";
import { Gem, BookOpen, Bird, Camera, PenTool, Sparkles, ArrowDown } from "lucide-react";
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
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — full bleed with collage-style images */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Deep gradient background instead of image */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 70% at 30% 20%, hsla(270, 40%, 20%, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 70%, hsla(330, 30%, 18%, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 100% 80% at 50% 100%, hsla(220, 50%, 8%, 0.6) 0%, transparent 40%),
            hsl(var(--background))
          `,
        }} />

        {/* Soft noise texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }} />

        {/* Floating collage images */}
        <motion.div
          className="absolute top-[12%] left-[8%] w-32 h-44 md:w-44 md:h-56 rounded-2xl overflow-hidden shadow-2xl pointer-events-none"
          style={{ y: y1 }}
          initial={{ opacity: 0, rotate: -8 }}
          animate={{ opacity: 0.7, rotate: -8 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <img src={wandererHero} alt="" className="w-full h-full object-cover" style={{ filter: "saturate(0.6) brightness(0.8)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </motion.div>

        <motion.div
          className="absolute bottom-[15%] right-[6%] w-36 h-48 md:w-48 md:h-60 rounded-2xl overflow-hidden shadow-2xl pointer-events-none"
          style={{ y: y2 }}
          initial={{ opacity: 0, rotate: 6 }}
          animate={{ opacity: 0.6, rotate: 6 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <img src={profilePhoto} alt="" className="w-full h-full object-cover object-top" style={{ filter: "saturate(0.5) brightness(0.75)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        </motion.div>

        <motion.div
          className="absolute top-[20%] right-[12%] w-24 h-32 md:w-32 md:h-40 rounded-xl overflow-hidden shadow-xl pointer-events-none hidden md:block"
          style={{ y: y3 }}
          initial={{ opacity: 0, rotate: 4 }}
          animate={{ opacity: 0.5, rotate: 4 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          <img src={wandererHero} alt="" className="w-full h-full object-cover object-bottom" style={{ filter: "saturate(0.4) brightness(0.7) hue-rotate(30deg)" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background/60" />
        </motion.div>

        {/* Dreamy floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 3 + (i % 3) * 2,
                height: 3 + (i % 3) * 2,
                left: `${10 + i * 11}%`,
                top: `${15 + (i % 4) * 20}%`,
                background: i % 2 === 0
                  ? `hsla(270, 50%, 70%, ${0.2 + (i % 3) * 0.1})`
                  : `hsla(330, 40%, 70%, ${0.15 + (i % 3) * 0.1})`,
                filter: "blur(1px)",
              }}
              animate={{
                y: [-15, 15, -15],
                x: [-8, 8, -8],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-accent/50" />
              <Sparkles className="w-4 h-4 text-accent/60" />
              <p className="text-xs font-mono text-accent/70 tracking-[0.4em] uppercase">
                Beyond the code
              </p>
              <Sparkles className="w-4 h-4 text-accent/60" />
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-accent/50" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poetry font-bold text-foreground leading-[1.15] mb-6">
              {"A soul that writes in".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                className="text-accent italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                verses & visions
              </motion.span>
            </h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              When the compiler rests, the poet awakens. Here lives the art, the wonder,
              and the quiet observations of a curious mind.
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-20 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="text-[9px] font-mono text-muted-foreground/50 tracking-widest uppercase">Explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-4 h-4 text-accent/40" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Grid */}
      <div className="max-w-5xl mx-auto px-6 py-24">
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
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-12 h-[1px] mx-auto mb-8 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
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
