import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ResumeRole {
  id: string;
  role_label: string;
  file_url: string;
}

const ResumeDownload = () => {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<ResumeRole[]>([]);
  const [selected, setSelected] = useState<ResumeRole | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await (supabase as any).from("resumes").select("*").order("display_order");
      if (data && data.length > 0) {
        setRoles(data);
        setSelected(data[0]);
      }
    };
    fetch();
  }, []);

  const handleDownload = () => {
    if (!selected?.file_url) return;
    const link = document.createElement("a");
    link.href = selected.file_url;
    link.download = `${selected.role_label.replace(/[^a-zA-Z0-9]/g, "_")}_Resume.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!selected) return null;

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
          <span className="truncate">{selected.role_label}</span>
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
              {roles.map((role) => (
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
                  {role.role_label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={!selected.file_url}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="w-4 h-4" />
        {selected.file_url ? "Download Resume" : "Resume Not Uploaded"}
      </button>
    </motion.div>
  );
};

export default ResumeDownload;
