import LazyBooking from "../components/LazyBooking";
import { Translator } from "../i18n/translator";
import { getBookingProps } from "../lib/booking";
import "./Contact.css";

/**
 * The same Booking form as the popup, inline on the page — for a visitor who
 * scrolls this far, or arrives via a #contact link, without needing a CTA
 * click. The panel around it mirrors the popup's own box (see Popup.css)
 * so the two read as the same UI, just modal vs. inline.
 */
export default function Contacts({ tr }: { tr: Translator }) {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact__panel">
          <header className="contact__header">
            <h2 className="contact__title h-section is-accent">
              {tr.rich("contact.title")}
            </h2>
            <p className="contact__text">{tr.t("booking.subtitle")}</p>
          </header>
          <div className="contact__form">
            <LazyBooking {...getBookingProps(tr)} id="contact-booking" />
          </div>
        </div>
      </div>
    </section>
  );
}
