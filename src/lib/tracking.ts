
import { trackEvent, setupScrollDepthTracking, setupTimeOnPageTracking } from './advancedTracking';

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
  // Use a nova implementação de rastreamento avançado
  return trackEvent('purchase');
};

/**
 * Tracks the Lead event when CTA is clicked
 */
export const trackLead = () => {
  // Use a nova implementação de rastreamento avançado
  return trackEvent('lead');
};

// Initialize scroll depth and time on page tracking
export const initializeTracking = () => {
  setupScrollDepthTracking();
  setupTimeOnPageTracking();
};
