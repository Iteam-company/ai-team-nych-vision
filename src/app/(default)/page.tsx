import LandingPage from '../../components/LandingPage';
import { DEFAULT_LOCALE } from '../../i18n/config';
import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata(DEFAULT_LOCALE);

export default function HomePage() {
  return <LandingPage locale={DEFAULT_LOCALE} />;
}
