import Button from '../components/Button';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Tilt from '../effects/Tilt';
import type { Translator } from '../i18n/translator';
import './Results.css';

type Card = { value: string[]; caption: string; title: string; text: string };

export default function Results({ tr }: { tr: Translator }) {
  const cards = tr.raw<Card[]>('results.cards');

  return (
    <section className="results">
      <div className="container">
        <h2 className="h-section is-accent">{tr.t('results.title')}</h2>

        <div className="results__grid">
          {cards.map((card, i) => (
            <article key={i} className="stat spotlight">
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
          <p className="results__guarantee t-body">{tr.rich('results.guarantees.0')}</p>
          <Tilt className="results__icon">
            <ImagePlaceholder label="Chat icon" width={69} height={47} light />
          </Tilt>
          <p className="results__guarantee t-body">{tr.rich('results.guarantees.1')}</p>
        </div>

        <Button width={372} variant="dark" arrow className="results__cta">
          {tr.t('cta.bookConsultation')}
        </Button>
      </div>
    </section>
  );
}
