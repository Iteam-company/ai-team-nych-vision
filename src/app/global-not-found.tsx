import type { Metadata } from 'next';
import RootDocument from '../components/RootDocument';
import { DEFAULT_LOCALE, localePath } from '../i18n/config';
import { SITE_URL } from '../lib/seo';
import '../components/Button.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '404 — Page not found | Nychvision',
  robots: { index: false },
};

/** 404 for URLs outside every route (the app has one root layout per language). */
export default function GlobalNotFound() {
  return (
    <RootDocument locale={DEFAULT_LOCALE}>
      <main className="container" style={{ minHeight: '100vh', display: 'grid', placeContent: 'center', gap: 24, textAlign: 'center' }}>
        <p className="h-section is-accent">404</p>
        <h1 className="h-sub">This page does not exist.</h1>
        <p>
          <a className="btn btn--primary" href={localePath(DEFAULT_LOCALE)} style={{ height: 60, textDecoration: 'none' }}>
            Back to the home page
          </a>
        </p>
      </main>
    </RootDocument>
  );
}
