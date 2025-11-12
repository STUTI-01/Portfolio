import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import wandererHero from "@/assets/wanderer-hero.jpg";
import { Gem, BookOpen, Bird, Camera, PenTool } from "lucide-react";
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

      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={wandererHero}
          alt="Forest landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <motion.div
          className="absolute bottom-12 left-8 md:left-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight text-foreground">
            Welcome to the world,
            <br />
            I call mine.
          </h1>
          <p className="text-sm text-muted-foreground mt-2 tracking-widest uppercase">
            A site by Stuti Mohanty
          </p>
        </motion.div>
      </div>

      {/* Section Grid */}
      <div className="max-w-5xl mx-auto px-6 py-20">
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
