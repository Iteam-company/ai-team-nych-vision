'use client';

import { useEffect, useState, type ReactNode } from 'react';
import ImagePlaceholder from '../components/ImagePlaceholder';
import WaveOrb from '../effects/WaveOrb';

export type CaseItem = {
  /** Plain-text title for the tab's accessible name. */
  label: string;
  title: ReactNode;
  metric: ReactNode;
  tasks: ReactNode[];
};

type Media = { label: string; w: number; h: number; x: number; y: number };

const AUTOPLAY_MS = 15000;

/** Screenshot placeholders per case, positioned relative to the card as in the source layout. */
const LAYOUT: { height: number; media: Media[]; orb?: boolean }[] = [
  { height: 503, media: [{ label: 'Phone · chat screenshot', w: 276, h: 568, x: 634, y: -65 }] },
  {
    height: 503,
    media: [
      { label: 'Chat screenshot', w: 249, h: 108, x: 621, y: 54 },
      { label: 'Chat screenshot', w: 218, h: 130, x: 652, y: 180 },
      { label: 'Chat screenshot', w: 256, h: 114, x: 614, y: 330 },
      { label: 'Phone · chat screenshot', w: 276, h: 568, x: 900, y: -65 },
    ],
  },
  {
    height: 503,
    media: [
      { label: 'Phone · chat screenshot', w: 276, h: 568, x: 641, y: -65 },
      { label: 'Chat screenshot', w: 215, h: 442, x: 885, y: 99 },
    ],
  },
  {
    height: 531,
    media: [
      { label: 'Chat screenshot', w: 320, h: 184, x: 791, y: 32 },
      { label: 'Chat screenshot', w: 320, h: 166, x: 540, y: 104 },
      { label: 'Chat screenshot', w: 320, h: 167, x: 791, y: 241 },
      { label: 'Chat screenshot', w: 320, h: 186, x: 540, y: 292 },
    ],
  },
  {
    height: 525,
    media: [
      { label: 'Phone · chat screenshot', w: 276, h: 568, x: 609, y: -44 },
      { label: 'Phone · chat screenshot', w: 276, h: 568, x: 917, y: -44 },
    ],
  },
  {
    height: 525,
    media: [
      { label: 'CRM screenshot', w: 403, h: 257, x: 657, y: 47 },
      { label: 'Chat screenshot', w: 349, h: 222, x: 576, y: 256 },
    ],
  },
  {
    height: 525,
    orb: true,
    media: [{ label: 'Client logo', w: 226, h: 192, x: 630, y: 162 }],
  },
  { height: 503, media: [{ label: 'Phone · chat screenshot', w: 276, h: 568, x: 634, y: -65 }] },
];

type Props = { items: CaseItem[]; tasksLabel: string };

/**
 * Tabbed case studies. Every case is in the server-rendered HTML;
 * only the tab switching and autoplay run in the browser.
 */
export default function CaseSlider({ items, tasksLabel }: Props) {
  const [active, setActive] = useState(0);

  // Advance automatically; picking a tab restarts the timer.
  useEffect(() => {
    const id = window.setTimeout(() => setActive((i) => (i + 1) % items.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, items.length]);

  return (
    <>
      <div className="cases__tabs" role="tablist">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={item.label}
            className={`cases__tab ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="cases__stage">
        {items.map((item, i) => {
          const layout = LAYOUT[i];
          return (
            <article
              key={i}
              role="tabpanel"
              aria-hidden={i !== active}
              className={`case ${i === active ? 'is-active' : ''} ${i === 2 ? 'case--long-title' : ''}`}
              style={{ minHeight: layout?.height }}
            >
              <div className="case__glow" />
              <div className="case__content">
                <h3 className="case__title">{item.title}</h3>
                <p className={`case__metric ${i === 0 ? 't-body' : ''}`}>{item.metric}</p>
                <p className="case__label t-body">
                  <strong>{tasksLabel}</strong>
                </p>
                <ul className="case__tasks">
                  {item.tasks.map((task, j) => (
                    <li key={j} className="case__task t-body">
                      <span className="case__toggle" aria-hidden="true" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {layout && (
                <div className="case__media">
                  {layout.orb && <WaveOrb className="case__orb" />}
                  {layout.media.map((m, j) => (
                    <ImagePlaceholder
                      key={j}
                      label={m.label}
                      width={m.w}
                      height={m.h}
                      className="case__shot"
                      style={{ left: m.x, top: m.y }}
                    />
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
