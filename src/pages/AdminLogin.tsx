import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PASSCODE = "282108";

const AdminLogin = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === PASSCODE) {
      sessionStorage.setItem("admin_auth", "true");
      navigate("/admin");
    } else {
      setError("Incorrect passcode");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
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
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl">Enter Passcode</h1>
          <p className="text-sm text-muted-foreground">Enter your admin passcode to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
              setError("");
            }}
            placeholder="••••••"
            maxLength={6}
            className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-center text-2xl tracking-[0.4em] font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
            autoFocus
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold transition-all hover:brightness-110"
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
