import { useTranslation } from "react-i18next";
import AnimatedLine from "../components/AnimatedLine";
import LeadForm from "../components/LeadForm";
import RichText from "../components/RichText";
import WaveOrb from "../effects/WaveOrb";
import { trackSpotlight } from "../effects/spotlight";
import "./Stages.css";

type Stage = { title: string; duration: string; text: string };

const STAGE_PATH =
  "M123 1H446V107.17H1V209.08H272V295.21H428.07V321.02H1V357H156.07V438.02H255.06";
const CONTACT_PATH = "M1 1V92.66H279.05";

export default function Stages() {
  const { t } = useTranslation();
  const stages = t("stages.items", { returnObjects: true }) as Stage[];

  return (
    <section className="stages">
      <WaveOrb className="stages__orb" />

      <div className="container">
        <h2 className="h-section is-accent">
          <strong>{t("stages.title")}</strong>
        </h2>

        <div className="stages__grid">
          {stages.map((stage, i) => (
            <article
              key={i}
              className="stage spotlight"
              onMouseMove={trackSpotlight}
            >
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

        <div className="contact">
          <h2 className="contact__title h-section is-accent">
            <RichText k="contact.title" />
          </h2>
          <AnimatedLine
            className="contact__line"
            d={CONTACT_PATH}
            viewBox="0 0 280.05 93.66"
            width={280}
            height={94}
          />
          <div className="contact__form">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
