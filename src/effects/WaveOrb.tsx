import { useId, useRef, type MouseEvent } from 'react';
import './effects.css';

const LAYER_SHIFT = [0.5, -0.8, 1.2];

/** Glowing "gooey" orb that leans toward the cursor. */
export default function WaveOrb({ className = '' }: { className?: string }) {
  const filterId = `goo-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const layers = useRef<(HTMLDivElement | null)[]>([]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offX = (e.clientX - rect.left - rect.width / 2) / 10;
    const offY = (e.clientY - rect.top - rect.height / 2) / 10;
    LAYER_SHIFT.forEach((k, i) => {
      const el = layers.current[i];
      if (el) el.style.transform = `translate(${offX * k}px, ${offY * k}px)`;
    });
  };

  const onLeave = () => {
    layers.current.forEach((el) => {
      if (el) el.style.transform = 'translate(0, 0)';
    });
  };

  return (
    <div className={`wave-orb ${className}`} onMouseMove={onMove} onMouseLeave={onLeave} aria-hidden="true">
      <svg width="0" height="0" className="wave-orb__defs">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 25 -12"
            />
          </filter>
        </defs>
      </svg>
      <div className="wave-orb__body" style={{ filter: `url(#${filterId})` }}>
        {['rays1', 'rays2', 'core'].map((name, i) => (
          <div
            key={name}
            ref={(el) => {
              layers.current[i] = el;
            }}
            className={`wave-orb__layer wave-orb__layer--${name}`}
          />
        ))}
      </div>
    </div>
  );
}
