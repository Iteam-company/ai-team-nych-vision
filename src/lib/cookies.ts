/**
 * First-party cookie helpers (browser only).
 *
 * What a page can read: only this site's own cookies that are not HttpOnly.
 * Cookies set by other sites (Google, Facebook, ...) are never readable here.
 *
 * Consent model (GDPR): the consent cookie itself is strictly necessary and is
 * always allowed. Everything else — the attribution cookie below, analytics,
 * ad pixels — must only be set after the visitor clicks "Enable cookies".
 */

export type Consent = 'accepted' | 'declined';

const CONSENT_COOKIE = 'cookie_consent';
const ATTRIBUTION_COOKIE = 'visitor_source';

const DAY = 60 * 60 * 24;
const CONSENT_MAX_AGE = 180 * DAY;
const ATTRIBUTION_MAX_AGE = 90 * DAY;

/** Query parameters worth keeping: campaign tags and ad click IDs. */
const TRACKED_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
] as const;

/** Keeps the cookie well under the ~4 KB browser limit. */
const MAX_VALUE_LENGTH = 200;

/** Fired on window when consent changes, and to reopen the banner. */
export const CONSENT_CHANGE_EVENT = 'cookie-consent:change';
export const OPEN_SETTINGS_EVENT = 'cookie-consent:open';

export function setCookie(name: string, value: string, maxAge: number) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

/** Every cookie this page can read, as name → value. */
export function readAllCookies(): Record<string, string> {
  const cookies: Record<string, string> = {};
  for (const part of document.cookie.split(';')) {
    const index = part.indexOf('=');
    if (index < 0) continue;
    const name = part.slice(0, index).trim();
    const raw = part.slice(index + 1).trim();
    try {
      cookies[name] = decodeURIComponent(raw);
    } catch {
      cookies[name] = raw;
    }
  }
  return cookies;
}

export function getCookie(name: string): string | undefined {
  return readAllCookies()[name];
}

export function getConsent(): Consent | undefined {
  const value = getCookie(CONSENT_COOKIE);
  return value === 'accepted' || value === 'declined' ? value : undefined;
}

export function setConsent(consent: Consent) {
  setCookie(CONSENT_COOKIE, consent, CONSENT_MAX_AGE);
  if (consent === 'accepted') {
    captureAttribution();
  } else {
    // Withdrawing consent removes what was stored with it.
    deleteCookie(ATTRIBUTION_COOKIE);
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent }));
}

export type Attribution = Partial<Record<(typeof TRACKED_PARAMS)[number], string>> & {
  /** External site the visitor came from, if any. */
  referrer?: string;
  /** Path + query of the first page they landed on. */
  landingPage?: string;
  /** ISO timestamp of the first recorded visit. */
  firstVisit?: string;
};

/**
 * Records where the visitor came from (first touch). Does nothing without
 * consent, and never overwrites an existing record.
 */
export function captureAttribution() {
  if (getConsent() !== 'accepted' || getCookie(ATTRIBUTION_COOKIE)) return;

  const clip = (value: string) => value.slice(0, MAX_VALUE_LENGTH);
  const params = new URLSearchParams(location.search);
  const data: Attribution = {
    landingPage: clip(location.pathname + location.search),
    firstVisit: new Date().toISOString(),
  };
  for (const key of TRACKED_PARAMS) {
    const value = params.get(key);
    if (value) data[key] = clip(value);
  }
  if (document.referrer) {
    try {
      const referrer = new URL(document.referrer);
      if (referrer.host !== location.host) data.referrer = clip(referrer.origin + referrer.pathname);
    } catch {
      // Ignore malformed referrers.
    }
  }

  setCookie(ATTRIBUTION_COOKIE, JSON.stringify(data), ATTRIBUTION_MAX_AGE);
}

export function getAttribution(): Attribution | undefined {
  const value = getCookie(ATTRIBUTION_COOKIE);
  if (!value) return undefined;
  try {
    return JSON.parse(value) as Attribution;
  } catch {
    return undefined;
  }
}

export type VisitorData = {
  /** Every readable cookie, raw. */
  cookies: Record<string, string>;
  /** Parsed first-touch source, if recorded. */
  attribution?: Attribution;
  /** Page the form was sent from. */
  page: string;
  language: string;
  timeZone: string;
};

/**
 * Everything the browser lets us know about the visitor from cookies, plus
 * basic context. Returns null unless the visitor accepted cookies.
 */
export function collectVisitorData(): VisitorData | null {
  if (getConsent() !== 'accepted') return null;
  return {
    cookies: readAllCookies(),
    attribution: getAttribution(),
    page: location.href,
    language: navigator.language,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}
