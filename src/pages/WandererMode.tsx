import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import stutiPhoto from "@/assets/stuti-wanderer.jpeg";
import vintageCamera from "@/assets/vintage-camera.png";
import burningCandle from "@/assets/burning-candle.png";
import { Gem, BookOpen, Bird, Camera, PenTool, Sparkles, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { icon: Gem, title: "Adornment Archive", description: "A curated collection of handcrafted jewellery pieces, each with a story.", path: "/wanderer/adornments" },
  { icon: BookOpen, title: "The Thought Observatory", description: "Scientific explorations, technical essays, spiritual reflections, and more.", path: "/wanderer/thoughts" },
  { icon: Bird, title: "Field Notes — Bird Log", description: "Documenting avian encounters across habitats and seasons.", path: "/wanderer/birds" },
  { icon: Camera, title: "Through My Lens", description: "A visual diary of moments captured through photography.", path: "/wanderer/gallery" },
  { icon: PenTool, title: "Verse Vault", description: "Poetry in Hindi, English, and Odia — the language of the soul.", path: "/wanderer/poetry" },
];

/* ── SVG Sketch Elements (kept as decorative accents) ── */
const SketchBird = ({ className, flip = false }: { className?: string; flip?: boolean }) => (
  <svg className={className} viewBox="0 0 100 60" fill="none" style={flip ? { transform: "scaleX(-1)" } : {}}>
    <path d="M10 40 Q20 28 40 26 Q52 25 58 30 Q62 22 72 20 Q82 18 88 22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M58 30 Q55 38 48 42 Q40 46 28 44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="70" cy="23" r="1.8" stroke="currentColor" strokeWidth="1" />
    <path d="M76 22 L85 19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M10 40 Q5 38 3 32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M10 40 Q7 44 3 42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const SketchFeather = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 50 120" fill="none">
    <path d="M25 5 Q30 25 28 45 Q26 65 24 85 Q23 95 25 115" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M25 15 Q15 18 8 25" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M26 30 Q16 32 10 38" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M27 45 Q18 46 12 52" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M25 15 Q33 12 40 15" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M27 30 Q35 27 42 30" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M28 45 Q35 42 42 44" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
  </svg>
);

const SketchCompass = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 2" />
    <circle cx="50" cy="50" r="3" stroke="currentColor" strokeWidth="1" />
    <line x1="50" y1="15" x2="50" y2="25" stroke="currentColor" strokeWidth="1.2" />
    <line x1="50" y1="75" x2="50" y2="85" stroke="currentColor" strokeWidth="1" />
    <line x1="15" y1="50" x2="25" y2="50" stroke="currentColor" strokeWidth="1" />
    <line x1="75" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="1" />
    <path d="M50 18 L46 30 L50 27 L54 30 Z" stroke="currentColor" strokeWidth="0.8" />
  </svg>
);

/* ── Twinkling star ── */
const TwinklingStar = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
    transition={{ duration: 2 + delay * 0.3, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L13.5 9 L20 10 L14 13 L15.5 20 L12 15 L8.5 20 L10 13 L4 10 L10.5 9 Z"
        stroke="hsla(45, 70%, 65%, 0.6)" strokeWidth="0.8" fill="hsla(45, 70%, 65%, 0.08)" />
    </svg>
  </motion.div>
);

const stars = [
  { x: "5%", y: "6%", size: 14, delay: 0 }, { x: "15%", y: "18%", size: 10, delay: 0.7 },
  { x: "82%", y: "10%", size: 12, delay: 0.3 }, { x: "90%", y: "28%", size: 9, delay: 1.2 },
  { x: "70%", y: "4%", size: 11, delay: 0.5 }, { x: "45%", y: "2%", size: 8, delay: 1.5 },
  { x: "25%", y: "5%", size: 10, delay: 0.9 }, { x: "60%", y: "12%", size: 7, delay: 1.8 },
  { x: "8%", y: "55%", size: 9, delay: 1.1 }, { x: "92%", y: "60%", size: 11, delay: 0.4 },
  { x: "75%", y: "85%", size: 10, delay: 0.8 }, { x: "18%", y: "80%", size: 9, delay: 1.3 },
];

const WandererMode = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20">
        {/* Background */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 40%, hsla(30, 20%, 14%, 0.5) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 85% 20%, hsla(35, 25%, 12%, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 10% 80%, hsla(25, 20%, 10%, 0.3) 0%, transparent 50%),
            hsl(var(--background))
          `,
        }} />

        {/* Paper grain */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }} />

        {/* Twinkling stars */}
        {stars.map((s, i) => <TwinklingStar key={i} {...s} />)}

        {/* ── Real camera image — top right ── */}
        <motion.div
          className="absolute top-[4%] right-[3%] md:right-[8%] pointer-events-none"
          style={{ y: y1 }}
          initial={{ opacity: 0, rotate: 12 }}
          animate={{ opacity: 0.7, rotate: 12 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <img src={vintageCamera} alt="" className="w-28 h-28 md:w-40 md:h-40 object-contain drop-shadow-2xl" style={{ filter: "brightness(1.1)" }} />
        </motion.div>

        {/* ── Real candle — bottom left ── */}
        <motion.div
          className="absolute bottom-[3%] left-[4%] md:left-[8%] pointer-events-none"
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <img src={burningCandle} alt="" className="w-24 h-24 md:w-36 md:h-36 object-contain" style={{ filter: "brightness(1.2)" }} />
          {/* Warm glow from candle */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full pointer-events-none -z-10"
            style={{ background: "radial-gradient(circle, hsla(35, 80%, 55%, 0.12), transparent 70%)" }}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.15, 0.95] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* ── Sketch birds — top left ── */}
        <motion.div
          className="absolute top-[10%] left-[8%] text-accent/20 pointer-events-none"
          style={{ y: y3 }}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <SketchBird className="w-20 h-12 md:w-28 md:h-18" />
        </motion.div>
        <motion.div
          className="absolute top-[16%] left-[20%] text-accent/14 pointer-events-none"
          style={{ y: y3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <SketchBird className="w-14 h-9" flip />
        </motion.div>

        {/* ── Compass — bottom right ── */}
        <motion.div
          className="absolute bottom-[6%] right-[4%] md:right-[10%] text-accent/15 pointer-events-none hidden md:block"
          style={{ y: y4 }}
          initial={{ opacity: 0, rotate: -12 }}
          animate={{ opacity: 1, rotate: -12 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <SketchCompass className="w-24 h-24" />
        </motion.div>

        {/* ── Feather — left mid ── */}
        <motion.div
          className="absolute top-[50%] left-[3%] text-accent/12 pointer-events-none hidden md:block"
          style={{ y: y1 }}
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 1, rotate: 20 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <SketchFeather className="w-10 h-24" />
        </motion.div>

        {/* ── CONTENT: Centered text ── */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
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
              <p className="text-[10px] font-mono text-accent/60 tracking-[0.5em] uppercase">Beyond the code</p>
              <Sparkles className="w-3.5 h-3.5 text-accent/50" />
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-accent/40" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poetry font-bold text-foreground leading-[1.2] mb-4">
              <motion.span
                className="inline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                A soul that writes in{" "}
              </motion.span>
              <motion.span
                className="text-accent italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                verses & visions
              </motion.span>
            </h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground/70 leading-relaxed max-w-xl mx-auto font-poetry italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              When the compiler rests, the poet awakens. Here lives the art, the wonder,
              and the quiet observations of a curious mind.
            </motion.p>
          </motion.div>
        </div>

        {/* ── Photo below text — inside a camera-frame style border ── */}
        <motion.div
          className="relative z-10 mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="relative">
            {/* Outer camera-style frame */}
            <div className="relative p-2 md:p-3 rounded-lg" style={{
              border: "2px solid hsla(35, 40%, 55%, 0.25)",
              background: "hsla(30, 15%, 12%, 0.4)",
              boxShadow: "0 8px 40px hsla(0, 0%, 0%, 0.4), inset 0 1px 0 hsla(35, 40%, 60%, 0.08)",
            }}>
              {/* Camera details — top bar */}
              <div className="flex items-center justify-between mb-2 px-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ border: "1px solid hsla(35, 40%, 55%, 0.3)" }} />
                  <div className="w-6 h-1.5 rounded-full" style={{ border: "1px solid hsla(35, 40%, 55%, 0.2)" }} />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-accent/20" />
                  <div className="w-1 h-1 rounded-full bg-accent/20" />
                  <div className="w-1 h-1 rounded-full bg-accent/20" />
                </div>
              </div>
              {/* Photo */}
              <div className="overflow-hidden rounded" style={{
                boxShadow: "inset 0 2px 8px hsla(0, 0%, 0%, 0.3)",
              }}>
                <img
                  src={stutiPhoto}
                  alt="Stuti Mohanty"
                  className="w-52 h-60 md:w-64 md:h-72 object-cover object-top"
                />
              </div>
              {/* Bottom detail */}
              <div className="flex items-center justify-center mt-2">
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
              </div>
            </div>

            {/* Warm glow behind frame */}
            <div className="absolute inset-0 -z-10 blur-[50px] opacity-15" style={{
              background: "radial-gradient(circle, hsla(35, 50%, 55%, 0.4), transparent 70%)",
            }} />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="relative z-10 mt-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-[9px] font-mono text-muted-foreground/40 tracking-widest uppercase">Explore</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown className="w-4 h-4 text-accent/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTIONS ── */}
      <div className="relative max-w-5xl mx-auto px-6 py-24">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] font-mono text-accent/50 tracking-[0.5em] uppercase mb-3">Explore</p>
          <h2 className="text-3xl md:text-4xl font-poetry font-bold text-foreground">Windows to My World</h2>
          <div className="w-16 h-[1px] mx-auto mt-4 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to={section.path} className="block group">
                <div className="p-6 space-y-3 h-full border border-accent/10 transition-all duration-300 group-hover:border-accent/25 rounded-sm"
                  style={{ background: "hsla(30, 15%, 12%, 0.25)", backdropFilter: "blur(6px)" }}>
                  <section.icon className="w-7 h-7 text-accent/60 group-hover:text-accent transition-colors duration-300" />
                  <h3 className="font-poetry font-bold text-lg text-foreground group-hover:text-accent transition-colors duration-300">{section.title}</h3>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">{section.description}</p>
                  <div className="w-8 h-[1px] bg-accent/20 group-hover:w-12 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-28 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-12 h-[1px] mx-auto mb-8 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          <p className="font-poetry text-2xl md:text-3xl text-foreground/70 italic max-w-xl mx-auto leading-relaxed">
            "Deep Dive Into,<br />The World of Poetry"
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WandererMode;
