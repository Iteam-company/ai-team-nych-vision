import en from './locales/en.json';
import et from './locales/et.json';
import ru from './locales/ru.json';
import ua from './locales/ua.json';

export type Messages = typeof en;

/** Every translation file. Only the ones listed in LOCALES are published. */
const ALL_DICTIONARIES = { en, ua, ru, et } satisfies Record<string, Messages>;

type KnownLocale = keyof typeof ALL_DICTIONARIES;

/** Published languages, in switcher order. Add a code here to enable it. */
export const LOCALES = ['en', 'ua'] as const satisfies readonly KnownLocale[];
export type Locale = (typeof LOCALES)[number];

/** Served at "/" without a prefix; the others live at "/<code>". */
export const DEFAULT_LOCALE: Locale = 'en';

export const dictionaries: Record<Locale, Messages> = ALL_DICTIONARIES;

/**
 * Standard language tags for <html lang>, hreflang and Open Graph.
 * URL codes stay as they are ("ua"), but Ukrainian's language code is "uk".
 */
export const LOCALE_META: Record<KnownLocale, { htmlLang: string; ogLocale: string }> = {
  en: { htmlLang: 'en', ogLocale: 'en_US' },
  ua: { htmlLang: 'uk', ogLocale: 'uk_UA' },
  ru: { htmlLang: 'ru', ogLocale: 'ru_RU' },
  et: { htmlLang: 'et', ogLocale: 'et_EE' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Public path of a locale's home page. */
export function localePath(locale: Locale) {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}`;
}
