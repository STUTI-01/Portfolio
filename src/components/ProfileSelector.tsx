import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const profiles = [
  {
    id: "recruiter",
    label: "Recruiter",
    gradient: "from-green-400 to-emerald-600",
    glow: "glow-emerald",
    icon: "🟢",
    path: "/recruiter",
  },
  {
    id: "wanderer",
    label: "Curious Wanderer",
    gradient: "from-amber-400 to-orange-600",
    glow: "glow-amber",
    icon: "🟠",
    path: "/wanderer",
  },
  {
    id: "me",
    label: "Me",
    gradient: "from-blue-400 to-blue-600",
    glow: "glow-blue",
    icon: "🔵",
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
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
      <motion.h2
        className="text-4xl md:text-6xl font-display font-bold mb-16 text-foreground"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Who's Watching?
      </motion.h2>

      <div className="flex flex-col sm:flex-row gap-12 md:gap-20">
        {profiles.map((profile, i) => (
          <motion.button
            key={profile.id}
            onClick={() => handleSelect(profile)}
            className="flex flex-col items-center gap-4 group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${profile.gradient} flex items-center justify-center transition-shadow duration-300 group-hover:${profile.glow}`}>
              {selectedProfile === profile.id && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/20"
                  initial={{ scale: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <span className="text-5xl md:text-6xl">{profile.icon}</span>
            </div>
            <span className="text-lg font-display font-medium text-foreground/80 group-hover:text-foreground transition-colors">
              {profile.label}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default ProfileSelector;
