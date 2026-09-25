'use client';

import { useEffect, useState } from 'react';
import {
  captureAttribution,
  getConsent,
  OPEN_SETTINGS_EVENT,
  setConsent,
  type Consent,
} from '../lib/cookies';
import './Button.css';
import './CookieBanner.css';

type Props = {
  text: string;
  acceptLabel: string;
  declineLabel: string;
};

/**
 * Bottom cookie bar. Shown until the visitor chooses, and again when they
 * click "Cookie settings" in the footer. Nothing optional is stored before
 * they click "Enable cookies".
 */
export default function CookieBanner({ text, acceptLabel, declineLabel }: Props) {
  // Decided after mount: the page is static HTML, so the server can't know.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent()) {
      // Returning visitor who already accepted: record a first visit if missing.
      captureAttribution();
    } else {
      setOpen(true);
    }
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (consent: Consent) => {
    setConsent(consent);
    setOpen(false);
  };

  return (
    <section className="cookie-banner" role="region" aria-label={acceptLabel}>
      <p className="cookie-banner__text">{text}</p>
      <div className="cookie-banner__actions">
        <button type="button" className="btn btn--outline cookie-banner__btn" onClick={() => choose('declined')}>
          <span>{declineLabel}</span>
        </button>
        <button type="button" className="btn btn--primary cookie-banner__btn" onClick={() => choose('accepted')}>
          <span>{acceptLabel}</span>
        </button>
      </div>
    </section>
  );
}
