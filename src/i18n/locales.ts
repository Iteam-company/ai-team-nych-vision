/**
 * Language list, codes and URL helpers. Imports no translation files, so it is
 * cheap to use from the proxy and client code. `config.ts` re-exports all of it.
 */

/** Every language we have (or had) translations for. */
export type KnownLocale = "en" | "ua";

/**
 * Published languages, in switcher order. To enable one, add its code here and
 * its dictionary in config.ts — TypeScript flags a published language without one.
 */
export const LOCALES = ["en", "ua"] as const satisfies readonly KnownLocale[];
export type Locale = (typeof LOCALES)[number];

/** Served at "/" without a prefix; the others live at "/<code>". */
export const DEFAULT_LOCALE: Locale = "en";

/**
 * Standard language tags for <html lang>, hreflang, Open Graph and matching
 * the browser's Accept-Language. URL codes stay as they are ("ua"), but
 * Ukrainian's language code is "uk".
 */
export const LOCALE_META: Record<
  KnownLocale,
  { htmlLang: string; ogLocale: string }
> = {
  en: { htmlLang: "en", ogLocale: "en_US" },
  ua: { htmlLang: "uk", ogLocale: "uk_UA" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Public path of a locale's home page. */
export function localePath(locale: Locale) {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}
