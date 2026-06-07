import { useState, useEffect, useRef } from 'react';

/**
 * Detects scroll direction. Returns 'up' | 'down' | null.
 * Used by the Navbar to auto-hide on scroll down and reveal on scroll up.
 */
export function useScrollDirection(threshold = 10) {
  const [scrollDir, setScrollDir] = useState(null);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - lastY.current;

        if (Math.abs(diff) > threshold) {
          setScrollDir(diff > 0 ? 'down' : 'up');
          lastY.current = currentY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollDir;
}
