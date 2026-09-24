import type { CSSProperties, ReactNode } from 'react';
import BrandIcon, { type BrandIconName } from './BrandIcons';
import { BoltIcon, CalendarIcon, CardIcon, CheckIcon } from './LineIcons';
import './Mockups.css';

/*
 * Flat mockups that stand in for product screenshots.
 *
 * They are built from markup rather than images on purpose: they stay sharp at
 * any size, they are translated with the rest of the page, they cost a few
 * kilobytes instead of a few hundred, and nothing here claims to be a capture
 * of a real customer's inbox.
 */

type Box = { width?: number | string; height?: number | string; className?: string; style?: CSSProperties };

function box({ width, height, className, style }: Box, base: string) {
  return {
    className: [base, className].filter(Boolean).join(' '),
    style: { width, height, ...style },
  };
}

/* ------------------------------------------------------------------ *
 * Chat notification — the "an AI agent that:" card
 * ------------------------------------------------------------------ */

export function ChatNotification({
  app,
  name,
  text,
  time,
  unread,
  ...rest
}: Box & {
  app: BrandIconName;
  name: string;
  text: string;
  time: string;
  unread?: number;
}) {
  return (
    <div {...box(rest, 'mk mk-notif')}>
      <span className={`mk-notif__avatar mk-notif__avatar--${app}`}>
        <BrandIcon name={app} size={18} />
      </span>
      <span className="mk-notif__body">
        <span className="mk-notif__top">
          <span className="mk-notif__name">{name}</span>
          <span className="mk-notif__time">{time}</span>
        </span>
        <span className="mk-notif__row">
          <span className="mk-notif__text">{text}</span>
          {unread ? <span className="mk-notif__badge">{unread}</span> : null}
        </span>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Integrations
 * ------------------------------------------------------------------ */

const CHANNEL_ICONS: BrandIconName[] = [
  'telegram',
  'whatsapp',
  'instagram',
  'messenger',
  'viber',
  'hubspot',
  'googleSheets',
  'notion',
];

/** Channels and tools we connect to, as monochrome glyph tiles. */
export function IntegrationGrid(props: Box) {
  return (
    <div {...box(props, 'mk mk-integrations')}>
      {CHANNEL_ICONS.map((name) => (
        <span key={name} className="mk-integrations__tile">
          <BrandIcon name={name} size={26} />
        </span>
      ))}
    </div>
  );
}

/** CRMs and booking systems, set as wordmarks — most have no open glyph. */
const CRM_NAMES = ['amoCRM', 'Bitrix24', 'Kommo', 'Altegio', 'Yclients', 'Google Calendar'];

export function IntegrationNames(props: Box) {
  return (
    <div {...box(props, 'mk mk-crms')}>
      {CRM_NAMES.map((name) => (
        <span key={name} className="mk-crms__chip">
          {name}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Chat pieces
 * ------------------------------------------------------------------ */

export type Line = { from: 'customer' | 'agent'; text: string; time?: string };

function Bubble({ line, app }: { line: Line; app?: BrandIconName }) {
  return (
    <span className={`mk-line mk-line--${line.from === 'customer' ? 'out' : 'in'}`}>
      <span className={`mk-bubble ${app ? `mk-bubble--${app}` : ''}`}>
        {line.text}
        {line.time && <i className="mk-bubble__time">{line.time}</i>}
      </span>
    </span>
  );
}

/** One exchange, labelled with who is speaking — used beside "how it works". */
export function DialogCard({
  role,
  name,
  text,
  ...rest
}: Box & { role: string; name: string; text: string }) {
  return (
    <div {...box(rest, 'mk mk-dialog')}>
      <span className="mk-dialog__avatar">{name.slice(0, 1)}</span>
      <span className="mk-dialog__body">
        <span className="mk-dialog__head">
          <b>{name}</b>
          <i>{role}</i>
        </span>
        <span className="mk-dialog__text">{text}</span>
      </span>
    </div>
  );
}

/** A slice of a conversation, at whatever size the layout gives it. */
export function ChatShot({ lines, app, ...rest }: Box & { lines: Line[]; app?: BrandIconName }) {
  return (
    <div {...box(rest, 'mk mk-chat')}>
      {lines.map((line, i) => (
        <Bubble key={i} line={line} app={app} />
      ))}
    </div>
  );
}

/** A phone showing a finished conversation. Static — the hero owns the motion. */
export function PhoneShot({
  app,
  contact,
  lines,
  ...rest
}: Box & { app: BrandIconName; contact: string; lines: Line[] }) {
  return (
    <div {...box(rest, 'mk mk-phone')}>
      <div className={`mk-phone__screen mk-phone__screen--${app}`}>
        <span className="mk-phone__island" />
        <span className="mk-phone__bar">
          <i>9:41</i>
          <i className="mk-phone__signal" />
        </span>
        <span className="mk-phone__head">
          <span className="mk-phone__avatar">
            <BrandIcon name={app} size={14} />
          </span>
          <span className="mk-phone__who">
            <b>{contact}</b>
            <i>online</i>
          </span>
        </span>
        <span className="mk-phone__thread">
          {lines.map((line, i) => (
            <Bubble key={i} line={line} />
          ))}
        </span>
        <span className="mk-phone__composer">
          <i />
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * CRM pieces
 * ------------------------------------------------------------------ */

const EVENT_ICONS = {
  lead: BoltIcon,
  stage: CheckIcon,
  payment: CardIcon,
  booking: CalendarIcon,
} as const;

export function CrmEvent({
  kind,
  title,
  meta,
  ...rest
}: Box & { kind: keyof typeof EVENT_ICONS; title: string; meta: string }) {
  const Glyph = EVENT_ICONS[kind];
  return (
    <div {...box(rest, 'mk mk-event')}>
      <span className="mk-event__icon">
        <Glyph width={14} height={14} />
      </span>
      <span className="mk-event__body">
        <b>{title}</b>
        <i>{meta}</i>
      </span>
    </div>
  );
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const SLOTS: { day: number; row: number; span: number; label: string; kind: 'ai' | 'human' }[] = [
  { day: 0, row: 0, span: 1, label: '10:00 Demo', kind: 'ai' },
  { day: 1, row: 1, span: 2, label: '12:30 Viewing', kind: 'ai' },
  { day: 2, row: 0, span: 1, label: '09:30 Call', kind: 'human' },
  { day: 3, row: 2, span: 1, label: '15:00 Meeting', kind: 'ai' },
  { day: 4, row: 1, span: 1, label: '11:00 Fitting', kind: 'ai' },
];

/** Tablet showing the week the agent has filled in. */
export function CrmCalendar(props: Box) {
  return (
    <div {...box(props, 'mk mk-tablet')}>
      <div className="mk-tablet__screen">
        <span className="mk-tablet__bar">
          <b>This week</b>
          <i>Booked by AI · 4 of 5</i>
        </span>
        <div className="mk-tablet__grid">
          {DAYS.map((day, d) => (
            <div key={day} className="mk-tablet__col">
              <span className="mk-tablet__day">{day}</span>
              {[0, 1, 2].map((row) => {
                const slot = SLOTS.find((s) => s.day === d && s.row === row);
                return slot ? (
                  <span
                    key={row}
                    className={`mk-tablet__slot mk-tablet__slot--${slot.kind}`}
                    style={{ gridRow: `span ${slot.span}` }}
                  >
                    {slot.label}
                  </span>
                ) : (
                  <span key={row} className="mk-tablet__free" />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PIPELINE: { stage: string; deals: { name: string; note: string }[] }[] = [
  { stage: 'New', deals: [{ name: 'A. Novak', note: 'Telegram · quad 300cc' }] },
  {
    stage: 'Qualified',
    deals: [
      { name: 'M. Ruiz', note: 'budget confirmed' },
      { name: 'T. Alvi', note: 'test drive asked' },
    ],
  },
  { stage: 'Meeting', deals: [{ name: 'K. Weber', note: 'Sat 11:00' }] },
];

/** A funnel board, the way the agent leaves it. */
export function CrmBoard(props: Box) {
  return (
    <div {...box(props, 'mk mk-board')}>
      <span className="mk-board__bar">
        <b>Deals</b>
        <i>updated by AI agent</i>
      </span>
      <div className="mk-board__cols">
        {PIPELINE.map((col) => (
          <div key={col.stage} className="mk-board__col">
            <span className="mk-board__stage">{col.stage}</span>
            {col.deals.map((deal) => (
              <span key={deal.name} className="mk-board__deal">
                <b>{deal.name}</b>
                <i>{deal.note}</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Neutral stand-in where a client's own mark would go. */
export function ClientEmblem({ children, ...rest }: Box & { children: ReactNode }) {
  return (
    <div {...box(rest, 'mk mk-emblem')}>
      <span>{children}</span>
    </div>
  );
}
