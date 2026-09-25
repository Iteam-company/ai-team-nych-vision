import AnimatedLine from "../components/AnimatedLine";
import LazyLeadForm from "../components/LazyLeadForm";
import { Translator } from "../i18n/translator";
import { getLeadFormProps } from "../lib/leadForm";
import "./Contact.css";

const CONTACT_PATH = "M1 1V92.66H279.05";

export default function Contacts({ tr }: { tr: Translator }) {
  return (
    <section className="contact">
      <div className="contact__container" id="contact">
        <h2 className="contact__title h-section is-accent">
          {tr.rich("contact.title")}
        </h2>
        <AnimatedLine
          className="contact__line"
          d={CONTACT_PATH}
          viewBox="0 0 280.05 93.66"
          width={280}
          height={94}
        />
        <div className="contact__form">
          <LazyLeadForm {...getLeadFormProps(tr)} id="contact-form" />
        </div>
      </div>
    </section>
  );
}
