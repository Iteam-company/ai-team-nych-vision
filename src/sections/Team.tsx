import Button from "../components/Button";
import GlowScene from "../effects/GlowScene";
import type { Translator } from "../i18n/translator";
import "./Team.css";
import { BrandMark } from "../components/BrandLogo";

/*
 * "Trusted by" is hidden for now — see Team.tsx below. Logo sizes and
 * positions (relative to the wall's top-left) from the source layout are kept
 * here so the wall can be restored once the marks are cleared for use.
 *
 * const LOGOS = [
 *   { w: 147, h: 125, x: 0, y: 0 },
 *   { w: 225, h: 51, x: 175, y: 26 },
 *   { w: 197, h: 58, x: 450, y: 22 },
 *   { w: 133, h: 64, x: 679, y: 20 },
 *   { w: 147, h: 43, x: 853, y: 34 },
 *   { w: 203, h: 58, x: 1034, y: 19 },
 *   { w: 176, h: 65, x: 14, y: 155 },
 *   { w: 147, h: 89, x: 232, y: 123 },
 *   { w: 176, h: 89, x: 424, y: 131 },
 *   { w: 203, h: 57, x: 648, y: 140 },
 *   { w: 184, h: 74, x: 893, y: 135 },
 *   { w: 105, h: 105, x: 1100, y: 108 },
 *   { w: 184, h: 19, x: 16, y: 281 },
 *   { w: 129, h: 106, x: 224, y: 231 },
 *   { w: 209, h: 39, x: 383, y: 271 },
 *   { w: 107, h: 104, x: 625, y: 238 },
 *   { w: 93, h: 87, x: 760, y: 247 },
 *   { w: 123, h: 37, x: 889, y: 272 },
 *   { w: 95, h: 95, x: 1034, y: 248 },
 *   { w: 119, h: 44, x: 1148, y: 274 },
 * ];
 */

export default function Team({ tr }: { tr: Translator }) {
  return (
    <section className="team">
      <GlowScene className="team__glow" />

      <div className="container">
        <div className="team__info">
          <h2 className="h-section">
            <strong>{tr.t("team.title")}</strong>
          </h2>
          <div className="team__about">
            <BrandMark className="team__logo" />
            <div className="team__texts">
              <p className="team__p1">{tr.rich("team.p1")}</p>
            </div>
          </div>
          <div className="team__count">
            <p className="team__number">
              {tr.t("team.count")}
              <span>+</span>
            </p>
            <p className="team__count-text t-body">
              {tr.rich("team.countText")}
            </p>
          </div>
          <Button width={372} variant="light" className="team__cta">
            {tr.t("cta.estimate")}
          </Button>
        </div>
      </div>
    </section>
  );
}
