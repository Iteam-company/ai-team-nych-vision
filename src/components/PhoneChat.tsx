'use client';

import { useEffect, useState } from 'react';
import AgentIcon, { type AgentId } from './AgentIcon';
import BrandIcon from './BrandIcons';
import { ChatAppIcon, DashboardIcon, SparkIcon } from './LineIcons';
import './PhoneChat.css';

/*
 * The hero device: an iPhone showing the AI agent answering a real customer in
 * Telegram and in WhatsApp.
 *
 * The customer's side is typed out character by character in the composer
 * before it is sent, because that is what makes the thread read as a live
 * conversation rather than a list of messages. The agent's side arrives after
 * a typing indicator, the way a real reply does.
 *
 * Everything is scripted and local — nothing is fetched, and the loop restarts
 * so the hero is never caught mid-sentence by a visitor who arrives late.
 */

const BEAT_MS = 620;
const TYPING_MS = 950;
const LOOP_PAUSE_MS = 3600;

/* Typing feel. A fixed interval reads as a machine, so each keystroke gets its
 * own delay: a base with jitter, a small pause after a space and a longer one
 * after punctuation. */
const CHAR_MS = 58;
const CHAR_JITTER = 0.45;
const SPACE_PAUSE_MS = 30;
const CLAUSE_PAUSE_MS = 150;
const SEND_PAUSE_MS = 380;
/** The composer shows the tail of a long draft, as a real one-line input does. */
const COMPOSER_WINDOW = 30;
/**
 * The thread opens with the first exchange already on screen. Starting from
 * nothing left the hero showing an empty phone for the first four seconds,
 * which is exactly the moment a visitor decides whether to keep reading.
 */
const START_AT = 4;

function keystrokeDelay(previous: string | undefined) {
  const jitter = 1 + (Math.random() * 2 - 1) * CHAR_JITTER;
  let delay = CHAR_MS * jitter;
  if (previous === ' ') delay += SPACE_PAUSE_MS;
  if (previous && '.,!?—:'.includes(previous)) delay += CLAUSE_PAUSE_MS;
  return delay;
}

export type Message = { from: 'customer' | 'agent'; text: string };

/** Messenger look of the screen. Each one has its own palette in PhoneChat.css. */
export type ChannelId = 'telegram' | 'whatsapp' | 'chatgpt' | 'claude' | 'dashboard' | AgentId;

export type Channel = {
  id: ChannelId;
  tab: string;
  contact: string;
  subtitle: string;
  placeholder: string;
  messages: Message[];
  /** How many messages are on screen when the thread starts. */
  startAt?: number;
  /** Palette from PhoneChat.css; defaults to the channel id. */
  theme?: string;
};

/** Brand marks for messengers we can show; generic glyphs for the rest. */
function ChannelIcon({ id, size }: { id: ChannelId; size: number }) {
  if (id === 'telegram' || id === 'whatsapp') return <BrandIcon name={id} size={size} />;
  if (id !== 'chatgpt' && id !== 'claude' && id !== 'dashboard') {
    return <AgentIcon id={id} width={size} height={size} />;
  }
  const Glyph = id === 'chatgpt' ? ChatAppIcon : id === 'claude' ? SparkIcon : DashboardIcon;
  return <Glyph width={size} height={size} />;
}

const CHANNELS: Channel[] = [
  {
    id: 'telegram',
    tab: 'Telegram',
    contact: 'Marina Residences',
    subtitle: 'online',
    placeholder: 'Message',
    messages: [
      { from: 'customer', text: 'Hello, I saw your tower on Instagram' },
      { from: 'agent', text: 'Hello! Which project are you looking at — Marina or Downtown?' },
      { from: 'customer', text: 'Is the 2-bedroom on the marina still available?' },
      {
        from: 'agent',
        text: 'Two units left — 96 m² and 104 m², both handover Q3 2027. What budget are you working with?',
      },
      { from: 'customer', text: 'Around 900k, and I would need a payment plan' },
      {
        from: 'agent',
        text: 'The 96 m² fits: 880k on a 40/60 plan, 40% until handover. Shall I hold a viewing for you?',
      },
      { from: 'customer', text: 'Yes, Thursday afternoon if possible' },
      {
        from: 'agent',
        text: 'Booked — Thursday 15:00 with Amir. It is on your card in the CRM and you will get a reminder the day before.',
      },
    ],
  },
  {
    id: 'whatsapp',
    tab: 'WhatsApp',
    contact: 'Lumière Studio',
    subtitle: 'online',
    placeholder: 'Type a message',
    messages: [
      { from: 'customer', text: 'Hi, are you taking new clients?' },
      { from: 'agent', text: 'Hello! Yes we are. Is this for brows or lips?' },
      { from: 'customer', text: 'How much are powder brows?' },
      {
        from: 'agent',
        text: 'Hi! €280, and that includes the touch-up at six weeks. The first visit takes about 2.5 hours.',
      },
      { from: 'customer', text: 'Do you have anything this weekend?' },
      { from: 'agent', text: 'Saturday 11:00 and 16:30 are free. Which one suits you better?' },
      { from: 'customer', text: '11:00 please' },
      {
        from: 'agent',
        text: 'Saved for you. I have sent the deposit link — the slot is held for two hours. See you Saturday!',
      },
    ],
  },
];

/** Walks a scripted thread: types the customer's side, then plays the reply. */
function useScriptedThread(messages: Message[], startAt: number) {
  const [shown, setShown] = useState(startAt);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // Thread finished: hold it on screen, then start over.
    if (shown >= messages.length) {
      const id = window.setTimeout(() => setShown(startAt), LOOP_PAUSE_MS);
      return () => window.clearTimeout(id);
    }

    const message = messages[shown];

    if (message.from === 'customer') {
      // A chained timeout, not an interval — the delay changes per character.
      let typed = 0;
      let pending: number;
      const step = () => {
        typed += 1;
        setDraft(message.text.slice(0, typed));
        if (typed >= message.text.length) {
          pending = window.setTimeout(() => {
            setDraft('');
            setShown((n) => n + 1);
          }, SEND_PAUSE_MS);
          return;
        }
        pending = window.setTimeout(step, keystrokeDelay(message.text[typed - 1]));
      };
      pending = window.setTimeout(step, keystrokeDelay(undefined));
      return () => window.clearTimeout(pending);
    }

    // Agent: a beat, then the typing indicator, then the message.
    const start = window.setTimeout(() => setTyping(true), BEAT_MS);
    const done = window.setTimeout(() => {
      setTyping(false);
      setShown((n) => n + 1);
    }, BEAT_MS + TYPING_MS);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(done);
    };
  }, [shown, messages, startAt]);

  return { shown, draft, typing };
}

function StatusBar() {
  return (
    <div className="pc__status">
      <span className="pc__clock">9:41</span>
      <span className="pc__status-icons">
        <svg viewBox="0 0 18 12" aria-hidden="true" className="pc__signal">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="9" y="3" width="3" height="9" rx="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 16 12" aria-hidden="true" className="pc__wifi">
          <path d="M8 11.2 5.6 8.4a3.6 3.6 0 0 1 4.8 0Z" />
          <path d="M8 4.6c1.9 0 3.6.7 4.9 1.9l1.5-1.8A9.6 9.6 0 0 0 8 2.1a9.6 9.6 0 0 0-6.4 2.6l1.5 1.8A7.2 7.2 0 0 1 8 4.6Z" />
        </svg>
        <svg viewBox="0 0 25 12" aria-hidden="true" className="pc__battery">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.2" className="pc__battery-shell" />
          <rect x="2.2" y="2.2" width="15" height="7.6" rx="1.8" className="pc__battery-fill" />
          <path d="M23 4.3v3.4a2 2 0 0 0 0-3.4Z" className="pc__battery-cap" />
        </svg>
      </span>
    </div>
  );
}

function Screen({ channel, typingLabel }: { channel: Channel; typingLabel: string }) {
  const { shown, draft, typing } = useScriptedThread(channel.messages, channel.startAt ?? START_AT);
  const visible = channel.messages.slice(0, shown);

  return (
    <div className={`pc__screen pc__screen--${channel.theme ?? channel.id}`}>
      <div className="pc__island" aria-hidden="true">
        <span className="pc__lens" />
      </div>

      <StatusBar />

      <div className="pc__header">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="pc__back">
          <path
            d="M15 5 8 12l7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="pc__avatar">
          <ChannelIcon id={channel.id} size={20} />
        </span>
        <span className="pc__who">
          <span className="pc__contact">{channel.contact}</span>
          <span className="pc__subtitle">{typing ? typingLabel : channel.subtitle}</span>
        </span>
      </div>

      <div className="pc__thread">
        {visible.map((message, i) => (
          <div
            key={i}
            className={`pc__row pc__row--${message.from === 'customer' ? 'out' : 'in'}`}
          >
            <p className="pc__bubble">
              {message.text}
              {message.from === 'customer' && (
                <svg viewBox="0 0 18 12" aria-hidden="true" className="pc__ticks">
                  <path
                    d="M1 6.6 4.2 10 10.6 2.4M7.6 9.2 8.8 10.4 15.6 2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </p>
          </div>
        ))}

        {typing && (
          <div className="pc__row pc__row--in">
            <p className="pc__bubble pc__bubble--typing" aria-label={typingLabel}>
              <i />
              <i />
              <i />
            </p>
          </div>
        )}
      </div>

      <div className="pc__composer">
        <span className="pc__input">
          {draft ? (
            <>
              {draft.slice(-COMPOSER_WINDOW)}
              <i className="pc__caret" />
            </>
          ) : (
            <span className="pc__placeholder">{channel.placeholder}</span>
          )}
        </span>
        <span className="pc__send" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M3 11.5 21 3l-8.5 18-2-7.5Z" fill="currentColor" />
          </svg>
        </span>
      </div>

      <span className="pc__home" aria-hidden="true" />
    </div>
  );
}

type Props = {
  className?: string;
  /** Threads to play, one per tab. Defaults to the hero's sales conversations. */
  channels?: Channel[];
  tablistLabel?: string;
  typingLabel?: string;
};

export default function PhoneChat({
  className,
  channels = CHANNELS,
  tablistLabel = 'Messenger',
  typingLabel = 'typing…',
}: Props) {
  const [active, setActive] = useState(0);
  const channel = channels[active];

  return (
    <div className={['pc', className].filter(Boolean).join(' ')}>
      <div className="pc__device">
        <span className="pc__btn pc__btn--silent" aria-hidden="true" />
        <span className="pc__btn pc__btn--up" aria-hidden="true" />
        <span className="pc__btn pc__btn--down" aria-hidden="true" />
        <span className="pc__btn pc__btn--power" aria-hidden="true" />
        <div className="pc__bezel">
          {/* Remounting on a tab change replays the thread from the top. */}
          <Screen key={channel.id} channel={channel} typingLabel={typingLabel} />
        </div>
      </div>

      <div className="pc__tabs" role="tablist" aria-label={tablistLabel}>
        {channels.map((c, i) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`pc__tab pc__tab--${c.theme ?? c.id} ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            <ChannelIcon id={c.id} size={18} />
            {c.tab}
          </button>
        ))}
      </div>
    </div>
  );
}
