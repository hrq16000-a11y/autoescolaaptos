import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Foco automático no topo em toda mudança de rota.
 * Respeita âncoras (#) para deep-links não perderem contexto.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
};

export default ScrollToTop;
