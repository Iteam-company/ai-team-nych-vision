"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { collectVisitorData } from "../lib/cookies";
import { fetchBookedTimes, submitBooking, TIME_SLOTS } from "../lib/bookings";
import { CalendarIcon, ChevronIcon, ClockIcon, CheckIcon } from "./LineIcons";
import "./Booking.css";

/** Date formatting locale per site language; falls back to English. */
const INTL_LOCALE: Record<string, string> = { en: "en-US", ua: "uk-UA" };

const DAYS_SHOWN = 8;

type Day = { value: string; weekday: string; day: string };

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** The next `count` week-days as calendar-cell options: weekday on one line, day + month on the other. */
function upcomingDays(count: number, intlLocale: string): Day[] {
  const out: Day[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day === 0 || day === 6) continue; // skip weekends
    out.push({
      value: toDateKey(d),
      weekday: d.toLocaleDateString(intlLocale, { weekday: "short" }),
      day: d.toLocaleDateString(intlLocale, { day: "numeric", month: "short" }),
    });
  }
  return out;
}

export type BookingLabels = {
  date: string;
  time: string;
  dateAndTime: string;
  details: string;
  detailsHint: string;
  name: string;
  email: string;
  phone: string;
  note: string;
  submit: string;
  sending: string;
  success: string;
  slotTaken: string;
  failed: string;
  fieldRequired: string;
  emailInvalid: string;
};

/** Loose "looks like an email" check — UI-level guidance, not full validation. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type BookingProps = {
  locale: string;
  labels: BookingLabels;
  id: string;
};

/**
 * Date + time picker (left) and contact form (right) on a wide screen.
 *
 * On narrow screens the two turn into a pair of independent, collapsible
 * cards — "Date & time" open by default, "Your details" closed — so the
 * visitor sees one manageable section at a time instead of the whole, much
 * taller, form. Above the accordion breakpoint (see Booking.css) both are
 * always shown and the toggle row is hidden, restoring the plain two-column
 * layout — the open/closed state itself is simply ignored there, rather than
 * relying on any single element to size itself differently per breakpoint.
 *
 * Submissions go to /api/bookings, which forwards them to Telegram.
 */
export default function Booking({ locale, labels, id }: BookingProps) {
  const intlLocale = INTL_LOCALE[locale] ?? "en-US";
  // Computed once on mount: this component is loaded client-only (see
  // LazyBooking), so there is no server-rendered date to disagree with.
  const [days] = useState(() => upcomingDays(DAYS_SHOWN, intlLocale));
  const [date, setDate] = useState(days[0]?.value ?? "");
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  // Name + email are required, so they're controlled: the submit button's
  // enabled state and the per-field messages both need to react as the
  // visitor types, not just at submit time.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>(
    {},
  );

  const nameValid = name.trim().length > 0;
  const emailValid = EMAIL_RE.test(email.trim());

  // Mobile accordion state only — ignored above the breakpoint (Booking.css
  // forces both section bodies visible there regardless of these flags).
  const [dateOpen, setDateOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // If the picked time got taken out from under the visitor (fresh
  // availability, or right after a conflict), the stale pick is simply
  // dropped — no separate effect needed to "reset" it.
  const selectedTime = bookedTimes.includes(time) ? "" : time;
  const selectedDay = days.find((d) => d.value === date);
  const canSubmit = Boolean(selectedTime) && nameValid && emailValid;

  useEffect(() => {
    if (!date) return;
    let active = true;
    fetchBookedTimes(date).then((times) => {
      if (active) setBookedTimes(times);
    });
    return () => {
      active = false;
    };
  }, [date]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!canSubmit) {
      // Reveal exactly which required fields are still empty/invalid,
      // whether or not the visitor has already left them once — and expand
      // the card they're in, in case it's currently collapsed on mobile.
      setTouched({ name: true, email: true });
      if (!nameValid || !emailValid) setDetailsOpen(true);
      if (!selectedTime) setDateOpen(true);
      return;
    }
    setStatus("sending");
    setError("");
    const form = new FormData(e.currentTarget);
    const result = await submitBooking({
      name: name.trim(),
      email: email.trim(),
      phone: String(form.get("phone") ?? "").trim(),
      note: String(form.get("note") ?? "").trim(),
      date,
      time: selectedTime,
      locale,
      submittedAt: new Date().toISOString(),
      // Cookies + source data, only if the visitor accepted cookies.
      visitor: collectVisitorData(),
      website: String(form.get("website") ?? ""),
    });

    if (!result.ok) {
      setStatus("error");
      if (result.conflict) {
        setError(labels.slotTaken);
        setTime("");
        setBookedTimes(await fetchBookedTimes(date));
      } else {
        setError(labels.failed);
      }
      return;
    }
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="booking__success">
        <span className="booking__success-icon" aria-hidden="true">
          <CheckIcon width={18} height={18} />
        </span>
        <p>{labels.success}</p>
      </div>
    );
  }

  const dateValue =
    selectedDay || selectedTime
      ? [
          selectedDay && `${selectedDay.weekday}, ${selectedDay.day}`,
          selectedTime,
        ]
          .filter(Boolean)
          .join(" · ")
      : undefined;

  return (
    <form id={id} className="booking" onSubmit={onSubmit} noValidate>
      {/* Honeypot for bots: off-screen and skipped by keyboard and screen readers. */}
      <input
        type="text"
        name="website"
        className="booking__hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="booking__grid">
        {/* Calendar — date + time. Open by default: picking a slot is the first step. */}
        <Section
          bodyId={`${id}-date-body`}
          open={dateOpen}
          onToggle={() => setDateOpen((o) => !o)}
          icon={<CalendarIcon width={18} height={18} />}
          label={labels.dateAndTime}
          value={dateValue}
        >
          <fieldset className="booking__field">
            <legend className="booking__label">
              <CalendarIcon
                className="booking__label-icon"
                width={16}
                height={16}
              />
              {labels.date}
            </legend>
            <div
              className="booking__chips"
              role="radiogroup"
              aria-label={labels.date}
            >
              {days.map((d) => (
                <Chip
                  key={d.value}
                  stacked
                  active={d.value === date}
                  onClick={() => setDate(d.value)}
                >
                  <span className="booking__chip-weekday">{d.weekday}</span>
                  <span className="booking__chip-day">{d.day}</span>
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="booking__field">
            <legend className="booking__label">
              <ClockIcon
                className="booking__label-icon"
                width={16}
                height={16}
              />
              {labels.time}
            </legend>
            <div
              className="booking__chips"
              role="radiogroup"
              aria-label={labels.time}
            >
              {TIME_SLOTS.map((t) => (
                <Chip
                  key={t}
                  active={t === selectedTime}
                  disabled={bookedTimes.includes(t)}
                  onClick={() => setTime(t)}
                >
                  {t}
                </Chip>
              ))}
            </div>
          </fieldset>
        </Section>

        <div className="booking__divider" aria-hidden="true" />

        {/* Contact details. Closed by default on mobile — expands once a slot is picked. */}
        <Section
          bodyId={`${id}-details-body`}
          open={detailsOpen}
          onToggle={() => setDetailsOpen((o) => !o)}
          label={labels.details}
          value={labels.detailsHint}
        >
          <div className="booking__contact">
            <div className="booking__field-group">
              <input
                className={`booking__input ${touched.name && !nameValid ? "has-error" : ""}`}
                type="text"
                name="name"
                autoComplete="name"
                required
                placeholder={labels.name}
                aria-label={labels.name}
                aria-required="true"
                aria-invalid={touched.name && !nameValid}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              />
              {touched.name && !nameValid && (
                <p className="booking__field-error" role="alert">
                  {labels.fieldRequired}
                </p>
              )}
            </div>
            <div className="booking__field-group">
              <input
                className={`booking__input ${touched.email && !emailValid ? "has-error" : ""}`}
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder={labels.email}
                aria-label={labels.email}
                aria-required="true"
                aria-invalid={touched.email && !emailValid}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              />
              {touched.email && !emailValid && (
                <p className="booking__field-error" role="alert">
                  {email.trim() ? labels.emailInvalid : labels.fieldRequired}
                </p>
              )}
            </div>
            <input
              className="booking__input"
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder={labels.phone}
              aria-label={labels.phone}
            />
            <textarea
              className="booking__input booking__note"
              name="note"
              rows={3}
              placeholder={labels.note}
              aria-label={labels.note}
            />

            {status === "error" && (
              <p className="booking__error" role="alert">
                {error}
              </p>
            )}
          </div>
        </Section>
      </div>
      <button
        className="booking__submit"
        type="submit"
        disabled={status === "sending"}
        aria-disabled={!canSubmit || status === "sending"}
      >
        {status === "sending" ? labels.sending : labels.submit}
      </button>
    </form>
  );
}

/**
 * A calendar/contact column on desktop; a collapsible card on mobile.
 *
 * Deliberately plain <div>/<button> rather than <details>/<summary>: closed
 * <details> content can't reliably be forced visible again via CSS — Chromium
 * suppresses its layout box internally regardless of a `display` override,
 * independent of the element's own computed style. A plain `hidden` attribute
 * has no such special case, so "always show it above the accordion
 * breakpoint" (see Booking.css) is a plain, reliable CSS override.
 */
function Section({
  bodyId,
  open,
  onToggle,
  icon,
  label,
  value,
  children,
}: {
  bodyId: string;
  open: boolean;
  onToggle: () => void;
  icon?: ReactNode;
  label: string;
  value?: string;
  children: ReactNode;
}) {
  return (
    <div className={`booking__section ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="booking__summary"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={onToggle}
      >
        {icon && (
          <span className="booking__summary-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="booking__summary-text">
          <span className="booking__summary-label">{label}</span>
          {value && <span className="booking__summary-value">{value}</span>}
        </span>
        <ChevronIcon
          className="booking__summary-caret"
          width={16}
          height={16}
        />
      </button>

      <div id={bodyId} className="booking__section-body" hidden={!open}>
        {children}
      </div>
    </div>
  );
}

function Chip({
  active,
  disabled,
  stacked,
  children,
  onClick,
}: {
  active: boolean;
  disabled?: boolean;
  stacked?: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`booking__chip ${stacked ? "booking__chip--stacked" : ""} ${active ? "is-active" : ""}`}
    >
      {children}
    </button>
  );
}
