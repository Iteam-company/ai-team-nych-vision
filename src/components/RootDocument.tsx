import { Manrope } from 'next/font/google';
import type { ReactNode } from 'react';
import { LOCALE_META, type Locale } from '../i18n/config';
import '../styles/global.css';

/** Self-hosted by Next.js; Cyrillic is included for the Ukrainian/Russian pages. */
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope',
});

/** <html> and <body> shared by every root layout. */
export default function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={LOCALE_META[locale].htmlLang} className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
