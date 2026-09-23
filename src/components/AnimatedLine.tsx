import type { CSSProperties } from 'react';
import './AnimatedLine.css';

type Props = {
  d: string;
  viewBox: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
};

/** Orange connector line with a flowing dash animation. */
export default function AnimatedLine({ d, viewBox, width, height, className = '', style }: Props) {
  return (
    <svg
      className={`animated-line ${className}`}
      viewBox={viewBox}
      width={width}
      height={height}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={style}
    >
      <path d={d} />
    </svg>
  );
}
