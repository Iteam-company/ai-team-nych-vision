import AnimatedLine from '../components/AnimatedLine';
import Button from '../components/Button';
import ImagePlaceholder from '../components/ImagePlaceholder';
import type { Translator } from '../i18n/translator';
import './HowItWorks.css';

type Item = { title: string; note: string };

const CONNECTORS = 'M35.5 1H74.615L124.6 50.985M1 83.5H70.029L131.5 117.5M82 165.5H131.5';

function Column({ tr, group }: { tr: Translator; group: 'dialog' | 'crm' }) {
  const items = tr.raw<Item[]>(`how.${group}.items`);

  return (
    <div className={`how__col how__col--${group}`}>
      <h3 className="how__col-title h-sub">{tr.t(`how.${group}.title`)}</h3>
      <ul className="how__list timeline">
        {items.map((item, i) => (
          <li key={i} className="timeline__item">
            <p className="how__item-title t-lead">{tr.rich(`how.${group}.items.${i}.title`)}</p>
            <p className="how__item-note t-body">{item.note}</p>
          </li>
        ))}
      </ul>
      <p className="how__outcome t-lead">
        <strong>{tr.t(`how.${group}.outcome`)}</strong>
      </p>

      {group === 'dialog' ? (
        <div className="how__media how__media--dialog">
          <ImagePlaceholder label="Chat message · manager" width={359} height={104} />
          <ImagePlaceholder label="Chat message · manager" width={383} height={111} />
        </div>
      ) : (
        <div className="how__media how__media--crm">
          <ImagePlaceholder label="CRM event" width={171} height={58} className="how__m1" />
          <ImagePlaceholder label="CRM event" width={171} height={60} className="how__m2" />
          <ImagePlaceholder label="CRM event" width={148} height={56} className="how__m3" />
          <AnimatedLine
            className="how__connectors"
            d={CONNECTORS}
            viewBox="0 0 132.5 166.5"
            width={133}
            height={167}
          />
          <ImagePlaceholder label="Tablet · CRM calendar" width={350} height={232} className="how__m4" />
        </div>
      )}
    </div>
  );
}

export default function HowItWorks({ tr }: { tr: Translator }) {
  return (
    <section className="how">
      <div className="container">
        <h2 className="how__title h-section">{tr.rich('how.title')}</h2>

        <div className="how__panel spotlight">
          <Column tr={tr} group="dialog" />
          <Column tr={tr} group="crm" />
        </div>

        <div className="how__actions">
          <Button width={372}>{tr.t('cta.consultation')}</Button>
          <Button width={265} variant="outline">
            {tr.t('cta.demo')}
          </Button>
        </div>
      </div>
    </section>
  );
}
