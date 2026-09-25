import WaveOrb from "../effects/WaveOrb";
import type { Translator } from "../i18n/translator";
import "./Stages.css";

type Stage = { title: string; duration: string; text: string };

export default function Stages({ tr }: { tr: Translator }) {
  const stages = tr.raw<Stage[]>("stages.items");

  return (
    <section className="stages">
      <WaveOrb className="stages__orb" />

      <div className="container">
        <h2 className="h-section is-accent">
          <strong>{tr.t("stages.title")}</strong>
        </h2>

        <div className="stages__grid">
          {stages.map((stage, i) => (
            <article key={i} className="stage spotlight">
              <h3 className="stage__title h-card">
                {stage.title}{" "}
                <span className="stage__duration">({stage.duration})</span>
              </h3>
              <p className="stage__text t-body">{stage.text}</p>
              <span className="stage__num" aria-hidden="true">
                {i + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
