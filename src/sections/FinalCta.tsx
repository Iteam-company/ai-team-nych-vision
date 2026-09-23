import Button from '../components/Button';
import CircuitLines from '../effects/CircuitLines';
import type { Translator } from '../i18n/translator';
import './FinalCta.css';

export default function FinalCta({ tr }: { tr: Translator }) {
  return (
    <section className="final">
      <CircuitLines className="final__circuit" />
      <div className="container final__inner">
        <h2 className="final__title h-section">{tr.rich('finalCta.title')}</h2>
        <p className="final__text">{tr.t('finalCta.text')}</p>
        <div className="final__actions">
          <Button width={372} variant="cyan">
            {tr.t('cta.consultation')}
          </Button>
          <Button width={265} variant="cyan-outline">
            {tr.t('cta.demo')}
          </Button>
        </div>
        <p className="final__note t-body">{tr.t('finalCta.note')}</p>
      </div>
    </section>
  );
}
