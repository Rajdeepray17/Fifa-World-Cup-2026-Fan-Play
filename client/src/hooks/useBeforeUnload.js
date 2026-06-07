import { useEffect } from 'react';

/**
 * Shows a browser-native "leave this page?" warning on refresh / tab close.
 * Only activates when `shouldWarn` is true.
 */
export function useBeforeUnload(shouldWarn = true) {
  useEffect(() => {
    if (!shouldWarn) return;

    const handler = (e) => {
      e.preventDefault();
      e.returnValue = 'You may lose your progress if you leave this experience.';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [shouldWarn]);
}
