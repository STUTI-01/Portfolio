import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — will connect to auth later
    setError(true);
    setShake(true);
    setTimeout(() => setShake(false), 500);
    setPasscode("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div
        className="glass-card p-10 w-full max-w-sm space-y-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Lock className="w-7 h-7 text-muted-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl">Enter Passcode</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <motion.input
            type="password"
            value={passcode}
            onChange={(e) => { setPasscode(e.target.value); setError(false); }}
            placeholder="••••••"
            className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-center text-xl tracking-[0.3em] text-foreground focus:outline-none focus:border-primary/50 transition-colors"
            animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
          />
          {error && (
            <p className="text-destructive text-sm mt-2">Incorrect passcode</p>
          )}
          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold transition-all hover:brightness-110"
          >
            Enter
          </button>
        </form>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to profiles
        </Link>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
