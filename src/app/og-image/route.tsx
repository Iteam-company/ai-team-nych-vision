import { ImageResponse } from 'next/og';

/** Rendered once at build time and served as a static PNG. */
export const dynamic = 'force-static';

const SIZE = { width: 1200, height: 630 };

// CSS variables are not available here; keep in sync with src/styles/tokens.css.
const BG = '#131313';
const ACCENT = '#1388df';
const TEXT = '#ffffff';

/**
 * Social-sharing preview image at /og-image, linked from every page's metadata
 * (see SHARE_IMAGE in src/lib/seo.ts).
 */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: `radial-gradient(circle at 85% 20%, ${ACCENT}66 0%, ${BG} 55%)`,
          color: TEXT,
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, color: ACCENT, letterSpacing: 2 }}>NYCHVISION</div>
        <div style={{ marginTop: 28, fontSize: 72, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          A team of AI agents that runs your company — 24/7
        </div>
        <div style={{ marginTop: 32, fontSize: 30, opacity: 0.75 }}>
          CEO · Sales · Finance · Engineering · Analytics · Custom
        </div>
      </div>
    ),
    SIZE,
  );
}
