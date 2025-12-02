// Hook para rastreamento de eventos no Google Analytics via GTM
export const useAnalytics = () => {
  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...eventParams,
      });
    }
  };

  const trackConversion = (
    action: string,
    category: string = 'engagement',
    label?: string,
    value?: number
  ) => {
    trackEvent('conversion', {
      event_category: category,
      event_action: action,
      event_label: label,
      value: value,
    });
  };

  const trackWhatsAppClick = (source: string, service?: string) => {
    trackConversion(
      'whatsapp_click',
      'lead_generation',
      `${source}${service ? ` - ${service}` : ''}`,
      1
    );
  };

  const trackPhoneClick = (source: string) => {
    trackConversion('phone_click', 'lead_generation', source, 1);
  };

  const trackEnrollmentClick = () => {
    trackConversion('enrollment_intent', 'lead_generation', 'hero_cta', 5);
  };

  const trackServiceRequest = (service: string) => {
    trackConversion('service_request', 'lead_generation', service, 3);
  };

  return {
    trackEvent,
    trackConversion,
    trackWhatsAppClick,
    trackPhoneClick,
    trackEnrollmentClick,
    trackServiceRequest,
  };
};
