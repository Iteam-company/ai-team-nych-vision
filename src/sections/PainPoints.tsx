import type { CSSProperties } from 'react';
import { HourglassIcon, MoneyIcon, PersonIcon, PriceTagIcon } from '../components/LineIcons';
import type { Translator } from '../i18n/translator';
import './PainPoints.css';

type Card = { title: string; lead: string; items: string[] };

/** Icon size and offset (from the row's top-left) for each card, as in the source layout. */
const ICONS = [
  { w: 33, h: 38, x: 432, y: 119, Glyph: HourglassIcon },
  { w: 49, h: 38, x: 1021, y: 116, Glyph: MoneyIcon },
  { w: 42, h: 45, x: 428, y: 149, Glyph: PriceTagIcon },
  { w: 41, h: 52, x: 1026, y: 142, Glyph: PersonIcon },
];

export default function PainPoints({ tr }: { tr: Translator }) {
  const cards = tr.raw<Card[]>('pain.cards');
  const rows = [cards.slice(0, 2), cards.slice(2, 4)];

  return (
    <section className="pain">
      <div className="container">
        <h2 className="pain__title h-section">{tr.t('pain.title')}</h2>

        {rows.map((row, r) => (
          <div key={r} className="pain__row">
            {row.map((card, c) => {
              const i = r * 2 + c;
              const icon = ICONS[i];
              return (
                <div key={i} className="pain__card">
                  <h3 className="h-card">{tr.rich(`pain.cards.${i}.title`)}</h3>
                  <p className="pain__lead t-body">{card.lead}</p>
                  <ul className="pain__list t-body">
                    {card.items.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                  <icon.Glyph
                    width={icon.w}
                    height={icon.h}
                    className="pain__icon"
                    style={{ '--icon-x': `${icon.x}px`, '--icon-y': `${icon.y}px` } as CSSProperties}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
