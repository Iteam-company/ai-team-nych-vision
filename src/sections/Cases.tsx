import { Fragment } from 'react';
import Button from '../components/Button';
import { stripTags } from '../i18n/rich';
import type { Translator } from '../i18n/translator';
import CaseSlider, { type CaseItem } from './CaseSlider';
import './Cases.css';

type Case = { title: string; metric: string; tasks: string[] };

export default function Cases({ tr }: { tr: Translator }) {
  const items: CaseItem[] = tr.raw<Case[]>('cases.items').map((c, i) => ({
    label: stripTags(c.title),
    title: tr.rich(`cases.items.${i}.title`),
    metric: tr.rich(`cases.items.${i}.metric`),
    // Keyed: React validates keys on element arrays passed to client components.
    tasks: c.tasks.map((_, j) => <Fragment key={j}>{tr.rich(`cases.items.${i}.tasks.${j}`)}</Fragment>),
  }));

  return (
    <section className="cases">
      <div className="container">
        <h2 className="h-section is-accent">{tr.t('cases.title')}</h2>

        <CaseSlider items={items} tasksLabel={tr.t('cases.tasksLabel')} />

        <div className="cases__actions">
          <Button width={401} height={73}>
            {tr.t('cta.consultation')}
          </Button>
          <Button width={401} height={73} variant="dark">
            {tr.t('cta.demo')}
          </Button>
        </div>
      </div>
    </section>
  );
}
