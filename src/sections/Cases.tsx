import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import ImagePlaceholder from '../components/ImagePlaceholder';
import RichText from '../components/RichText';
import WaveOrb from '../effects/WaveOrb';
import { trackSpotlight } from '../effects/spotlight';
import './Cases.css';

type Case = { title: string; metric: string; tasks: string[] };
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

export default function Cases() {
  const { t } = useTranslation();
  const cases = t('cases.items', { returnObjects: true }) as Case[];
  const [active, setActive] = useState(0);

  // Advance automatically; picking a tab restarts the timer.
  useEffect(() => {
    const id = window.setTimeout(() => setActive((i) => (i + 1) % cases.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, cases.length]);

  return (
    <section className="cases">
      <div className="container">
        <h2 className="h-section is-accent">{t('cases.title')}</h2>

        <div className="cases__tabs" role="tablist">
          {cases.map((c, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={c.title.replace(/<[^>]+>/g, '')}
              className={`cases__tab ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="cases__stage">
          {cases.map((c, i) => {
            const layout = LAYOUT[i];
            return (
              <article
                key={i}
                role="tabpanel"
                aria-hidden={i !== active}
                className={`case ${i === active ? 'is-active' : ''} ${i === 2 ? 'case--long-title' : ''}`}
                style={{ minHeight: layout.height }}
                onMouseMove={trackSpotlight}
              >
                <div className="case__glow" />
                <div className="case__content">
                  <h3 className="case__title">
                    <RichText k={`cases.items.${i}.title`} />
                  </h3>
                  <p className={`case__metric ${i === 0 ? 't-body' : ''}`}>
                    <RichText k={`cases.items.${i}.metric`} />
                  </p>
                  <p className="case__label t-body">
                    <strong>{t('cases.tasksLabel')}</strong>
                  </p>
                  <ul className="case__tasks">
                    {c.tasks.map((_, j) => (
                      <li key={j} className="case__task t-body">
                        <span className="case__toggle" aria-hidden="true" />
                        <span>
                          <RichText k={`cases.items.${i}.tasks.${j}`} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

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
              </article>
            );
          })}
        </div>

        <div className="cases__actions">
          <Button width={401} height={73}>
            {t('cta.consultation')}
          </Button>
          <Button width={401} height={73} variant="dark">
            {t('cta.demo')}
          </Button>
        </div>
      </div>
    </section>
  );
}
