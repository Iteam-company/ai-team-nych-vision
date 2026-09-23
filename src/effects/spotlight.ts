import type { MouseEvent } from 'react';

/**
 * Mouse handler that stores the cursor position on the element as --x/--y.
 * Pair it with the .spotlight class to draw a border glow under the cursor.
 */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--x', `${e.clientX - rect.left}px`);
  el.style.setProperty('--y', `${e.clientY - rect.top}px`);
}
