import SpotlightTracker from '../effects/SpotlightTracker';
import type { Locale } from '../i18n/config';
import { getTranslator } from '../i18n/translator';
import { getLeadFormProps } from '../lib/leadForm';
import Cases from '../sections/Cases';
import Features from '../sections/Features';
// import FinalCta from '../sections/FinalCta';
import Footer from '../sections/Footer';
import Hero from '../sections/Hero';
import HowItWorks from '../sections/HowItWorks';
import PainPoints from '../sections/PainPoints';
import Results from '../sections/Results';
import Stages from '../sections/Stages';
import Team from '../sections/Team';
import Popup from './Popup';
import { PopupProvider } from './PopupContext';
import StructuredData from './StructuredData';

/** The whole landing page for one language. Rendered to static HTML at build time. */
export default function LandingPage({ locale }: { locale: Locale }) {
  const tr = getTranslator(locale);

  return (
    <PopupProvider>
      <StructuredData locale={locale} />
      <SpotlightTracker />
      <main className="page">
        <Hero tr={tr} />
        <Features tr={tr} />
        <PainPoints tr={tr} />
        <HowItWorks tr={tr} />
        <div className="light-panel">
          <Results tr={tr} />
          <Cases tr={tr} />
        </div>
        <Team tr={tr} />
        <Stages tr={tr} />
        {/* <FinalCta tr={tr} /> */}
      </main>
      <Footer tr={tr} />
      <Popup
        title={tr.rich('popup.title')}
        text={tr.rich('popup.text')}
        closeLabel={tr.t('common.close')}
        form={getLeadFormProps(tr)}
      />
    </PopupProvider>
  );
}
