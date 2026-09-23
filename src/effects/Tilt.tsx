import type { MouseEvent, ReactNode } from 'react';

const RESET = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

function onMove(e: MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const rx = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -8;
  const ry = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8;
  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
}

function onLeave(e: MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = RESET;
}

/** Tilts its content in 3D toward the cursor. */
export default function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{ transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
