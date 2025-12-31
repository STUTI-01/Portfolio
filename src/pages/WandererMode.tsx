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
    rotate: -2,
  },
  {
    icon: BookOpen,
    title: "The Thought Observatory",
    description: "Scientific explorations, technical essays, spiritual reflections, and more.",
    path: "/wanderer/thoughts",
    rotate: 1.5,
  },
  {
    icon: Bird,
    title: "Field Notes — Bird Log",
    description: "Documenting avian encounters across habitats and seasons.",
    path: "/wanderer/birds",
    rotate: -1,
  },
  {
    icon: Camera,
    title: "Through My Lens",
    description: "A visual diary of moments captured through photography.",
    path: "/wanderer/gallery",
    rotate: 2,
  },
  {
    icon: PenTool,
    title: "Verse Vault",
    description: "Poetry in Hindi, English, and Odia — the language of the soul.",
    path: "/wanderer/poetry",
    rotate: -1.5,
  },
];

// Torn paper edge SVG clip path
const TornEdge = ({ side = "bottom", className = "" }: { side?: "bottom" | "top"; className?: string }) => (
  <svg
    className={`absolute left-0 right-0 w-full ${side === "bottom" ? "bottom-0 translate-y-[98%]" : "top-0 -translate-y-[98%] rotate-180"} ${className}`}
    viewBox="0 0 1200 40"
    preserveAspectRatio="none"
    style={{ height: "40px" }}
  >
    <path
      d="M0,20 Q30,5 60,18 T120,15 T180,22 T240,12 T300,20 T360,14 T420,22 T480,10 T540,20 T600,16 T660,22 T720,12 T780,18 T840,22 T900,14 T960,20 T1020,16 T1080,22 T1140,14 T1200,20 L1200,40 L0,40 Z"
      fill="currentColor"
    />
  </svg>
);

// Decorative tape strip
const TapeStrip = ({ className = "", rotate = 0 }: { className?: string; rotate?: number }) => (
  <div
    className={`absolute w-16 h-5 pointer-events-none ${className}`}
    style={{
      transform: `rotate(${rotate}deg)`,
      background: "linear-gradient(135deg, hsla(45, 30%, 70%, 0.15) 0%, hsla(45, 20%, 60%, 0.08) 100%)",
      backdropFilter: "blur(2px)",
      borderRadius: "2px",
    }}
  />
);

const WandererMode = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO: Scrapbook collage ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Warm textured background */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 30%, hsla(30, 25%, 18%, 0.5) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 80% 80%, hsla(270, 20%, 15%, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 15% 70%, hsla(20, 30%, 14%, 0.3) 0%, transparent 50%),
            hsl(var(--background))
          `,
        }} />

        {/* Paper grain texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }} />

        {/* Scrapbook photo — top left, landscape with tape */}
        <motion.div
          className="absolute top-[8%] left-[5%] md:left-[8%] pointer-events-none"
          style={{ y: y1 }}
          initial={{ opacity: 0, rotate: -7 }}
          animate={{ opacity: 1, rotate: -7 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <div className="relative">
            <TapeStrip className="-top-2.5 left-1/2 -translate-x-1/2" rotate={-3} />
            <div className="w-28 h-36 md:w-40 md:h-52 bg-foreground/5 p-1.5 md:p-2 shadow-xl" style={{
              boxShadow: "4px 6px 20px hsla(0, 0%, 0%, 0.4), 0 0 0 1px hsla(30, 20%, 50%, 0.08)",
            }}>
              <img src={wandererHero} alt="" className="w-full h-full object-cover" style={{ filter: "saturate(0.5) brightness(0.85) sepia(0.15)" }} />
            </div>
            <div className="absolute -bottom-1 left-2 right-2 h-3 bg-gradient-to-t from-background/30 to-transparent blur-sm" />
          </div>
        </motion.div>

        {/* Scrapbook photo — bottom right, profile with tape */}
        <motion.div
          className="absolute bottom-[12%] right-[4%] md:right-[10%] pointer-events-none"
          style={{ y: y2 }}
          initial={{ opacity: 0, rotate: 5 }}
          animate={{ opacity: 1, rotate: 5 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <div className="relative">
            <TapeStrip className="-top-2 left-3" rotate={8} />
            <TapeStrip className="-top-2 right-2" rotate={-5} />
            <div className="w-32 h-44 md:w-44 md:h-56 bg-foreground/5 p-1.5 md:p-2 shadow-xl" style={{
              boxShadow: "4px 6px 20px hsla(0, 0%, 0%, 0.4), 0 0 0 1px hsla(30, 20%, 50%, 0.08)",
            }}>
              <img src={profilePhoto} alt="" className="w-full h-full object-cover object-top" style={{ filter: "saturate(0.4) brightness(0.8) sepia(0.2)" }} />
            </div>
          </div>
        </motion.div>

        {/* Small accent photo — top right, desktop only */}
        <motion.div
          className="absolute top-[18%] right-[8%] md:right-[15%] pointer-events-none hidden md:block"
          style={{ y: y3 }}
          initial={{ opacity: 0, rotate: 3 }}
          animate={{ opacity: 0.8, rotate: 3 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <div className="relative">
            <TapeStrip className="-top-2 left-1/2 -translate-x-1/2" rotate={2} />
            <div className="w-24 h-28 bg-foreground/5 p-1.5 shadow-lg" style={{
              boxShadow: "3px 4px 15px hsla(0, 0%, 0%, 0.35), 0 0 0 1px hsla(30, 20%, 50%, 0.06)",
            }}>
              <img src={wandererHero} alt="" className="w-full h-full object-cover object-bottom" style={{ filter: "saturate(0.3) brightness(0.75) sepia(0.25) hue-rotate(20deg)" }} />
            </div>
          </div>
        </motion.div>

        {/* Decorative torn paper scraps */}
        <motion.div
          className="absolute bottom-[35%] left-[3%] w-20 h-14 md:w-28 md:h-18 pointer-events-none opacity-[0.07] hidden md:block"
          style={{ y: y3 }}
          initial={{ rotate: 12 }}
          animate={{ rotate: 12 }}
        >
          <div className="w-full h-full rounded-sm" style={{
            background: "linear-gradient(145deg, hsla(30, 40%, 70%, 0.3), hsla(20, 30%, 60%, 0.15))",
          }} />
        </motion.div>

        <motion.div
          className="absolute top-[40%] right-[3%] w-16 h-20 pointer-events-none opacity-[0.05] hidden md:block"
          style={{ y: y1 }}
          initial={{ rotate: -15 }}
          animate={{ rotate: -15 }}
        >
          <div className="w-full h-full rounded-sm" style={{
            background: "linear-gradient(120deg, hsla(330, 25%, 65%, 0.25), hsla(270, 20%, 55%, 0.1))",
          }} />
        </motion.div>

        {/* Floating dust particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                left: `${8 + i * 9}%`,
                top: `${10 + (i % 5) * 18}%`,
                background: `hsla(30, 30%, 70%, ${0.1 + (i % 4) * 0.05})`,
              }}
              animate={{
                y: [-10, 12, -10],
                opacity: [0.15, 0.5, 0.15],
              }}
              transition={{
                duration: 5 + i * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
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
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-accent/40" />
              <Sparkles className="w-3.5 h-3.5 text-accent/50" />
              <p className="text-[10px] font-mono text-accent/60 tracking-[0.5em] uppercase">
                Beyond the code
              </p>
              <Sparkles className="w-3.5 h-3.5 text-accent/50" />
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-accent/40" />
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
              className="text-lg md:text-xl text-muted-foreground/70 leading-relaxed max-w-xl mx-auto font-poetry italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              When the compiler rests, the poet awakens. Here lives the art, the wonder,
              and the quiet observations of a curious mind.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-20 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="text-[9px] font-mono text-muted-foreground/40 tracking-widest uppercase">Explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-4 h-4 text-accent/30" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Torn edge transition ── */}
      <div className="relative text-background">
        <TornEdge side="top" />
      </div>

      {/* ── SECTIONS: Scrapbook cards ── */}
      <div className="relative max-w-5xl mx-auto px-6 py-24">
        {/* Subtle vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent/10 to-transparent pointer-events-none hidden lg:block" />

        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] font-mono text-accent/50 tracking-[0.5em] uppercase mb-3">
            Explore
          </p>
          <h2 className="text-3xl md:text-4xl font-poetry font-bold text-foreground">
            Windows to My World
          </h2>
          <div className="w-16 h-[1px] mx-auto mt-4 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: section.rotate }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
            >
              <Link to={section.path} className="block relative group">
                {/* Tape decoration */}
                <TapeStrip className="-top-2 left-6" rotate={section.rotate > 0 ? 5 : -4} />

                <div
                  className="p-6 space-y-3 h-full border border-foreground/[0.06] transition-all duration-300 group-hover:border-accent/20"
                  style={{
                    background: "hsla(30, 15%, 15%, 0.3)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "3px 4px 16px hsla(0, 0%, 0%, 0.25)",
                  }}
                >
                  <section.icon className="w-7 h-7 text-accent/70 group-hover:text-accent transition-colors duration-300" />
                  <h3 className="font-poetry font-bold text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">{section.description}</p>
                  <div className="w-8 h-[1px] bg-accent/20 group-hover:w-12 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Poetry teaser */}
        <motion.div
          className="mt-28 text-center relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block relative">
            <TapeStrip className="-top-3 left-4" rotate={-6} />
            <TapeStrip className="-top-3 right-4" rotate={4} />
            <div className="px-10 py-8 border border-foreground/[0.05]" style={{
              background: "hsla(30, 15%, 15%, 0.2)",
              boxShadow: "2px 3px 12px hsla(0, 0%, 0%, 0.2)",
            }}>
              <p className="font-poetry text-2xl md:text-3xl text-foreground/70 italic max-w-xl mx-auto leading-relaxed">
                "Deep Dive Into,
                <br />
                The World of Poetry"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WandererMode;
