import { ADSTERRA_SMARTLINK } from '../components/ads/AdsterraBanner';
import { trackEvent } from './analytics';

let lastTriggerTime = 0;
// Minimal interval between popunder triggers (e.g., 8 seconds) so user gets maximum ads while allowing page navigation
const TRIGGER_COOLDOWN_MS = 8000;

/**
 * Initializes the on-click popunder listener.
 * Whenever a user clicks anywhere on the page, the sponsor smartlink opens in a new background tab.
 */
export function initAdsterraClickTrigger() {
  if (typeof window === 'undefined') return;

  const handleClick = (e: MouseEvent) => {
    // Check if target is explicitly asking to ignore
    const target = e.target as HTMLElement | null;
    if (target?.closest('[data-no-ad="true"]')) return;

    const now = Date.now();
    if (now - lastTriggerTime < TRIGGER_COOLDOWN_MS) {
      return;
    }

    lastTriggerTime = now;
    trackEvent('adsterra_click_triggered', {
      timestamp: now,
      tag: target?.tagName || 'UNKNOWN',
    });

    try {
      const popunderWin = window.open(ADSTERRA_SMARTLINK, '_blank');
      if (popunderWin) {
        // Blur opened tab to return focus to main application
        popunderWin.blur();
        window.focus();
      }
    } catch (err) {
      // Fallback navigation if popups are restricted
      console.debug('Popunder trigger fallback:', err);
    }
  };

  window.addEventListener('click', handleClick, { capture: true, passive: true });

  return () => {
    window.removeEventListener('click', handleClick, { capture: true });
  };
}

export function triggerDirectSmartlink(reason = 'button_click') {
  trackEvent('direct_smartlink_opened', { reason });
  try {
    window.open(ADSTERRA_SMARTLINK, '_blank', 'noopener,noreferrer');
  } catch (_) {}
}
