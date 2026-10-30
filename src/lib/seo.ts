import type { Metadata, Viewport } from 'next';
import { LOCALE_META, LOCALES, localePath, type Locale } from '../i18n/config';
import { stripTags } from '../i18n/rich';
import { getTranslator } from '../i18n/translator';
import { COMPANY } from './company';

/** Public origin used for canonical URLs, hreflang, sitemap and Open Graph. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

/** Share image served by src/app/og-image/route.tsx. */
const SHARE_IMAGE = {
  url: '/og-image',
  width: 1200,
  height: 630,
  alt: 'Nychvision — a team of AI agents that runs your company 24/7',
};

export const VIEWPORT: Viewport = {
  themeColor: '#131313',
};

/** hreflang map for every published locale, plus x-default. */
export function languageAlternates() {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) languages[LOCALE_META[locale].htmlLang] = localePath(locale);
  languages['x-default'] = localePath(LOCALES[0]);
  return languages;
}

export function buildMetadata(locale: Locale): Metadata {
  const { t } = getTranslator(locale);
  const title = stripTags(t('meta.title'));
  const description = stripTags(t('meta.description'));
  const path = localePath(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: COMPANY.brand,
    alternates: {
      canonical: path,
      languages: languageAlternates(),
    },
    openGraph: {
      type: 'website',
      url: path,
      siteName: COMPANY.brand,
      title,
      description,
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_META[l].ogLocale),
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}
