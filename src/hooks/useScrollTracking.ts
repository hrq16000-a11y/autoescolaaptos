import { useEffect, useRef } from 'react';
import { useAnalytics } from './useAnalytics';

// Rastreia profundidade de scroll e visibilidade de seções
export const useScrollTracking = () => {
  const { trackEvent } = useAnalytics();
  const trackedDepths = useRef<Set<number>>(new Set());
  const trackedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Rastrear profundidade de scroll (25%, 50%, 75%, 100%)
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
      
      const thresholds = [25, 50, 75, 100];
      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !trackedDepths.current.has(threshold)) {
          trackedDepths.current.add(threshold);
          trackEvent('scroll_depth', {
            event_category: 'engagement',
            event_label: `${threshold}%`,
            value: threshold,
            percent_scrolled: threshold,
          });
        }
      });
    };

    // Rastrear visibilidade de seções
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !trackedSections.current.has(entry.target.id)) {
            trackedSections.current.add(entry.target.id);
            trackEvent('section_view', {
              event_category: 'engagement',
              event_label: entry.target.id,
              section_name: entry.target.id,
            });
          }
        });
      },
      { threshold: 0.5 } // 50% da seção visível
    );

    sections.forEach(section => observer.observe(section));
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Disparar verificação inicial
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [trackEvent]);
};
