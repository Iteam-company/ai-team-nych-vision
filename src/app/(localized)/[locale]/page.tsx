import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingPage from '../../../components/LandingPage';
import { DEFAULT_LOCALE, isLocale, LOCALES } from '../../../i18n/config';
import { buildMetadata } from '../../../lib/seo';

type Props = { params: Promise<{ locale: string }> };

/** Only the published languages exist; anything else is a 404. */
export const dynamicParams = false;

/** The default language lives at "/", so it is not generated here. */
export function generateStaticParams() {
  return LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? buildMetadata(locale) : {};
}

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound();

  return <LandingPage locale={locale} />;
}
