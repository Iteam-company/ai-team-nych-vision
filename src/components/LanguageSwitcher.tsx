import { LOCALE_META, LOCALES, localePath, type Locale } from '../i18n/config';
import './LanguageSwitcher.css';

type Props = {
  locale: Locale;
  label: string;
  className?: string;
};

/**
 * Plain links between the language versions. Each language is its own page,
 * so switching is a normal navigation that search engines can follow too.
 */
export default function LanguageSwitcher({ locale, label, className = '' }: Props) {
  return (
    <nav className={`lang ${className}`} aria-label={label}>
      {LOCALES.map((lng) => (
        <a
          key={lng}
          href={localePath(lng)}
          hrefLang={LOCALE_META[lng].htmlLang}
          className={`lang__btn ${lng === locale ? 'is-active' : ''}`}
          aria-current={lng === locale ? 'page' : undefined}
        >
          {lng.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}
