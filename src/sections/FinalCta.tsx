import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import RichText from '../components/RichText';
import CircuitLines from '../effects/CircuitLines';
import './FinalCta.css';

export default function FinalCta() {
  const { t } = useTranslation();

  return (
    <section className="final">
      <CircuitLines className="final__circuit" />
      <div className="container final__inner">
        <h2 className="final__title h-section">
          <RichText k="finalCta.title" />
        </h2>
        <p className="final__text">{t('finalCta.text')}</p>
        <div className="final__actions">
          <Button width={372} variant="cyan">
            {t('cta.consultation')}
          </Button>
          <Button width={265} variant="cyan-outline">
            {t('cta.demo')}
          </Button>
        </div>
        <p className="final__note t-body">{t('finalCta.note')}</p>
      </div>
    </section>
  );
}
