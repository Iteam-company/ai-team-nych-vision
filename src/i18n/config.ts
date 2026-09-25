import en from "./locales/en.json";
// import et from "./locales/et.json";
// import ru from "./locales/ru.json";
import ua from "./locales/ua.json";
import type { Locale } from "./locales";

/** Language list and URL helpers live in ./locales (no JSON, safe for the proxy). */
export * from "./locales";

export type Messages = typeof en;

/** Every loaded translation file. Only the ones listed in LOCALES are published. */
// const ALL_DICTIONARIES = { en, ua, ru, et } satisfies Record<string, Messages>;
const ALL_DICTIONARIES = { en, ua } satisfies Record<string, Messages>;

/** Dictionaries of the published languages; fails to compile if one is missing. */
export const dictionaries: Record<Locale, Messages> = ALL_DICTIONARIES;
