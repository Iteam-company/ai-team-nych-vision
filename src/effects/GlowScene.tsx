import './effects.css';

/** Large, slowly moving blurred orange glow used as a section background. */
export default function GlowScene({ className = '' }: { className?: string }) {
  return (
    <div className={`glow-scene ${className}`} aria-hidden="true">
      <div className="glow-scene__layer glow-scene__layer--1" />
      <div className="glow-scene__layer glow-scene__layer--2" />
      <div className="glow-scene__layer glow-scene__layer--3" />
      <div className="glow-scene__layer glow-scene__layer--core" />
    </div>
  );
}
