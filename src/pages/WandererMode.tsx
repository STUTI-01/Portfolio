import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import stutiPhoto from "@/assets/stuti-wanderer.jpeg";
import { Gem, BookOpen, Bird, Camera, PenTool, Sparkles, ArrowDown, Sun, Flower2 } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { icon: Gem, title: "Adornment Archive", description: "A curated collection of handcrafted jewellery pieces, each with a story.", path: "/wanderer/adornments" },
  { icon: BookOpen, title: "The Thought Observatory", description: "Scientific explorations, technical essays, spiritual reflections, and more.", path: "/wanderer/thoughts" },
  { icon: Bird, title: "Field Notes — Bird Log", description: "Documenting avian encounters across habitats and seasons.", path: "/wanderer/birds" },
  { icon: Camera, title: "Through My Lens", description: "A visual diary of moments captured through photography.", path: "/wanderer/gallery" },
  { icon: PenTool, title: "Verse Vault", description: "Poetry in Hindi, English, and Odia — the language of the soul.", path: "/wanderer/poetry" },
];

/* Twinkling star */
const TwinklingStar = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.3, 0.8] }}
    transition={{ duration: 2 + delay * 0.3, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L13.5 9 L20 10 L14 13 L15.5 20 L12 15 L8.5 20 L10 13 L4 10 L10.5 9 Z"
        stroke="hsla(45, 80%, 70%, 0.8)" strokeWidth="1" fill="hsla(45, 80%, 70%, 0.15)" />
    </svg>
  </motion.div>
);

const stars = [
  { x: "4%", y: "5%", size: 14, delay: 0 }, { x: "14%", y: "20%", size: 10, delay: 0.7 },
  { x: "85%", y: "8%", size: 12, delay: 0.3 }, { x: "92%", y: "35%", size: 9, delay: 1.2 },
  { x: "72%", y: "3%", size: 11, delay: 0.5 }, { x: "48%", y: "2%", size: 8, delay: 1.5 },
  { x: "28%", y: "7%", size: 10, delay: 0.9 }, { x: "62%", y: "14%", size: 7, delay: 1.8 },
  { x: "6%", y: "60%", size: 9, delay: 1.1 }, { x: "94%", y: "55%", size: 10, delay: 0.4 },
  { x: "78%", y: "82%", size: 10, delay: 0.8 }, { x: "16%", y: "78%", size: 9, delay: 1.3 },
  { x: "38%", y: "88%", size: 8, delay: 1.6 }, { x: "55%", y: "92%", size: 7, delay: 2.0 },
];

/* Floating icon element */
const FloatingIcon = ({ Icon, x, y, size, delay, rotate, color }: {
  Icon: React.ElementType; x: string; y: string; size: number; delay: number; rotate: number; color: string;
}) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, rotate }}
    animate={{ opacity: [0.25, 0.6, 0.25], y: [-6, 6, -6], rotate: [rotate - 3, rotate + 3, rotate - 3] }}
    transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <Icon style={{ width: size, height: size, color }} />
  </motion.div>
);

/* Floating circle */
const FloatingCircle = ({ x, y, size, delay, color }: {
  x: string; y: string; size: number; delay: number; color: string;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: x, top: y, width: size, height: size, border: `1.5px solid ${color}` }}
    animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }}
    transition={{ duration: 4 + delay * 0.5, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

const WandererMode = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12 lg:px-20">
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

        {/* "Beyond the Code" — top center */}
        <motion.div
          className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent/50" />
          <Sparkles className="w-4 h-4 text-accent/60" />
          <p className="text-sm font-mono text-accent/70 tracking-[0.4em] uppercase whitespace-nowrap">Beyond the code</p>
          <Sparkles className="w-4 h-4 text-accent/60" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent/50" />
        </motion.div>

        {/* Twinkling stars */}
        {stars.map((s, i) => <TwinklingStar key={i} {...s} />)}

        {/* White glowing sparkles */}
        {[
          { x: "10%", y: "12%", size: 6, delay: 0 }, { x: "25%", y: "30%", size: 4, delay: 0.5 },
          { x: "45%", y: "8%", size: 5, delay: 1.0 }, { x: "60%", y: "25%", size: 4, delay: 0.3 },
          { x: "80%", y: "10%", size: 6, delay: 0.8 }, { x: "90%", y: "40%", size: 5, delay: 1.3 },
          { x: "15%", y: "55%", size: 4, delay: 0.6 }, { x: "35%", y: "70%", size: 5, delay: 1.1 },
          { x: "55%", y: "60%", size: 6, delay: 0.2 }, { x: "70%", y: "80%", size: 4, delay: 1.5 },
          { x: "88%", y: "70%", size: 5, delay: 0.9 }, { x: "30%", y: "90%", size: 4, delay: 1.7 },
          { x: "65%", y: "45%", size: 3, delay: 0.4 }, { x: "50%", y: "85%", size: 5, delay: 1.2 },
          { x: "20%", y: "42%", size: 3, delay: 0.7 }, { x: "75%", y: "55%", size: 4, delay: 1.4 },
        ].map((s, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: s.x, top: s.y, width: s.size, height: s.size,
              background: "white",
              boxShadow: `0 0 ${s.size * 2}px ${s.size}px rgba(255,255,255,0.8), 0 0 ${s.size * 4}px ${s.size * 2}px rgba(255,255,255,0.4)`,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 1.5 + s.delay * 0.3, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          />
        ))}

        {/* Floating icons — sunflowers, flowers, suns */}
        <FloatingIcon Icon={Flower2} x="8%" y="15%" size={22} delay={0} rotate={-15} color="hsla(45, 70%, 60%, 0.2)" />
        <FloatingIcon Icon={Sun} x="18%" y="70%" size={20} delay={1.2} rotate={10} color="hsla(40, 65%, 55%, 0.15)" />
        <FloatingIcon Icon={Flower2} x="8%" y="15%" size={26} delay={0} rotate={-15} color="hsla(45, 80%, 65%, 0.45)" />
        <FloatingIcon Icon={Sun} x="18%" y="70%" size={24} delay={1.2} rotate={10} color="hsla(40, 75%, 60%, 0.4)" />
        <FloatingIcon Icon={Flower2} x="80%" y="75%" size={22} delay={0.8} rotate={20} color="hsla(330, 50%, 65%, 0.35)" />
        <FloatingIcon Icon={Sparkles} x="88%" y="18%" size={20} delay={1.5} rotate={-8} color="hsla(45, 70%, 70%, 0.4)" />
        <FloatingIcon Icon={Flower2} x="70%" y="90%" size={24} delay={0.4} rotate={-12} color="hsla(45, 80%, 65%, 0.3)" />
        <FloatingIcon Icon={Sun} x="5%" y="45%" size={22} delay={2} rotate={5} color="hsla(35, 70%, 60%, 0.35)" />
        <FloatingIcon Icon={Flower2} x="50%" y="5%" size={20} delay={1} rotate={15} color="hsla(330, 45%, 60%, 0.25)" />
        <FloatingIcon Icon={Sun} x="92%" y="45%" size={18} delay={0.6} rotate={-5} color="hsla(40, 75%, 60%, 0.3)" />

        {/* Floating circles */}
        <FloatingCircle x="12%" y="30%" size={45} delay={0.3} color="hsla(45, 60%, 65%, 0.25)" />
        <FloatingCircle x="75%" y="15%" size={65} delay={1} color="hsla(270, 40%, 65%, 0.18)" />
        <FloatingCircle x="85%" y="65%" size={40} delay={0.6} color="hsla(35, 60%, 60%, 0.22)" />
        <FloatingCircle x="25%" y="80%" size={55} delay={1.4} color="hsla(330, 40%, 60%, 0.16)" />
        <FloatingCircle x="60%" y="50%" size={32} delay={1.8} color="hsla(45, 50%, 65%, 0.14)" />
        <FloatingCircle x="40%" y="35%" size={50} delay={0.9} color="hsla(200, 40%, 60%, 0.12)" />

        {/* ── Layout: Left text + Right photo ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-20">

          {/* Left — Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* "Beyond the Code" moved to absolute top-center */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-poetry font-bold text-foreground leading-[1.2] mb-6">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                A soul that writes in
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <span className="text-accent italic">verses & visions</span>
              </motion.span>
            </h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground/70 leading-relaxed max-w-lg mx-auto lg:mx-0 font-poetry italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              When the compiler rests, the poet awakens. Here lives the art, the wonder,
              and the quiet observations of a curious mind.
            </motion.p>

          </motion.div>

          {/* Right — Photo in frame */}
          <motion.div
            className="flex-shrink-0"
            style={{ y: yPhoto }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <div className="relative">
              {/* Frame */}
              <div className="relative p-2.5 md:p-3 rounded-lg" style={{
                border: "2px solid hsla(35, 40%, 55%, 0.2)",
                background: "hsla(30, 15%, 12%, 0.35)",
                boxShadow: "0 10px 50px hsla(0, 0%, 0%, 0.4), inset 0 1px 0 hsla(35, 40%, 60%, 0.06)",
              }}>
                {/* Top camera-style details */}
                <div className="flex items-center justify-between mb-2 px-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ border: "1px solid hsla(35, 40%, 55%, 0.25)" }} />
                    <div className="w-5 h-1 rounded-full" style={{ border: "1px solid hsla(35, 40%, 55%, 0.15)" }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-accent/15" />
                    <div className="w-1 h-1 rounded-full bg-accent/15" />
                  </div>
                </div>
                {/* Photo */}
                <div className="overflow-hidden rounded" style={{ boxShadow: "inset 0 2px 8px hsla(0, 0%, 0%, 0.3)" }}>
                  <img
                    src={stutiPhoto}
                    alt="Stuti Mohanty"
                    className="w-56 h-64 md:w-64 md:h-[300px] lg:w-72 lg:h-[340px] object-cover object-top"
                  />
                </div>
                {/* Bottom line */}
                <div className="flex items-center justify-center mt-2">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
                </div>
              </div>

              {/* Glow behind */}
              <div className="absolute inset-0 -z-10 blur-[60px] opacity-10" style={{
                background: "radial-gradient(circle, hsla(35, 50%, 55%, 0.4), transparent 70%)",
              }} />
            </div>
          </motion.div>
        </div>

        {/* Explore — centered bottom */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-xs font-mono text-muted-foreground/60 tracking-[0.3em] uppercase">Explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown className="w-6 h-6 text-accent/50" />
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
