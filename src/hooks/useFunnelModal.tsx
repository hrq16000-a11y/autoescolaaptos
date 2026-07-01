import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import FunnelModal from "@/components/FunnelModal";

interface FunnelContextValue {
  open: (source?: string) => void;
  close: () => void;
}

const FunnelContext = createContext<FunnelContextValue | null>(null);

export const FunnelProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string>("global");

  const open = useCallback((src?: string) => {
    setSource(src || "global");
    setIsOpen(true);
    if (typeof window !== "undefined") {
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer?.push({ event: "funnel_open", source: src || "global" });
    }
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <FunnelContext.Provider value={{ open, close }}>
      {children}
      <FunnelModal open={isOpen} onOpenChange={setIsOpen} source={source} />
    </FunnelContext.Provider>
  );
};

export const useFunnelModal = () => {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useFunnelModal must be used within FunnelProvider");
  return ctx;
};
