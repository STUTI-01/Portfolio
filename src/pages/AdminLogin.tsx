import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, Loader2, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL = "stutimohanty01@gmail.com";

const AdminLogin = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [shake, setShake] = useState(false);
  const hasSent = useRef(false);
  const navigate = useNavigate();

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const sendOtp = async () => {
    if (hasSent.current) return;
    hasSent.current = true;
    setSending(true);
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: ADMIN_EMAIL,
    });
    setSending(false);
    if (authError) {
      setError("Failed to send OTP. Try again.");
      hasSent.current = false;
    } else {
      setOtpSent(true);
    }
  };

  useEffect(() => {
    sendOtp();
  }, []);

  const handleResend = async () => {
    hasSent.current = false;
    setError("");
    setOtp("");
    await sendOtp();
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the OTP");
      triggerShake();
      return;
    }
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.verifyOtp({
      email: ADMIN_EMAIL,
      token: otp.trim(),
      type: "email",
    });

    setLoading(false);
    if (authError) {
      setError(authError.message);
      triggerShake();
    } else {
      navigate("/admin");
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
          <h1 className="font-display font-bold text-2xl">Enter OTP</h1>
          <p className="text-sm text-muted-foreground">
            {sending
              ? "Sending code…"
              : otpSent
              ? `We sent a code to ${ADMIN_EMAIL}`
              : "Preparing to send code…"}
          </p>
        </div>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <motion.input
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
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
            disabled={loading || sending}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold transition-all hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Verify & Enter
          </button>
          <button
            type="button"
            onClick={handleResend}
            disabled={sending}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            <Send className="w-3 h-3" />
            Resend code
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
