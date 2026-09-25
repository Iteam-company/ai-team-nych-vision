'use client';

import { OPEN_SETTINGS_EVENT } from '../lib/cookies';

/** Reopens the cookie banner so visitors can change or withdraw consent. */
export default function CookieSettingsButton({ label, className = '' }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
    >
      {label}
    </button>
  );
}
