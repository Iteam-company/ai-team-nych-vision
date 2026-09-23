import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import ImagePlaceholder from '../components/ImagePlaceholder';
import RichText from '../components/RichText';
import GlowScene from '../effects/GlowScene';
import './Team.css';

const PHOTO_COUNT = 9;

/** Logo sizes and positions (relative to the wall's top-left) from the source layout. */
const LOGOS = [
  { w: 147, h: 125, x: 0, y: 0 },
  { w: 225, h: 51, x: 175, y: 26 },
  { w: 197, h: 58, x: 450, y: 22 },
  { w: 133, h: 64, x: 679, y: 20 },
  { w: 147, h: 43, x: 853, y: 34 },
  { w: 203, h: 58, x: 1034, y: 19 },
  { w: 176, h: 65, x: 14, y: 155 },
  { w: 147, h: 89, x: 232, y: 123 },
  { w: 176, h: 89, x: 424, y: 131 },
  { w: 203, h: 57, x: 648, y: 140 },
  { w: 184, h: 74, x: 893, y: 135 },
  { w: 105, h: 105, x: 1100, y: 108 },
  { w: 184, h: 19, x: 16, y: 281 },
  { w: 129, h: 106, x: 224, y: 231 },
  { w: 209, h: 39, x: 383, y: 271 },
  { w: 107, h: 104, x: 625, y: 238 },
  { w: 93, h: 87, x: 760, y: 247 },
  { w: 123, h: 37, x: 889, y: 272 },
  { w: 95, h: 95, x: 1034, y: 248 },
  { w: 119, h: 44, x: 1148, y: 274 },
];

function PhotoSlider() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const go = (step: number) => {
    setPrev(active);
    setActive((active + step + PHOTO_COUNT) % PHOTO_COUNT);
  };

  return (
    <div className="team__slider">
      <div className="team__slides">
        {Array.from({ length: PHOTO_COUNT }, (_, i) => (
          <div
            key={i}
            className={`team__slide ${i === active ? 'is-active' : ''} ${i === prev ? 'is-exit' : ''}`}
            aria-hidden={i !== active}
          >
            <ImagePlaceholder label={`Team photo ${i + 1}`} width={513} height={321} rounded={false} />
          </div>
        ))}
      </div>
      <div className="team__arrows">
        <button type="button" className="team__arrow team__arrow--prev" onClick={() => go(-1)} aria-label={t('common.prev')} />
        <button type="button" className="team__arrow" onClick={() => go(1)} aria-label={t('common.next')} />
      </div>
    </div>
  );
}

export default function Team() {
  const { t } = useTranslation();

  return (
    <section className="team">
      <GlowScene className="team__glow" />

      <div className="container">
        <div className="team__grid">
          <div className="team__info">
            <h2 className="h-section">
              <strong>{t('team.title')}</strong>
            </h2>
            <div className="team__about">
              <ImagePlaceholder label="ICIE logo" width={107} height={104} className="team__icie" />
              <div className="team__texts t-body">
                <p className="team__p1">
                  <RichText k="team.p1" />
                </p>
                <p className="team__p2">{t('team.p2')}</p>
              </div>
            </div>
            <div className="team__count">
              <p className="team__number">
                {t('team.count')}
                <span>+</span>
              </p>
              <p className="team__count-text t-body">
                <RichText k="team.countText" />
              </p>
            </div>
            <Button width={372} variant="light" className="team__cta">
              {t('cta.estimate')}
            </Button>
          </div>

          <PhotoSlider />
        </div>

        <h2 className="clients__title h-section">
          <strong>{t('clients.title')}</strong>
        </h2>
        <div className="clients__wall">
          {LOGOS.map((logo, i) => (
            <ImagePlaceholder
              key={i}
              label={`Client ${i + 1}`}
              width={logo.w}
              height={logo.h}
              className="clients__logo"
              style={{ left: logo.x, top: logo.y }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
