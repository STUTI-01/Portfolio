import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Compass, User, ArrowLeftRight } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
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
        <Link to="/" className="font-display font-bold text-lg tracking-wider text-foreground hover:text-primary transition-colors">
          STUTI MOHANTY
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/recruiter"
            className={`flex items-center gap-1.5 transition-colors ${isRecruiter ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">Recruiter Mode</span>
          </Link>
          <Link
            to="/wanderer"
            className={`flex items-center gap-1.5 transition-colors ${isWanderer ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Curious Wanderer</span>
          </Link>
          <Link
            to="/admin-login"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 glass-card text-sm text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Switch Profile</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
