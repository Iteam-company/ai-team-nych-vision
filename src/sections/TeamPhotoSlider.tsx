'use client';

import { useState } from 'react';
import ImagePlaceholder from '../components/ImagePlaceholder';

const PHOTO_COUNT = 9;

type Props = { prevLabel: string; nextLabel: string };

/** Team photos with a 3D "dissolve" transition between slides. */
export default function TeamPhotoSlider({ prevLabel, nextLabel }: Props) {
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
        <button
          type="button"
          className="team__arrow team__arrow--prev"
          onClick={() => go(-1)}
          aria-label={prevLabel}
        />
        <button type="button" className="team__arrow" onClick={() => go(1)} aria-label={nextLabel} />
      </div>
    </div>
  );
}
