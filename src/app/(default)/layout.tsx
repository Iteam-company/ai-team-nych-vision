import type { ReactNode } from 'react';
import RootDocument from '../../components/RootDocument';
import { DEFAULT_LOCALE } from '../../i18n/config';
import { VIEWPORT } from '../../lib/seo';

export const viewport = VIEWPORT;

/** Root layout for the default language, served without a URL prefix. */
export default function DefaultLocaleLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale={DEFAULT_LOCALE}>{children}</RootDocument>;
}
