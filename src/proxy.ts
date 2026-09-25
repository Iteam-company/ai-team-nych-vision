import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, LOCALE_META, LOCALES, localePath, type Locale } from "./i18n/locales";

/**
 * Language auto-detection, before any HTML is sent.
 *
 * - Every visit to a language's home page ("/", "/ua") saves that language in
 *   NEXT_LOCALE — so the language switcher (plain links) updates the choice.
 * - Only a first visit to the default page ("/", no cookie yet) may redirect:
 *   to the visitor's preferred published language from Accept-Language.
 * - Never redirects away from "/ua", and never redirects crawlers: they keep
 *   no cookies, so a redirect would hide pages from search engines for good.
 *
 * The pages themselves stay statically generated; this only adds a redirect
 * or a cookie in front of them.
 */

const COOKIE = "NEXT_LOCALE";
const ONE_YEAR = 60 * 60 * 24 * 365;
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview/i;

/** Accept-Language → published locales, most preferred first (honours q=). */
function preferredLocale(header: string | null): Locale | undefined {
  if (!header) return undefined;
  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return {
        lang: tag.trim().toLowerCase().split("-")[0],
        q: q ? Number(q.slice(2)) : 1,
        index,
      };
    })
    .filter((p) => p.lang && p.lang !== "*" && p.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);

  for (const { lang } of ranked) {
    const match = LOCALES.find((locale) => LOCALE_META[locale].htmlLang === lang);
    if (match) return match;
  }
  return undefined;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const current = LOCALES.find((locale) => localePath(locale) === pathname);
  if (!current) return NextResponse.next();

  const saved = request.cookies.get(COOKIE)?.value;
  const firstVisit = !saved || !isLocale(saved);
  const cookie = {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax" as const,
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
  };

  if (firstVisit && current === DEFAULT_LOCALE && !BOT.test(request.headers.get("user-agent") ?? "")) {
    const preferred = preferredLocale(request.headers.get("accept-language"));
    if (preferred && preferred !== current) {
      const url = request.nextUrl.clone(); // keeps ?utm_… and other params
      url.pathname = localePath(preferred);
      const response = NextResponse.redirect(url);
      response.cookies.set(COOKIE, preferred, cookie);
      return response;
    }
  }

  const response = NextResponse.next();
  if (saved !== current) response.cookies.set(COOKIE, current, cookie);
  return response;
}

// Only the language home pages — assets, images and API routes never hit this.
// Keep in sync with LOCALES (the matcher has to be a static literal).
export const config = {
  matcher: ["/", "/ua"],
};
