'use client';

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
  /**
   * Renders a link to this URL (opened in a new tab) instead of opening the
   * lead popup. Server components should use this rather than onClick, which
   * can't be passed from the server.
   */
  href?: string;
  /** Custom click handler; only usable from client components. */
  onClick?: () => void;
};

/** Call-to-action button. Links to `href` if given, otherwise opens the lead popup. */
export default function Button({
  children,
  variant = 'primary',
  width,
  height = 72,
  arrow,
  className = '',
  href,
  onClick,
}: Props) {
  const { open } = usePopup();
  const props = {
    className: `btn btn--${variant} ${className}`,
    style: { width, height },
  };
  const content = (
    <>
      {arrow && <span className="btn__arrow" aria-hidden="true" />}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a {...props} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type="button" {...props} onClick={onClick ?? open}>
      {content}
    </button>
  );
}
