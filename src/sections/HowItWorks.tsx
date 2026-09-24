import AnimatedLine from '../components/AnimatedLine';
import Button from '../components/Button';
import { CrmCalendar, CrmEvent, DialogCard } from '../components/Mockups';
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
          <DialogCard
            width={359}
            height={104}
            name="AI agent"
            role="00:12 · night"
            text="“Two units left in that tower. Before I send the plans — is this for you to live in, or an investment?”"
          />
          <DialogCard
            width={383}
            height={111}
            name="Sofia"
            role="sales manager"
            text="“Picked her up at the viewing. Budget, timeline and financing were already in the card — I just had to close.”"
          />
        </div>
      ) : (
        <div className="how__media how__media--crm">
          <CrmEvent
            kind="lead"
            title="New lead"
            meta="Telegram · 02:14"
            width={171}
            height={58}
            className="how__m1"
          />
          <CrmEvent
            kind="stage"
            title="Stage → Meeting"
            meta="moved by AI"
            width={171}
            height={60}
            className="how__m2"
          />
          <CrmEvent
            kind="payment"
            title="Deposit paid"
            meta="link sent 03:47"
            width={148}
            height={56}
            className="how__m3"
          />
          <AnimatedLine
            className="how__connectors"
            d={CONNECTORS}
            viewBox="0 0 132.5 166.5"
            width={133}
            height={167}
          />
          <CrmCalendar width={350} height={232} className="how__m4" />
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
