import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track, trackPageView } from "@/lib/analytics";
import { addSignal, getLeadProfile, classifyLead } from "@/lib/leadScore";
import { identifyLead } from "@/lib/analytics";

/**
 * Hook único e global: trackeia page_view, tempo na página, contagem de páginas
 * e alimenta o lead score. Deve ficar no <App /> ou em um wrapper de rota.
 */
export const useEngagementTracking = () => {
  const location = useLocation();

  // page_view + contagem de páginas
  useEffect(() => {
    trackPageView(location.pathname, document.title);
    const profile = getLeadProfile();
    addSignal({ type: "pages_viewed", count: (profile.pagesViewed ?? 0) + 1 });
    const updated = getLeadProfile();
    identifyLead({
      score: updated.score,
      class: classifyLead(updated.score),
      category: updated.category,
      urgency: updated.urgency,
    });
  }, [location.pathname]);

  // tempo na página + exit
  useEffect(() => {
    const start = Date.now();
    let firedTime90 = false;

    const timer = window.setInterval(() => {
      const elapsed = Math.round((Date.now() - start) / 1000);
      if (elapsed >= 90 && !firedTime90) {
        firedTime90 = true;
        addSignal({ type: "time_on_site", seconds: elapsed });
        track("time_on_page_90s", { path: location.pathname });
      }
    }, 5000);

    const onExit = () => {
      const elapsed = Math.round((Date.now() - start) / 1000);
      track("exit_page", { path: location.pathname, time_on_page: elapsed });
    };
    window.addEventListener("beforeunload", onExit);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("beforeunload", onExit);
    };
  }, [location.pathname]);
};
