import { LOCALE_META, localePath, type Locale } from '../i18n/config';
import { stripTags } from '../i18n/rich';
import { getTranslator } from '../i18n/translator';
import { COMPANY } from '../lib/company';
import { SITE_URL } from '../lib/seo';

/** schema.org Organization + WebSite data for search engines. */
export default function StructuredData({ locale }: { locale: Locale }) {
  const { t } = getTranslator(locale);
  const url = `${SITE_URL}${localePath(locale)}`;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: COMPANY.brand,
        legalName: COMPANY.legalName,
        url: SITE_URL,
        email: COMPANY.email,
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'Estonian Business Register code',
          value: COMPANY.registryCode,
        },
        address: { '@type': 'PostalAddress', ...COMPANY.postalAddress },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: COMPANY.brand,
        description: stripTags(t('meta.description')),
        inLanguage: LOCALE_META[locale].htmlLang,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
