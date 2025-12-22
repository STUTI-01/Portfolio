import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import stutiPhoto from "@/assets/stuti-wanderer.jpeg";
import { Gem, BookOpen, Bird, Camera, PenTool, Sparkles, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: Gem,
    title: "Adornment Archive",
    description: "A curated collection of handcrafted jewellery pieces, each with a story.",
    path: "/wanderer/adornments",
  },
  {
    icon: BookOpen,
    title: "The Thought Observatory",
    description: "Scientific explorations, technical essays, spiritual reflections, and more.",
    path: "/wanderer/thoughts",
  },
  {
    icon: Bird,
    title: "Field Notes — Bird Log",
    description: "Documenting avian encounters across habitats and seasons.",
    path: "/wanderer/birds",
  },
  {
    icon: Camera,
    title: "Through My Lens",
    description: "A visual diary of moments captured through photography.",
    path: "/wanderer/gallery",
  },
  {
    icon: PenTool,
    title: "Verse Vault",
    description: "Poetry in Hindi, English, and Odia — the language of the soul.",
    path: "/wanderer/poetry",
  },
];

/* ── SVG Sketch Elements ── */

const SketchCameraWithPhoto = ({ className, photo }: { className?: string; photo: string }) => (
  <svg className={className} viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Camera body */}
    <rect x="20" y="50" width="220" height="150" rx="12" stroke="currentColor" strokeWidth="2" />
    <rect x="22" y="52" width="216" height="146" rx="10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 3" />
    {/* Top section */}
    <rect x="90" y="28" width="60" height="24" rx="5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="180" y="35" width="30" height="14" rx="3" stroke="currentColor" strokeWidth="1.2" />
    {/* Flash */}
    <rect x="40" y="35" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1" />
    {/* Viewfinder screen - photo goes here */}
    <defs>
      <clipPath id="screenClip">
        <rect x="45" y="70" width="170" height="115" rx="4" />
      </clipPath>
    </defs>
    <image href={photo} x="45" y="60" width="170" height="135" clipPath="url(#screenClip)" preserveAspectRatio="xMidYMin slice" />
    <rect x="45" y="70" width="170" height="115" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    {/* Lens details on body */}
    <circle cx="230" cy="75" r="4" stroke="currentColor" strokeWidth="1" />
    <line x1="30" y1="65" x2="42" y2="65" stroke="currentColor" strokeWidth="0.8" />
    <line x1="30" y1="69" x2="38" y2="69" stroke="currentColor" strokeWidth="0.6" />
    {/* Grip texture */}
    <line x1="25" y1="100" x2="25" y2="160" stroke="currentColor" strokeWidth="0.4" />
    <line x1="28" y1="100" x2="28" y2="160" stroke="currentColor" strokeWidth="0.4" />
    <line x1="31" y1="100" x2="31" y2="160" stroke="currentColor" strokeWidth="0.4" />
    {/* Strap holes */}
    <circle cx="28" cy="55" r="3" stroke="currentColor" strokeWidth="1" />
    <circle cx="232" cy="55" r="3" stroke="currentColor" strokeWidth="1" />
    {/* Strap */}
    <path d="M28 52 Q10 30 15 15 Q20 5 35 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M232 52 Q250 30 245 15 Q240 5 225 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

const SketchBird = ({ className, flip = false }: { className?: string; flip?: boolean }) => (
  <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={flip ? { transform: "scaleX(-1)" } : {}}>
    <path d="M10 40 Q20 28 40 26 Q52 25 58 30 Q62 22 72 20 Q82 18 88 22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M58 30 Q55 38 48 42 Q40 46 28 44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="70" cy="23" r="1.8" stroke="currentColor" strokeWidth="1" />
    <path d="M76 22 L85 19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M42 28 Q48 18 62 16" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M10 40 Q5 38 3 32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M10 40 Q7 44 3 42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const SketchCompass = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 2" />
    <circle cx="50" cy="50" r="3" stroke="currentColor" strokeWidth="1" />
    <line x1="50" y1="15" x2="50" y2="25" stroke="currentColor" strokeWidth="1.2" />
    <line x1="50" y1="75" x2="50" y2="85" stroke="currentColor" strokeWidth="1" />
    <line x1="15" y1="50" x2="25" y2="50" stroke="currentColor" strokeWidth="1" />
    <line x1="75" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="1" />
    <path d="M50 18 L46 30 L50 27 L54 30 Z" stroke="currentColor" strokeWidth="0.8" />
    <text x="48" y="14" fill="currentColor" fontSize="7" fontFamily="serif">N</text>
  </svg>
);

const SketchFeather = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 50 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 5 Q30 25 28 45 Q26 65 24 85 Q23 95 25 115" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M25 15 Q15 18 8 25" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M26 30 Q16 32 10 38" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M27 45 Q18 46 12 52" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M27 60 Q19 60 14 65" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M25 15 Q33 12 40 15" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M27 30 Q35 27 42 30" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M28 45 Q35 42 42 44" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M27 60 Q34 57 40 59" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
  </svg>
);

const SketchCandle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Candle body */}
    <rect x="18" y="45" width="24" height="70" rx="2" stroke="currentColor" strokeWidth="1.3" />
    {/* Wax drips */}
    <path d="M18 50 Q15 55 16 60 Q17 63 18 62" stroke="currentColor" strokeWidth="0.8" />
    <path d="M42 48 Q45 53 44 58 Q43 61 42 60" stroke="currentColor" strokeWidth="0.8" />
    {/* Wick */}
    <line x1="30" y1="45" x2="30" y2="32" stroke="currentColor" strokeWidth="1" />
    {/* Flame - animated via CSS */}
    <path className="candle-flame" d="M30 30 Q24 20 30 8 Q36 20 30 30 Z" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Inner flame */}
    <path className="candle-flame-inner" d="M30 28 Q27 22 30 14 Q33 22 30 28 Z" stroke="currentColor" strokeWidth="0.6" fill="none" />
    {/* Holder */}
    <path d="M12 115 L18 115 L18 110 Q18 108 20 108 L40 108 Q42 108 42 110 L42 115 L48 115" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <ellipse cx="30" cy="116" rx="18" ry="4" stroke="currentColor" strokeWidth="1" />
    {/* Glow circle */}
    <circle className="candle-glow" cx="30" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="0.3" />
  </svg>
);

const SketchFlower = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 95 Q38 70 40 50" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M40 70 Q30 60 22 62" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M40 60 Q50 52 55 55" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    <ellipse cx="40" cy="35" rx="6" ry="12" stroke="currentColor" strokeWidth="0.9" transform="rotate(0 40 35)" />
    <ellipse cx="40" cy="35" rx="6" ry="12" stroke="currentColor" strokeWidth="0.9" transform="rotate(72 40 35)" />
    <ellipse cx="40" cy="35" rx="6" ry="12" stroke="currentColor" strokeWidth="0.9" transform="rotate(144 40 35)" />
    <ellipse cx="40" cy="35" rx="6" ry="12" stroke="currentColor" strokeWidth="0.9" transform="rotate(216 40 35)" />
    <ellipse cx="40" cy="35" rx="6" ry="12" stroke="currentColor" strokeWidth="0.9" transform="rotate(288 40 35)" />
    <circle cx="40" cy="35" r="5" stroke="currentColor" strokeWidth="1" />
  </svg>
);

/* ── Twinkling star component ── */
const TwinklingStar = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
    transition={{ duration: 2 + delay * 0.3, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 L13.5 9 L20 10 L14 13 L15.5 20 L12 15 L8.5 20 L10 13 L4 10 L10.5 9 Z"
        stroke="hsla(45, 70%, 65%, 0.6)"
        strokeWidth="0.8"
        fill="hsla(45, 70%, 65%, 0.08)"
      />
    </svg>
  </motion.div>
);

const starPositions = [
  { x: "5%", y: "8%", size: 14, delay: 0 },
  { x: "15%", y: "22%", size: 10, delay: 0.7 },
  { x: "82%", y: "12%", size: 12, delay: 0.3 },
  { x: "90%", y: "30%", size: 9, delay: 1.2 },
  { x: "70%", y: "5%", size: 11, delay: 0.5 },
  { x: "45%", y: "3%", size: 8, delay: 1.5 },
  { x: "25%", y: "6%", size: 10, delay: 0.9 },
  { x: "60%", y: "15%", size: 7, delay: 1.8 },
  { x: "8%", y: "40%", size: 9, delay: 1.1 },
  { x: "92%", y: "50%", size: 11, delay: 0.4 },
  { x: "35%", y: "85%", size: 8, delay: 1.6 },
  { x: "75%", y: "80%", size: 10, delay: 0.8 },
  { x: "50%", y: "90%", size: 7, delay: 2.0 },
  { x: "18%", y: "75%", size: 9, delay: 1.3 },
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
      <style>{`
        @keyframes flameFlicker {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.8; }
          25% { transform: scaleY(1.1) scaleX(0.9); opacity: 1; }
          50% { transform: scaleY(0.95) scaleX(1.05); opacity: 0.7; }
          75% { transform: scaleY(1.05) scaleX(0.95); opacity: 0.9; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.15; r: 18; }
          50% { opacity: 0.35; r: 22; }
        }
        .candle-flame {
          transform-origin: center bottom;
          animation: flameFlicker 1.5s ease-in-out infinite;
        }
        .candle-flame-inner {
          transform-origin: center bottom;
          animation: flameFlicker 1.2s ease-in-out infinite 0.1s;
        }
        .candle-glow {
          animation: glowPulse 2s ease-in-out infinite;
        }
      `}</style>
      <Navbar />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
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
        {starPositions.map((star, i) => (
          <TwinklingStar key={i} {...star} />
        ))}

        {/* ── Layout: Left text, Right camera photo ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 py-20">

          {/* Left — Text content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
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
              className="text-lg md:text-xl text-muted-foreground/70 leading-relaxed max-w-xl mx-auto lg:mx-0 font-poetry italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              When the compiler rests, the poet awakens. Here lives the art, the wonder,
              and the quiet observations of a curious mind.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col items-center lg:items-start gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <span className="text-[9px] font-mono text-muted-foreground/40 tracking-widest uppercase">Explore</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowDown className="w-4 h-4 text-accent/30" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right — Camera with photo inside */}
          <motion.div
            className="flex-shrink-0 relative"
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <div className="relative text-accent/30">
              <SketchCameraWithPhoto className="w-64 h-52 md:w-80 md:h-64 lg:w-[360px] lg:h-[290px]" photo={stutiPhoto} />
              {/* Warm glow behind camera */}
              <div className="absolute inset-0 -z-10 blur-[60px] opacity-20" style={{
                background: "radial-gradient(circle, hsla(35, 50%, 55%, 0.3), transparent 70%)",
              }} />
            </div>
          </motion.div>
        </div>

        {/* ── Scattered sketch elements ── */}

        {/* Birds — top area */}
        <motion.div
          className="absolute top-[8%] left-[10%] text-accent/20 pointer-events-none"
          style={{ y: y3 }}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <SketchBird className="w-20 h-12 md:w-28 md:h-18" />
        </motion.div>

        <motion.div
          className="absolute top-[14%] left-[22%] text-accent/14 pointer-events-none"
          style={{ y: y3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <SketchBird className="w-14 h-9 md:w-18 md:h-11" flip />
        </motion.div>

        {/* Compass — bottom left */}
        <motion.div
          className="absolute bottom-[8%] left-[5%] md:left-[8%] text-accent/18 pointer-events-none"
          style={{ y: y4 }}
          initial={{ opacity: 0, rotate: -12 }}
          animate={{ opacity: 1, rotate: -12 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <SketchCompass className="w-20 h-20 md:w-28 md:h-28" />
        </motion.div>

        {/* Candle — bottom right */}
        <motion.div
          className="absolute bottom-[5%] right-[8%] md:right-[12%] text-accent/25 pointer-events-none"
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <SketchCandle className="w-14 h-28 md:w-18 md:h-38" />
          {/* Animated warm glow from candle */}
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, hsla(40, 80%, 60%, 0.08), transparent 70%)" }}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Feather — left mid */}
        <motion.div
          className="absolute top-[55%] left-[3%] md:left-[6%] text-accent/15 pointer-events-none hidden md:block"
          style={{ y: y1 }}
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 1, rotate: 20 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <SketchFeather className="w-10 h-24" />
        </motion.div>

        {/* Flower — bottom center-left */}
        <motion.div
          className="absolute bottom-[12%] left-[30%] text-accent/12 pointer-events-none hidden md:block"
          style={{ y: y2 }}
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: -5 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <SketchFlower className="w-14 h-18" />
        </motion.div>

        {/* Floating dust */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 4) * 18}%`,
                background: `hsla(35, 40%, 70%, ${0.06 + (i % 3) * 0.03})`,
              }}
              animate={{ y: [-8, 10, -8], opacity: [0.08, 0.3, 0.08] }}
              transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            />
          ))}
        </div>
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
                <div
                  className="p-6 space-y-3 h-full border border-accent/10 transition-all duration-300 group-hover:border-accent/25 rounded-sm"
                  style={{ background: "hsla(30, 15%, 12%, 0.25)", backdropFilter: "blur(6px)" }}
                >
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
