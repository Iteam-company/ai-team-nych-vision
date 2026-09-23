import './effects.css';

const PATHS = [
  'M0,50 L150,50 L180,80 L350,80',
  'M400,150 L300,150 L270,180 L270,300 L150,300',
  'M50,400 L50,320 L80,290 L200,290',
  'M350,0 L350,100 L300,150',
];

/** Faint circuit-board traces with light pulses running along them. */
export default function CircuitLines({ className = '' }: { className?: string }) {
  return (
    <div className={`circuit ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 400" preserveAspectRatio="none">
        <g className="circuit__lines">
          {PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        {PATHS.map((d, i) => (
          <circle
            key={d}
            r="1.5"
            className={`circuit__dot circuit__dot--${i + 1}`}
            style={{ offsetPath: `path("${d}")` }}
          />
        ))}
      </svg>
    </div>
  );
}
