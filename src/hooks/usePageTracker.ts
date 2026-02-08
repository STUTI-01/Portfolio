import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const usePageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const logVisit = async () => {
      try {
        await (supabase as any).from("page_visits").insert({
          page_path: location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
          screen_width: window.innerWidth,
        });
      } catch (e) {
        // Silently fail — analytics should never break the app
      }
    };

    // Small delay to avoid logging during rapid navigation
    const timer = setTimeout(logVisit, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);
};
