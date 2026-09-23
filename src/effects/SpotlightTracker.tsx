'use client';

import { useEffect } from 'react';

/** Elements that react to the cursor through --x / --y (border spotlight, case glow). */
const SELECTOR = '.spotlight, .case';

/**
 * One page-wide listener that stores the cursor position on the hovered
 * element as --x/--y, so the sections themselves can stay server components.
 */
export default function SpotlightTracker() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(SELECTOR);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  return null;
}
