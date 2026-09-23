import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
// import ru from "./locales/ru.json";
import ua from "./locales/ua.json";

export const SUPPORTED_LANGUAGES = ["en", "ua"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

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
      ua: { translation: ua },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES,
    detection: {
      order: ["querystring", "localStorage"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "lang",
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
