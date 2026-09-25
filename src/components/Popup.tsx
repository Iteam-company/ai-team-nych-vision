'use client';

import { useEffect, type ReactNode } from 'react';
import type { BookingProps } from './Booking';
import LazyBooking from './LazyBooking';
import { usePopup } from './PopupContext';
import './Popup.css';

type Props = {
  title: ReactNode;
  text: ReactNode;
  closeLabel: string;
  booking: Omit<BookingProps, 'id'>;
};

/** Booking modal opened by every call-to-action button. */
export default function Popup({ title, text, closeLabel, booking }: Props) {
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
      <div className="popup__box" onClick={(e) => e.stopPropagation()}>
        {/* Anchored to the box itself (not the viewport), so a tall booking
            form can never grow underneath it and hide it. */}
        <button type="button" className="popup__close" onClick={close} aria-label={closeLabel} />
        <header className="popup__header">
          <h2 id="popup-title" className="h-section is-accent">
            {title}
          </h2>
          <p className="popup__text">{text}</p>
        </header>
        <LazyBooking {...booking} id="popup-booking" />
      </div>
    </div>
  );
}
