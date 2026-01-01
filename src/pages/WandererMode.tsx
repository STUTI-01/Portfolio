import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
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

/* ── Scattered SVG line-art illustrations ── */

const SketchCamera = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="30" width="100" height="60" rx="8" stroke="currentColor" strokeWidth="1.5" />
    <rect x="40" y="18" width="30" height="14" rx="3" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="60" cy="58" r="18" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="60" cy="58" r="10" stroke="currentColor" strokeWidth="1" />
    <circle cx="60" cy="58" r="4" stroke="currentColor" strokeWidth="0.8" />
    <rect x="85" y="36" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1" />
    <line x1="15" y1="42" x2="35" y2="42" stroke="currentColor" strokeWidth="0.8" />
    {/* Strap */}
    <path d="M10 35 Q-5 20 8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <path d="M110 35 Q125 20 112 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
  </svg>
);

const SketchBird = ({ className, flip = false }: { className?: string; flip?: boolean }) => (
  <svg className={className} viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={flip ? { transform: "scaleX(-1)" } : {}}>
    <path d="M15 45 Q25 30 45 28 Q55 27 60 32 Q65 25 75 22 Q85 20 90 25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    <path d="M60 32 Q58 40 50 45 Q42 50 30 48" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <circle cx="72" cy="26" r="2" stroke="currentColor" strokeWidth="1" />
    <path d="M78 25 L88 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    {/* Wing detail */}
    <path d="M45 32 Q50 20 65 18" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
    <path d="M42 35 Q48 24 60 22" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" fill="none" />
    {/* Tail */}
    <path d="M15 45 Q8 42 5 35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
    <path d="M15 45 Q10 48 5 45" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
  </svg>
);

const SketchCompass = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.6" />
    <circle cx="50" cy="50" r="3" stroke="currentColor" strokeWidth="1" />
    {/* N S E W */}
    <line x1="50" y1="15" x2="50" y2="25" stroke="currentColor" strokeWidth="1.2" />
    <line x1="50" y1="75" x2="50" y2="85" stroke="currentColor" strokeWidth="1" />
    <line x1="15" y1="50" x2="25" y2="50" stroke="currentColor" strokeWidth="1" />
    <line x1="75" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="1" />
    {/* Arrow */}
    <path d="M50 18 L46 30 L50 27 L54 30 Z" stroke="currentColor" strokeWidth="0.8" />
    {/* Diagonals */}
    <line x1="25" y1="25" x2="30" y2="30" stroke="currentColor" strokeWidth="0.6" />
    <line x1="75" y1="25" x2="70" y2="30" stroke="currentColor" strokeWidth="0.6" />
    <line x1="25" y1="75" x2="30" y2="70" stroke="currentColor" strokeWidth="0.6" />
    <line x1="75" y1="75" x2="70" y2="70" stroke="currentColor" strokeWidth="0.6" />
  </svg>
);

const SketchFeather = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 50 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 5 Q30 25 28 45 Q26 65 24 85 Q23 95 25 115" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    {/* Left barbs */}
    <path d="M25 15 Q15 18 8 25" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" fill="none" />
    <path d="M26 30 Q16 32 10 38" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" fill="none" />
    <path d="M27 45 Q18 46 12 52" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" fill="none" />
    <path d="M27 60 Q19 60 14 65" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" fill="none" />
    {/* Right barbs */}
    <path d="M25 15 Q33 12 40 15" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" fill="none" />
    <path d="M27 30 Q35 27 42 30" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" fill="none" />
    <path d="M28 45 Q35 42 42 44" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" fill="none" />
    <path d="M27 60 Q34 57 40 59" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" fill="none" />
  </svg>
);

const SketchGlobe = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.3" />
    <ellipse cx="50" cy="50" rx="18" ry="38" stroke="currentColor" strokeWidth="0.8" />
    <ellipse cx="50" cy="50" rx="32" ry="38" stroke="currentColor" strokeWidth="0.5" />
    <line x1="12" y1="35" x2="88" y2="35" stroke="currentColor" strokeWidth="0.6" />
    <line x1="12" y1="50" x2="88" y2="50" stroke="currentColor" strokeWidth="0.8" />
    <line x1="12" y1="65" x2="88" y2="65" stroke="currentColor" strokeWidth="0.6" />
  </svg>
);

const SketchFlower = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 95 Q38 70 40 50" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <path d="M40 70 Q30 60 22 62" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
    <path d="M40 60 Q50 52 55 55" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
    {/* Petals */}
    <ellipse cx="40" cy="35" rx="6" ry="12" stroke="currentColor" strokeWidth="0.9" transform="rotate(0 40 35)" />
    <ellipse cx="40" cy="35" rx="6" ry="12" stroke="currentColor" strokeWidth="0.9" transform="rotate(72 40 35)" />
    <ellipse cx="40" cy="35" rx="6" ry="12" stroke="currentColor" strokeWidth="0.9" transform="rotate(144 40 35)" />
    <ellipse cx="40" cy="35" rx="6" ry="12" stroke="currentColor" strokeWidth="0.9" transform="rotate(216 40 35)" />
    <ellipse cx="40" cy="35" rx="6" ry="12" stroke="currentColor" strokeWidth="0.9" transform="rotate(288 40 35)" />
    <circle cx="40" cy="35" r="5" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const SketchBookOpen = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 15 Q40 10 10 18 L10 70 Q40 62 60 68" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    <path d="M60 15 Q80 10 110 18 L110 70 Q80 62 60 68" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    <line x1="60" y1="15" x2="60" y2="68" stroke="currentColor" strokeWidth="0.8" />
    {/* Page lines */}
    <line x1="20" y1="30" x2="50" y2="27" stroke="currentColor" strokeWidth="0.4" />
    <line x1="20" y1="38" x2="50" y2="35" stroke="currentColor" strokeWidth="0.4" />
    <line x1="20" y1="46" x2="50" y2="43" stroke="currentColor" strokeWidth="0.4" />
    <line x1="70" y1="27" x2="100" y2="30" stroke="currentColor" strokeWidth="0.4" />
    <line x1="70" y1="35" x2="100" y2="38" stroke="currentColor" strokeWidth="0.4" />
    <line x1="70" y1="43" x2="100" y2="46" stroke="currentColor" strokeWidth="0.4" />
  </svg>
);

const WandererMode = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Warm parchment-style background */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, hsla(30, 20%, 16%, 0.5) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 85% 20%, hsla(35, 25%, 14%, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 10% 80%, hsla(25, 20%, 12%, 0.3) 0%, transparent 50%),
            hsl(var(--background))
          `,
        }} />

        {/* Paper grain */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }} />

        {/* ── Scattered sketch elements ── */}

        {/* Camera — top right */}
        <motion.div
          className="absolute top-[6%] right-[8%] md:right-[12%] text-accent/25 pointer-events-none"
          style={{ y: y1 }}
          initial={{ opacity: 0, rotate: 15 }}
          animate={{ opacity: 1, rotate: 15 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <SketchCamera className="w-28 h-24 md:w-40 md:h-32" />
        </motion.div>

        {/* Bird — top left, flying */}
        <motion.div
          className="absolute top-[10%] left-[6%] md:left-[10%] text-accent/20 pointer-events-none"
          style={{ y: y3 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <SketchBird className="w-24 h-16 md:w-32 md:h-22" />
        </motion.div>

        {/* Second bird — mid right, smaller */}
        <motion.div
          className="absolute top-[35%] right-[4%] md:right-[6%] text-accent/15 pointer-events-none"
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <SketchBird className="w-16 h-10 md:w-20 md:h-14" flip />
        </motion.div>

        {/* Compass — bottom left */}
        <motion.div
          className="absolute bottom-[10%] left-[5%] md:left-[8%] text-accent/20 pointer-events-none"
          style={{ y: y4 }}
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: -10 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <SketchCompass className="w-24 h-24 md:w-32 md:h-32" />
        </motion.div>

        {/* Feather — right side, mid-low */}
        <motion.div
          className="absolute bottom-[20%] right-[10%] md:right-[15%] text-accent/18 pointer-events-none"
          style={{ y: y1 }}
          initial={{ opacity: 0, rotate: 25 }}
          animate={{ opacity: 1, rotate: 25 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <SketchFeather className="w-12 h-28 md:w-16 md:h-36" />
        </motion.div>

        {/* Globe — top center-left */}
        <motion.div
          className="absolute top-[5%] left-[30%] md:left-[25%] text-accent/12 pointer-events-none hidden md:block"
          style={{ y: y3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <SketchGlobe className="w-20 h-20" />
        </motion.div>

        {/* Flower — bottom right area */}
        <motion.div
          className="absolute bottom-[8%] right-[30%] md:right-[35%] text-accent/15 pointer-events-none hidden md:block"
          style={{ y: y2 }}
          initial={{ opacity: 0, rotate: -8 }}
          animate={{ opacity: 1, rotate: -8 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <SketchFlower className="w-16 h-20" />
        </motion.div>

        {/* Open book — bottom left area */}
        <motion.div
          className="absolute bottom-[25%] left-[2%] md:left-[12%] text-accent/12 pointer-events-none hidden md:block"
          style={{ y: y4 }}
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: -5 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <SketchBookOpen className="w-24 h-16" />
        </motion.div>

        {/* ── Profile photo in organic blob shape ── */}
        <motion.div
          className="absolute bottom-[8%] left-[8%] md:left-[auto] md:bottom-[auto] md:top-[15%] md:right-[22%] pointer-events-none hidden md:block"
          style={{ y: y1 }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <div className="relative w-36 h-44">
            <svg viewBox="0 0 200 240" className="absolute inset-0 w-full h-full">
              <defs>
                <clipPath id="blobClip">
                  <path d="M100,10 Q160,0 180,50 Q200,100 175,160 Q150,220 100,230 Q50,240 25,180 Q0,120 20,60 Q40,10 100,10 Z" />
                </clipPath>
              </defs>
              <image
                href={profilePhoto}
                width="200"
                height="240"
                clipPath="url(#blobClip)"
                preserveAspectRatio="xMidYMin slice"
              />
              <path
                d="M100,10 Q160,0 180,50 Q200,100 175,160 Q150,220 100,230 Q50,240 25,180 Q0,120 20,60 Q40,10 100,10 Z"
                fill="none"
                stroke="hsla(35, 50%, 65%, 0.3)"
                strokeWidth="2"
              />
            </svg>
          </div>
        </motion.div>

        {/* Floating dust */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                left: `${8 + i * 11}%`,
                top: `${12 + (i % 5) * 17}%`,
                background: `hsla(35, 40%, 70%, ${0.08 + (i % 4) * 0.04})`,
              }}
              animate={{ y: [-8, 10, -8], opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
          ))}
        </div>

        {/* ── Content ── */}
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
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowDown className="w-4 h-4 text-accent/30" />
            </motion.div>
          </motion.div>
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

        {/* Poetry teaser */}
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
