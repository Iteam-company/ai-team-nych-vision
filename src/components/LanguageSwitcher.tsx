import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../i18n";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage;

  return (
    <div
      className={`lang ${className}`}
      role="group"
      aria-label={t("common.language")}
    >
      {SUPPORTED_LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          className={`lang__btn ${lng === current ? "is-active" : ""}`}
          aria-pressed={lng === current}
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
