import AnimatedLine from '../components/AnimatedLine';
import Button from '../components/Button';
import ImagePlaceholder from '../components/ImagePlaceholder';
// import LanguageSwitcher from '../components/LanguageSwitcher';
import TechCanvas from '../effects/TechCanvas';
import type { Translator } from '../i18n/translator';
import './Hero.css';

const CTA_FRAME =
  'M1 21C1 9.954 9.954 1 21 1H646C657.046 1 666 9.954 666 21V120C666 131.046 657.046 140 646 140H21C9.954 140 1 131.046 1 120Z';

export default function Hero({ tr }: { tr: Translator }) {
  const stats = tr.raw<string[]>('hero.stats');

  return (
    <section className="hero">
      <div className="container">
        <TechCanvas className="hero__canvas" />

        <header className="hero__top">
          <ImagePlaceholder label="Nychvision logo" width={103} height={30} className="hero__logo" />
          {/* <LanguageSwitcher locale={tr.locale} label={tr.t('common.language')} className="hero__lang" /> */}
        </header>

        <h1 className="hero__title">{tr.rich('hero.title')}</h1>
        <p className="hero__subtitle">{tr.t('hero.subtitle')}</p>

        <ul className="hero__stats timeline">
          {stats.map((_, i) => (
            <li key={i} className="hero__stat timeline__item t-body">
              {tr.rich(`hero.stats.${i}`)}
            </li>
          ))}
        </ul>

        <div className="hero__cta">
          <AnimatedLine
            className="hero__cta-frame"
            d={CTA_FRAME}
            viewBox="0 0 667 141"
            width={667}
            height={141}
          />
          <Button width={324} className="hero__cta-btn">
            {tr.t('hero.cta')}
          </Button>
          <p className="hero__cta-note t-lead">{tr.rich('hero.ctaNote')}</p>
        </div>

        <ImagePlaceholder
          label="Phone mockup · AI chat"
          width={314}
          height={649}
          className="hero__phone"
        />
      </div>
    </section>
  );
}
