import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";

const resumeRoles = [
  { id: "sde", label: "SDE / Backend / Systems", file: "#" },
  { id: "ml", label: "ML / AI Engineer", file: "#" },
  { id: "fullstack", label: "Full Stack Developer", file: "#" },
  { id: "web", label: "Web / App Developer", file: "#" },
  { id: "cpp", label: "C++ Software Engineer", file: "#" },
];

const ResumeDownload = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(resumeRoles[0]);

  const handleDownload = () => {
    // When actual resume files are added, this will trigger download
    if (selected.file !== "#") {
      window.open(selected.file, "_blank");
    }
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      {/* Role selector */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 py-2.5 glass-card text-sm font-medium text-foreground hover:border-primary/30 transition-all duration-200 min-w-[220px] justify-between"
        >
          <span className="truncate">{selected.label}</span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-1 z-30 glass-card border border-border/50 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              {resumeRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelected(role);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    selected.id === role.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
      >
        <Download className="w-4 h-4" />
        Download Resume
      </button>
    </motion.div>
  );
};

export default ResumeDownload;
