/**
 * Lightweight, privacy-respecting event tracking utility.
 * No personal data is collected or transmitted.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type EventAction =
  | 'hero_support_click'
  | 'hero_explore_click'
  | 'download_app_click'
  | 'support_method_click'
  | 'upi_modal_open'
  | 'upi_id_copied'
  | 'upi_deep_link_clicked'
  | 'community_link_click'
  | 'reward_page_view'
  | 'reward_claimed'
  | 'return_to_app_click'
  | 'audio_guide_view'
  | 'audio_guide_drawer_toggle';

export interface EventParams {
  method?: string;
  destination?: string;
  articleId?: string;
  category?: string;
  source?: string;
  [key: string]: unknown;
}

export function trackEvent(action: EventAction, params: EventParams = {}) {
  try {
    // 1. Google Analytics integration if available
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', action, params);
    }

    // 2. Local Session metrics counter for engagement measurement
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const storageKey = `sf_event_${action}`;
      const current = parseInt(sessionStorage.getItem(storageKey) || '0', 10);
      sessionStorage.setItem(storageKey, (current + 1).toString());
    }

    // 3. Debug logging in development mode
    if (import.meta.env.DEV) {
      console.info(`[SpatialFlow Analytics] ${action}`, params);
    }
  } catch (err) {
    // Graceful silent fallback
    console.debug('Analytics event could not be logged:', err);
  }
}
