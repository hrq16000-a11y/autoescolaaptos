import { createContext, useContext, useState, ReactNode, useCallback, lazy, Suspense } from "react";

// Code-split: only load the funnel modal JS when a user actually opens it.
const FunnelModal = lazy(() => import("@/components/FunnelModal"));

interface FunnelContextValue {
  open: (source?: string) => void;
  close: () => void;
}

const FunnelContext = createContext<FunnelContextValue | null>(null);

export const FunnelProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [source, setSource] = useState<string>("global");

  const open = useCallback((src?: string) => {
    setSource(src || "global");
    setIsOpen(true);
    setHasOpened(true);
    if (typeof window !== "undefined") {
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer?.push({ event: "funnel_open", source: src || "global" });
    }
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <FunnelContext.Provider value={{ open, close }}>
      {children}
      {hasOpened && (
        <Suspense fallback={null}>
          <FunnelModal open={isOpen} onOpenChange={setIsOpen} source={source} />
        </Suspense>
      )}
    </FunnelContext.Provider>
  );
};

export const useFunnelModal = () => {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useFunnelModal must be used within FunnelProvider");
  return ctx;
};
