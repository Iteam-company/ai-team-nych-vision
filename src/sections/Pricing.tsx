import Button from '../components/Button';
import type { Translator } from '../i18n/translator';
import './Pricing.css';

type AgentPrice = { name: string; setup: string; monthly: string; note?: string };
type Pack = {
  name: string;
  for: string;
  agents: string;
  setup: string;
  monthly: string;
  save: string;
  popular?: boolean;
  items: string[];
};

export default function Pricing({ tr }: { tr: Translator }) {
  const agents = tr.raw<AgentPrice[]>('pricing.agents');
  const packs = tr.raw<Pack[]>('pricing.packs');
  const notes = tr.raw<string[]>('pricing.notes');
  const from = tr.t('pricing.from');
  const perMonth = tr.t('pricing.perMonth');

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="h-section is-accent">
          <strong>{tr.t('pricing.title')}</strong>
        </h2>
        <p className="pricing__subtitle t-lead">{tr.t('pricing.subtitle')}</p>

        <h3 className="pricing__group h-sub">{tr.t('pricing.packsTitle')}</h3>
        <div className="pricing__packs">
          {packs.map((pack) => (
            <article key={pack.name} className={`pack spotlight ${pack.popular ? 'pack--popular' : ''}`}>
              {pack.popular && <span className="pack__badge">{tr.t('pricing.popular')}</span>}
              <h4 className="pack__name">{pack.name}</h4>
              <p className="pack__for t-body">{pack.for}</p>
              <p className="pack__agents">{pack.agents}</p>

              <div className="pack__price">
                <p>
                  <span className="pack__from">{from}</span>
                  <span className="pack__amount">{pack.monthly}</span>
                  <span className="pack__per">{perMonth}</span>
                </p>
                <p className="pack__setup t-body">
                  + {pack.setup} {tr.t('pricing.setupLabel').toLowerCase()}
                </p>
                <p className="pack__save">
                  {tr.t('pricing.save')} {pack.save}
                </p>
              </div>

              <ul className="pack__items t-body">
                {pack.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <Button variant={pack.popular ? 'primary' : 'outline'} className="pack__cta">
                {tr.t('pricing.packCta')}
              </Button>
            </article>
          ))}
        </div>

        <div className="pricing__custom spotlight">
          <div>
            <h4 className="pack__name">{tr.t('pricing.custom.name')}</h4>
            <p className="t-body">{tr.t('pricing.custom.text')}</p>
          </div>
          <Button width={265} variant="cyan">
            {tr.t('pricing.custom.cta')}
          </Button>
        </div>

        <h3 className="pricing__group h-sub">{tr.t('pricing.agentsTitle')}</h3>
        <div className="pricing__table" role="table">
          <div className="pricing__row pricing__row--head" role="row">
            <span role="columnheader" />
            <span role="columnheader">{tr.t('pricing.setupLabel')}</span>
            <span role="columnheader">{tr.t('pricing.monthlyLabel')}</span>
          </div>
          {agents.map((agent) => (
            <div key={agent.name} className="pricing__row" role="row">
              <span role="cell" className="pricing__agent">
                {agent.name}
                {agent.note && <small>{agent.note}</small>}
              </span>
              <span role="cell">
                <span className="pricing__cell-label">{tr.t('pricing.setupLabel')}: </span>
                <span className="pricing__from">{from}</span> {agent.setup}
              </span>
              <span role="cell">
                <span className="pricing__from">{from}</span> {agent.monthly}
                {perMonth}
              </span>
            </div>
          ))}
        </div>

        <ul className="pricing__notes t-body">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
