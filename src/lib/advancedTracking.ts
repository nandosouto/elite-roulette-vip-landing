
// Interface para os parâmetros de rastreamento universal
interface TrackingParams {
  event: string; 
  session_id: string;
  event_id: string;
  external_id?: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content?: string;
  utm_term?: string;
  screen_resolution: string;
  language: string;
  timezone_offset: number;
  device_memory?: string;
  connection_type?: string;
  page_load_time?: number;
  time_on_page?: number;
  scroll_depth?: number;
  referrer: string;
  fbp?: string;
  fbc?: string;
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  timestamp: string;
}

// Gerar ID de sessão
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

// Gerar ID de evento
const generateEventId = (): string => {
  return `event_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

// Gerar External ID baseado em user agent + language + timezone
const generateExternalId = (): string => {
  const components = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset(),
  ];
  
  // Simples implementação de hash
  let hash = 0;
  const str = components.join('|');
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Converter para 32bit integer
  }
  return 'ext_' + Math.abs(hash).toString(36);
};

// Obter parâmetros UTM
const getUtmParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    utm_source: searchParams.get('utm_source') || '',
    utm_medium: searchParams.get('utm_medium') || '',
    utm_campaign: searchParams.get('utm_campaign') || '',
    utm_content: searchParams.get('utm_content') || '',
    utm_term: searchParams.get('utm_term') || '',
  };
};

// Obter dados do dispositivo
const getDeviceData = () => {
  return {
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timezone_offset: new Date().getTimezoneOffset(),
    device_memory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory}GB` : 'unknown',
    connection_type: (navigator as any).connection ? (navigator as any).connection.effectiveType : 'unknown',
  };
};

// Obter Facebook Browser ID (fbp) e Click ID (fbc)
const getFacebookIds = () => {
  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  return {
    fbp: getCookie('_fbp') || '',
    fbc: getCookie('_fbc') || '',
  };
};

// Monitorar profundidade de rolagem
export const setupScrollDepthTracking = () => {
  let scrollMarks = [25, 50, 75, 90];
  let marks: Record<number, boolean> = {};
  scrollMarks.forEach(mark => marks[mark] = false);

  const calculateScrollPercentage = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    return Math.floor((scrollTop / documentHeight) * 100);
  };

  window.addEventListener('scroll', () => {
    const scrollPercentage = calculateScrollPercentage();
    
    scrollMarks.forEach(mark => {
      if (!marks[mark] && scrollPercentage >= mark) {
        marks[mark] = true;
        
        // Track scroll depth event
        trackEvent('scroll_depth', {
          scroll_depth: mark,
          value: 0,
          content_name: `Roleta Scroll ${mark}%`,
        });
      }
    });
  });
};

// Monitorar tempo na página
export const setupTimeOnPageTracking = () => {
  const timeIntervals = [30, 60, 120]; // em segundos
  
  timeIntervals.forEach(interval => {
    setTimeout(() => {
      trackEvent('time_on_page', {
        time_on_page: interval,
        value: 0,
        content_name: `Roleta Time ${interval}s`,
      });
    }, interval * 1000);
  });
};

// Função para rastrear eventos
export const trackEvent = (eventType: 'lead' | 'purchase' | 'scroll_depth' | 'time_on_page', customParams: Record<string, any> = {}) => {
  // Parâmetros de rastreamento universal
  const utmParams = getUtmParams();
  const deviceData = getDeviceData();
  const fbIds = getFacebookIds();
  
  const baseParams: TrackingParams = {
    event: eventType,
    session_id: generateSessionId(),
    event_id: generateEventId(),
    external_id: generateExternalId(),
    ...utmParams,
    ...deviceData,
    referrer: document.referrer,
    ...fbIds,
    timestamp: new Date().toISOString(),
    ...customParams
  };

  // Configurar parâmetros específicos com base no tipo de evento
  if (eventType === 'lead') {
    baseParams.content_name = customParams.content_name || 'Telegram Lead Roleta';
    baseParams.content_category = customParams.content_category || 'Gambling';
    baseParams.content_ids = customParams.content_ids || ['grupo_free_roleta_lead'];
  }
  
  if (eventType === 'purchase') {
    baseParams.value = customParams.value || 1.99;
    baseParams.currency = customParams.currency || 'BRL';
    baseParams.content_name = customParams.content_name || 'Telegram Purchase Roleta';
    baseParams.content_category = customParams.content_category || 'Gambling';
    baseParams.content_ids = customParams.content_ids || ['grupo_free_roleta_purchase'];
  }
  
  // Armazenar os dados do evento em cookie
  const setCookie = (name: string, value: any, days: number) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (typeof value === 'string' ? value : JSON.stringify(value)) + expires + "; path=/";
  };
  
  setCookie('roleta_elite_session', baseParams, 30);
  
  // Enviar dados para GTM
  if (window.dataLayer) {
    // Enviar evento para GTM
    const gtmEvent = eventType === 'lead' ? 'Telegram_Click' : eventType === 'purchase' ? 'Telegram_Purchase' : eventType;
    
    window.dataLayer.push({
      event: gtmEvent,
      category: eventType === 'lead' ? 'Engagement' : eventType === 'purchase' ? 'Conversion' : 'Interaction',
      ...baseParams
    });
  }
  
  // Enviar dados para GA4
  if (typeof gtag === 'function') {
    const ga4Params: Record<string, any> = {
      ...baseParams
    };
    
    if (eventType === 'purchase') {
      ga4Params.value = baseParams.value;
      ga4Params.currency = baseParams.currency;
      ga4Params.items = [{ id: 'grupo_free_roleta_purchase', name: baseParams.content_name }];
    }
    
    gtag('event', eventType === 'lead' ? 'Telegram_Click' : eventType === 'purchase' ? 'Telegram_Purchase' : eventType, ga4Params);
  }
  
  // Enviar dados para Facebook Pixel
  if (typeof fbq === 'function') {
    const fbPixelEvent = eventType === 'lead' ? 'Lead' : eventType === 'purchase' ? 'Purchase' : 'CustomEvent';
    
    const fbParams: Record<string, any> = {};
    
    if (eventType === 'purchase') {
      fbParams.value = baseParams.value;
      fbParams.currency = baseParams.currency;
      fbParams.content_name = baseParams.content_name;
      fbParams.content_category = baseParams.content_category;
      fbParams.content_ids = baseParams.content_ids;
    } else if (eventType === 'lead') {
      fbParams.content_name = baseParams.content_name;
      fbParams.content_category = baseParams.content_category;
      fbParams.content_ids = baseParams.content_ids;
    } else {
      fbParams.content_name = baseParams.content_name;
    }
    
    fbq('track', fbPixelEvent, fbParams);
  }
  
  // Log the event data
  console.log(`${eventType} event tracked:`, baseParams);
  
  return baseParams;
};

// Declarações globais de tipos para as variáveis de rastreamento
declare global {
  interface Window {
    dataLayer: any[];
    fbq: any;
    gtag: any;
    trackPurchase: () => void;
    trackLead: () => void;
  }
}

// Inicializar variáveis globais
window.dataLayer = window.dataLayer || [];
