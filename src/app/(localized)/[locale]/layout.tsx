import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import RootDocument from '../../../components/RootDocument';
import { isLocale } from '../../../i18n/config';
import { VIEWPORT } from '../../../lib/seo';

export const viewport = VIEWPORT;

/** Root layout for the prefixed languages ("/ua", ...). */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <RootDocument locale={locale}>{children}</RootDocument>;
}
