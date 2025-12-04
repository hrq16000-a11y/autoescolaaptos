// Hook para rastreamento de eventos no Google Analytics 4 e Google Ads
// GA4 Measurement ID: G-JKYFW14Z18
// Google Ads ID: AW-16491950534

// Labels de conversão do Google Ads para cada serviço
const CONVERSION_LABELS = {
  enrollment: 'enrollment_click',
  primeira_habilitacao: 'primeira_habilitacao',
  renovacao_cnh: 'renovacao_cnh',
  mudanca_categoria: 'mudanca_categoria',
  curso_reciclagem: 'curso_reciclagem',
  whatsapp_geral: 'whatsapp_geral',
  telefone: 'telefone_click',
  consultor: 'consultor_click',
} as const;

// Mapeamento de nomes de serviços para labels
const SERVICE_TO_LABEL: Record<string, keyof typeof CONVERSION_LABELS> = {
  'Primeira Habilitação': 'primeira_habilitacao',
  'Renovação de CNH': 'renovacao_cnh',
  'Mudança de Categoria': 'mudanca_categoria',
  'Curso de Reciclagem': 'curso_reciclagem',
};

// Valores de conversão por serviço (em BRL)
const CONVERSION_VALUES: Record<string, number> = {
  primeira_habilitacao: 10,
  renovacao_cnh: 5,
  mudanca_categoria: 8,
  curso_reciclagem: 4,
  enrollment: 10,
  whatsapp_geral: 2,
  telefone: 3,
  consultor: 5,
};

export const useAnalytics = () => {
  // Envia evento para GA4 e GTM dataLayer
  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      // Enviar para GA4 via gtag
      if ((window as any).gtag) {
        (window as any).gtag('event', eventName, {
          ...eventParams,
          send_to: 'G-JKYFW14Z18',
        });
      }
      // Enviar para GTM dataLayer
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: eventName,
          ...eventParams,
        });
      }
    }
  };

  // Envia conversão para Google Ads
  const trackGoogleAdsConversion = (conversionLabel: string, value?: number) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: `AW-16491950534/${conversionLabel}`,
        value: value || 1,
        currency: 'BRL',
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
    const label = service && SERVICE_TO_LABEL[service] 
      ? CONVERSION_LABELS[SERVICE_TO_LABEL[service]] 
      : CONVERSION_LABELS.whatsapp_geral;
    const value = service && SERVICE_TO_LABEL[service]
      ? CONVERSION_VALUES[SERVICE_TO_LABEL[service]]
      : CONVERSION_VALUES.whatsapp_geral;

    trackConversion(
      'whatsapp_click',
      'lead_generation',
      `${source}${service ? ` - ${service}` : ''}`,
      value
    );
    trackGoogleAdsConversion(label, value);
  };

  const trackPhoneClick = (source: string) => {
    trackConversion('phone_click', 'lead_generation', source, CONVERSION_VALUES.telefone);
    trackGoogleAdsConversion(CONVERSION_LABELS.telefone, CONVERSION_VALUES.telefone);
  };

  const trackEnrollmentClick = () => {
    trackConversion('enrollment_intent', 'lead_generation', 'hero_cta', CONVERSION_VALUES.enrollment);
    trackGoogleAdsConversion(CONVERSION_LABELS.enrollment, CONVERSION_VALUES.enrollment);
  };

  const trackServiceRequest = (service: string) => {
    const labelKey = SERVICE_TO_LABEL[service];
    const label = labelKey ? CONVERSION_LABELS[labelKey] : 'service_request';
    const value = labelKey ? CONVERSION_VALUES[labelKey] : 3;

    trackConversion('service_request', 'lead_generation', service, value);
    trackGoogleAdsConversion(label, value);
  };

  const trackConsultorClick = () => {
    trackConversion('consultor_click', 'lead_generation', 'services_consultant', CONVERSION_VALUES.consultor);
    trackGoogleAdsConversion(CONVERSION_LABELS.consultor, CONVERSION_VALUES.consultor);
  };

  // Rastrear abertura de formulário externo
  const trackFormOpen = (formName: string, source: string) => {
    trackEvent('form_start', {
      event_category: 'form_interaction',
      event_label: formName,
      form_name: formName,
      source: source,
    });
  };

  // Rastrear clique em link externo
  const trackExternalLink = (linkUrl: string, linkText: string) => {
    trackEvent('external_link_click', {
      event_category: 'engagement',
      event_label: linkText,
      link_url: linkUrl,
    });
  };

  return {
    trackEvent,
    trackConversion,
    trackWhatsAppClick,
    trackPhoneClick,
    trackEnrollmentClick,
    trackServiceRequest,
    trackConsultorClick,
    trackFormOpen,
    trackExternalLink,
    CONVERSION_LABELS,
  };
};
