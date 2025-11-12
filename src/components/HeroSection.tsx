import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";
import profilePhoto from "@/assets/profile-photo.jpg";
import { Cpu, Shield, Code, Cloud } from "lucide-react";

const rotatingPhrases = [
  "I turn chaos into systems.",
  "I turn ideas into scale.",
  "I turn caffeine into architecture.",
  "I turn complexity into clarity.",
];

const skillCards = [
  {
    icon: Cpu,
    title: "Distributed Systems & Performance",
    description: "Building high-throughput, fault-tolerant distributed systems at scale.",
    color: "primary" as const,
  },
  {
    icon: Shield,
    title: "C++ Concurrency & Systems Programming",
    description: "Low-level systems optimization with multi-threaded architectures.",
    color: "secondary" as const,
  },
  {
    icon: Code,
    title: "AI & Machine Learning",
    description: "Designing intelligent systems that automate and enhance decisions.",
    color: "accent" as const,
  },
  {
    icon: Cloud,
    title: "Cloud & Backend Architecture",
    description: "Scalable cloud-native backend solutions with modern tooling.",
    color: "secondary" as const,
  },
];

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-16 lg:px-24 py-20">
      {/* Hexagonal grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='70' viewBox='0 0 60 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 69.28 0 51.96V17.32z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: "60px 70px",
      }} />

      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto w-full relative z-10">
        {/* Left: Text */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Hi, I am{" "}
              <span className="text-name-highlight italic">Stuti Mohanty</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              I turn coffee into code.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground h-8">
              <TypewriterText phrases={rotatingPhrases} />
            </p>
          </div>
        </motion.div>

        {/* Right: Photo */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-[60px] animate-glow-pulse" />
            <img
              src={profilePhoto}
              alt="Stuti Mohanty"
              className="w-full h-full object-cover rounded-full border-2 border-primary/30 relative z-10"
            />
          </div>
        </motion.div>
      </div>

      {/* Skill Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-7xl mx-auto w-full relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {skillCards.map((card, i) => (
          <motion.div
            key={card.title}
            className="glass-card-hover p-5 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
          >
            <card.icon className="w-8 h-8 text-primary" />
            <h3 className="font-display font-semibold text-sm">{card.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;
