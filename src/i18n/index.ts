import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

export const SUPPORTED_LANGUAGES = ["en", "ua", "et"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

// Registered before init so the initial language is applied too.
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.title = i18n.t("meta.title");
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES,
    // English is the default: only an explicit choice (?lng=ru or a saved
    // preference) switches the language, never the browser locale.
    detection: {
      order: ["querystring", "localStorage"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "lang",
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
