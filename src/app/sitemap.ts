import type { MetadataRoute } from 'next';
import { LOCALES, localePath } from '../i18n/config';
import { languageAlternates, SITE_URL } from '../lib/seo';

/** One entry per language version of the landing page, each listing its alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates()).map(([lang, path]) => [lang, `${SITE_URL}${path}`]),
  );

  return LOCALES.map((locale) => ({
    url: `${SITE_URL}${localePath(locale)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    alternates: { languages },
  }));
}
