import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import ImagePlaceholder from '../components/ImagePlaceholder';
import RichText from '../components/RichText';
import { trackSpotlight } from '../effects/spotlight';
import Tilt from '../effects/Tilt';
import './Results.css';

type Card = { value: string[]; caption: string; title: string; text: string };

export default function Results() {
  const { t } = useTranslation();
  const cards = t('results.cards', { returnObjects: true }) as Card[];

  return (
    <section className="results">
      <div className="container">
        <h2 className="h-section is-accent">{t('results.title')}</h2>

        <div className="results__grid">
          {cards.map((card, i) => (
            <article key={i} className="stat spotlight" onMouseMove={trackSpotlight}>
              <div className="stat__head">
                <p className="stat__value">
                  {card.value.map((part, j) => (
                    <span key={j}>{part}</span>
                  ))}
                </p>
                <p className="stat__caption h-card">{card.caption}</p>
              </div>
              <div className="stat__body is-dark">
                <h3 className="h-card">{card.title}</h3>
                <p className="stat__text t-body">{card.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="results__guarantees is-dark">
          <Tilt className="results__icon">
            <ImagePlaceholder label="Contract icon" width={54} height={63} light />
          </Tilt>
          <p className="results__guarantee t-body">
            <RichText k="results.guarantees.0" />
          </p>
          <Tilt className="results__icon">
            <ImagePlaceholder label="Chat icon" width={69} height={47} light />
          </Tilt>
          <p className="results__guarantee t-body">
            <RichText k="results.guarantees.1" />
          </p>
        </div>

        <Button width={372} variant="dark" arrow className="results__cta">
          {t('cta.bookConsultation')}
        </Button>
      </div>
    </section>
  );
}
