import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, Loader2, Mail, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL = "stutimohanty01@gmail.com";

const AdminLogin = () => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const hasSent = useRef(false);
  const navigate = useNavigate();

  // Poll for session — magic link may be opened on another device/tab
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate("/admin");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin");
    });

    // Poll every 3s to detect login from another device
    const interval = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate("/admin");
    }, 3000);

    // Also check when tab regains focus
    const onFocus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate("/admin");
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [navigate]);

  const sendMagicLink = async () => {
    if (hasSent.current) return;
    hasSent.current = true;
    setSending(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithOtp({
      email: ADMIN_EMAIL,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    setSending(false);
    if (authError) {
      setError("Failed to send login link. Try again.");
      hasSent.current = false;
    } else {
      setSent(true);
    }
  };

  useEffect(() => {
    sendMagicLink();
  }, []);

  const handleResend = async () => {
    hasSent.current = false;
    await sendMagicLink();
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
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl">Check Your Email</h1>
          <p className="text-sm text-muted-foreground">
            {sending
              ? "Sending login link…"
              : sent
              ? <>We sent a login link to <span className="text-foreground font-medium">{ADMIN_EMAIL}</span>. Click it to access the dashboard.</>
              : "Preparing…"}
          </p>
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        {sent && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" />
              Waiting for you to click the link…
            </div>
            <button
              type="button"
              onClick={handleResend}
              disabled={sending}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              <Send className="w-3 h-3" />
              Resend link
            </button>
          </div>
        )}

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
