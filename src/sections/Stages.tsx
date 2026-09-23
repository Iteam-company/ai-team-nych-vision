import AnimatedLine from '../components/AnimatedLine';
import LazyLeadForm from '../components/LazyLeadForm';
import WaveOrb from '../effects/WaveOrb';
import type { Translator } from '../i18n/translator';
import { getLeadFormProps } from '../lib/leadForm';
import './Stages.css';

type Stage = { title: string; duration: string; text: string };

// const STAGE_PATH =
//   'M123 1H446V107.17H1V209.08H272V295.21H428.07V321.02H1V357H156.07V438.02H255.06';
const CONTACT_PATH = 'M1 1V92.66H279.05';

export default function Stages({ tr }: { tr: Translator }) {
  const stages = tr.raw<Stage[]>('stages.items');

  return (
    <section className="stages">
      <WaveOrb className="stages__orb" />

      <div className="container">
        <h2 className="h-section is-accent">
          <strong>{tr.t('stages.title')}</strong>
        </h2>

        <div className="stages__grid">
          {stages.map((stage, i) => (
            <article key={i} className="stage spotlight">
              <h3 className="stage__title h-card">
                {stage.title} <span className="stage__duration">({stage.duration})</span>
              </h3>
              <p className="stage__text t-body">{stage.text}</p>
              <span className="stage__num" aria-hidden="true">
                {i + 1}
              </span>
            </article>
          ))}
        </div>

        <div className="contact" id="contact">
          <h2 className="contact__title h-section is-accent">{tr.rich('contact.title')}</h2>
          <AnimatedLine
            className="contact__line"
            d={CONTACT_PATH}
            viewBox="0 0 280.05 93.66"
            width={280}
            height={94}
          />
          <div className="contact__form">
            <LazyLeadForm {...getLeadFormProps(tr)} id="contact-form" />
          </div>
        </div>
      </div>
    </section>
  );
}
