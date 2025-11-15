import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { LogOut, FolderOpen, FileText, Bird, Camera, Gem, PenTool } from "lucide-react";

const adminSections = [
  { icon: FolderOpen, label: "Projects", count: 10 },
  { icon: FileText, label: "Articles", count: 0 },
  { icon: PenTool, label: "Poems", count: 0 },
  { icon: Gem, label: "Jewellery", count: 0 },
  { icon: Bird, label: "Bird Entries", count: 0 },
  { icon: Camera, label: "Photos", count: 0 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <div className="flex items-center justify-between mb-12">
          <motion.h1
            className="section-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Admin Dashboard
          </motion.h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 glass-card text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {adminSections.map((section, i) => (
            <motion.div
              key={section.label}
              className="glass-card-hover p-6 flex items-center gap-4 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <section.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold">{section.label}</h3>
                <p className="text-xs text-muted-foreground">{section.count} entries</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-16">
          Database-driven CRUD will be added in the next iteration.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
