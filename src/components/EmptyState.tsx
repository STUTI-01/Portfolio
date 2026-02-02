import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ElementType;
  title?: string;
  subtitle?: string;
}

const EmptyState = ({ icon: Icon = Inbox, title = "Nothing here yet", subtitle = "Check back soon — something beautiful is on its way." }: EmptyStateProps) => (
  <motion.div
    className="flex flex-col items-center justify-center py-24 text-center"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mb-6"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <Icon className="w-8 h-8 text-accent/40" />
    </motion.div>
    <h3 className="font-poetry text-xl text-foreground/70 mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground/50 font-mono max-w-xs">{subtitle}</p>
  </motion.div>
);

export default EmptyState;
