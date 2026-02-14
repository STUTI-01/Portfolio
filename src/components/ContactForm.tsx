import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255).or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);
    try {
      await (supabase as any).from("contact_submissions").insert({
        name: result.data.name,
        email: result.data.email || null,
        message: result.data.message,
        page_source: "recruiter",
      });
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-8">
        <Send className="w-7 h-7 text-primary" />
        <h2 className="section-heading">Get in Touch</h2>
      </div>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 text-center space-y-4"
          >
            <CheckCircle className="w-12 h-12 text-[hsl(142,71%,45%)] mx-auto" />
            <h3 className="font-display font-bold text-xl text-foreground">Message Sent!</h3>
            <p className="text-muted-foreground text-sm">Thanks for reaching out. I'll get back to you soon.</p>
            <button
              onClick={() => setSent(false)}
              className="text-primary text-sm hover:underline mt-4"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="glass-card p-8 space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-muted/20 border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="Your name"
                maxLength={100}
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Email <span className="text-muted-foreground/40">(optional)</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-muted/20 border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="your@email.com"
                maxLength={255}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Message <span className="text-destructive">*</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-muted/20 border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                placeholder="Leave a message, feedback, or just say hi!"
                rows={4}
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.message && <p className="text-destructive text-xs">{errors.message}</p>}
                <p className="text-muted-foreground/40 text-xs ml-auto">{form.message.length}/1000</p>
              </div>
            </div>

            {errors.form && <p className="text-destructive text-xs">{errors.form}</p>}

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-md bg-primary/15 border border-primary/30 text-primary font-medium text-sm hover:bg-primary/25 hover:border-primary/50 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {sending ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ContactForm;
