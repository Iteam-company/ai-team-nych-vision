import type { ReactNode } from 'react';
import { usePopup } from './PopupContext';
import './Button.css';

type Variant = 'primary' | 'outline' | 'dark' | 'light' | 'cyan' | 'cyan-outline';

type Props = {
  children: ReactNode;
  variant?: Variant;
  width?: number;
  height?: number;
  /** Shows the arrow icon before the label. */
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
};

/** Call-to-action button. Opens the lead popup unless onClick is given. */
export default function Button({
  children,
  variant = 'primary',
  width,
  height = 72,
  arrow,
  className = '',
  onClick,
}: Props) {
  const { open } = usePopup();

  return (
    <button
      type="button"
      className={`btn btn--${variant} ${className}`}
      style={{ width, height }}
      onClick={onClick ?? open}
    >
      {arrow && <span className="btn__arrow" aria-hidden="true" />}
      <span>{children}</span>
    </button>
  );
}
