
/**
 * Sets a cookie with the given name, value and expiration days
 */
export const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

/**
 * Gets a cookie by name
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Tracks the Purchase event when CTA is clicked
 */
export const trackPurchase = () => {
  const eventData = {
    event: 'Purchase',
    session_id: 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    event_id: 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
    utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
    utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
    screen_resolution: window.screen.width + 'x' + window.screen.height,
    language: navigator.language,
    timezone_offset: new Date().getTimezoneOffset(),
    timestamp: new Date().toISOString()
  };

  // Store the event data in cookie
  setCookie('roleta_elite_session', JSON.stringify(eventData), 30);
  
  // Log the event data (can be replaced with actual analytics integration)
  console.log('Purchase event tracked:', eventData);
  
  return eventData;
};
