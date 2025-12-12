import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Compass, User, ArrowLeft } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRecruiter = location.pathname.startsWith("/recruiter");
  const isWanderer = location.pathname.startsWith("/wanderer");

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 glass-card border-b border-border/50 px-6 md:px-12"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-display font-medium text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/recruiter"
            className={`flex items-center gap-1.5 transition-colors ${isRecruiter ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">Recruiter</span>
          </Link>
          <Link
            to="/wanderer"
            className={`flex items-center gap-1.5 transition-colors ${isWanderer ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Wanderer</span>
          </Link>
          <Link
            to="/admin-login"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
