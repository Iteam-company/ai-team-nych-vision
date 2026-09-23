import type { CSSProperties } from 'react';
import './ImagePlaceholder.css';

type Props = {
  /** Short description of the image that will go here. */
  label: string;
  width?: number | string;
  height?: number | string;
  /** Use on light backgrounds. */
  light?: boolean;
  rounded?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Stand-in for a real image. Shows what goes here and its source size. */
export default function ImagePlaceholder({
  label,
  width,
  height,
  light,
  rounded = true,
  className = '',
  style,
}: Props) {
  const size =
    typeof width === 'number' && typeof height === 'number' ? `${width}×${height}` : null;
  const compact = typeof height === 'number' && height < 60;

  return (
    <div
      role="img"
      aria-label={label}
      className={[
        'ph',
        light && 'ph--light',
        rounded && 'ph--rounded',
        compact && 'ph--compact',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width, height, ...style }}
    >
      {!compact && (
        <svg className="ph__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="2" />
          <path d="M21 17l-5-5-9 8" />
        </svg>
      )}
      <span className="ph__label">{label}</span>
      {size && !compact && <span className="ph__size">{size}</span>}
    </div>
  );
}
