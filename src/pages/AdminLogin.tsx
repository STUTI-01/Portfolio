import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  // If already authenticated this session, skip straight to admin
  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate against the edge function by making a lightweight list call
    try {
      const res = await fetch(
        `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/wanderer-admin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passcode: code, action: "list", table: "site_content" }),
        }
      );
      if (res.ok) {
        sessionStorage.setItem("admin_auth", "true");
        sessionStorage.setItem("admin_passcode", code);
        navigate("/admin");
      } else {
        setError("Incorrect passcode");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch {
      setError("Connection error — try again");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div
        className="glass-card p-8 sm:p-10 w-full max-w-sm space-y-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-3">
          <motion.div
            className="w-16 h-16 rounded-full bg-muted flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Lock className="w-7 h-7 text-primary" />
          </motion.div>
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
          {error && (
            <motion.p
              className="text-destructive text-sm"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}
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
