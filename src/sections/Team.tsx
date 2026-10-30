import Button from "../components/Button";
import type { Translator } from "../i18n/translator";
import "./Team.css";

/** The "About the team" block was removed; only its call to action stays. */
export default function Team({ tr }: { tr: Translator }) {
  return (
    <section className="team">
      <div className="container">
        <Button width={372} variant="light" className="team__cta">
          {tr.t("cta.estimate")}
        </Button>
      </div>
    </section>
  );
}
