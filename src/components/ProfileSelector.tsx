import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Briefcase, Compass, Lock } from "lucide-react";

const profiles = [
  {
    id: "recruiter",
    label: "Recruiter",
    gradient: "from-green-400 to-emerald-600",
    glowColor: "shadow-[0_0_50px_hsl(142_71%_45%/0.5)]",
    Icon: Briefcase,
    path: "/recruiter",
  },
  {
    id: "wanderer",
    label: "Curious Wanderer",
    gradient: "from-amber-400 to-orange-500",
    glowColor: "shadow-[0_0_50px_hsl(38_92%_50%/0.5)]",
    Icon: Compass,
    path: "/wanderer",
  },
  {
    id: "me",
    label: "Me",
    gradient: "from-blue-400 to-blue-600",
    glowColor: "shadow-[0_0_50px_hsl(217_91%_60%/0.5)]",
    Icon: Lock,
    path: "/admin-login",
  },
];

const ProfileSelector = () => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleSelect = (profile: typeof profiles[0]) => {
    setSelectedProfile(profile.id);
    setTimeout(() => navigate(profile.path), 600);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20">
      <motion.h2
        className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-16 sm:mb-24 text-foreground tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Who's Watching?
      </motion.h2>

      <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 md:gap-28">
        {profiles.map((profile, i) => (
          <motion.button
            key={profile.id}
            onClick={() => handleSelect(profile)}
            className="flex flex-col items-center gap-6 group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br ${profile.gradient} flex items-center justify-center transition-shadow duration-500 group-hover:${profile.glowColor}`}
            >
              {selectedProfile === profile.id && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/20"
                  initial={{ scale: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <profile.Icon className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white drop-shadow-lg" strokeWidth={1.5} />
            </div>
            <span className="text-xl font-display font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300">
              {profile.label}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default ProfileSelector;
