import { DEFAULT_LOCALE, dictionaries, type Locale } from './config';
import { renderRich } from './rich';

function resolve(source: unknown, key: string): unknown {
  return key
    .split('.')
    .reduce<unknown>((node, part) => (node == null ? undefined : (node as Record<string, unknown>)[part]), source);
}

/** Server-side translator for one locale, falling back to the default language. */
export function getTranslator(locale: Locale) {
  const lookup = (key: string) =>
    resolve(dictionaries[locale], key) ?? resolve(dictionaries[DEFAULT_LOCALE], key);

  /** A plain string. Returns the key itself when it is missing. */
  const t = (key: string) => {
    const value = lookup(key);
    return typeof value === 'string' ? value : key;
  };

  return {
    locale,
    t,
    /** A string with inline tags (<accent>, <b>, <m>, <br/>) rendered as React nodes. */
    rich: (key: string) => renderRich(t(key)),
    /** A non-string value such as an array or object. */
    raw: <T>(key: string) => lookup(key) as T,
  };
}

export type Translator = ReturnType<typeof getTranslator>;
