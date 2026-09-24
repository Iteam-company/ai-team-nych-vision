'use client';

import { useEffect, type ReactNode } from 'react';
import AnimatedLine from './AnimatedLine';
import BrandLogo from './BrandLogo';
import LazyLeadForm from './LazyLeadForm';
import type { LeadFormProps } from './LeadForm';
import { usePopup } from './PopupContext';
import './Popup.css';

type Props = {
  title: ReactNode;
  text: ReactNode;
  closeLabel: string;
  form: Omit<LeadFormProps, 'id'>;
};

/** Lead-capture modal opened by every call-to-action button. */
export default function Popup({ title, text, closeLabel, form }: Props) {
  const { isOpen, close } = usePopup();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="popup" role="dialog" aria-modal="true" aria-labelledby="popup-title" onClick={close}>
      <button type="button" className="popup__close" onClick={close} aria-label={closeLabel} />
      <div className="popup__box" onClick={(e) => e.stopPropagation()}>
        <div className="popup__info">
          <h2 id="popup-title" className="h-section is-accent">
            {title}
          </h2>
          <p className="popup__text">{text}</p>
          <AnimatedLine
            className="popup__line"
            d="M1 1V92.66H279.05"
            viewBox="0 0 280.05 93.66"
            width={280}
            height={94}
          />
          <BrandLogo className="popup__logo" />
        </div>
        <LazyLeadForm {...form} id="popup-form" />
      </div>
    </div>
  );
}
