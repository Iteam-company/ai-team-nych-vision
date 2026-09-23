import { lazy, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedLine from './AnimatedLine';
import ImagePlaceholder from './ImagePlaceholder';
import { usePopup } from './PopupContext';
import RichText from './RichText';
import './Popup.css';

const LeadForm = lazy(() => import('./LeadForm'));

/** Lead-capture modal opened by every call-to-action button. */
export default function Popup() {
  const { t } = useTranslation();
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
      <button type="button" className="popup__close" onClick={close} aria-label={t('common.close')} />
      <div className="popup__box" onClick={(e) => e.stopPropagation()}>
        <div className="popup__info">
          <h2 id="popup-title" className="h-section is-accent">
            <RichText k="popup.title" />
          </h2>
          <p className="popup__text">
            <RichText k="popup.text" />
          </p>
          <AnimatedLine
            className="popup__line"
            d="M1 1V92.66H279.05"
            viewBox="0 0 280.05 93.66"
            width={280}
            height={94}
          />
          <ImagePlaceholder label="Nychvision logo" width={103} height={30} className="popup__logo" />
        </div>
        <Suspense fallback={null}>
          <LeadForm />
        </Suspense>
      </div>
    </div>
  );
}
