"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  ChatShot,
  ClientEmblem,
  CrmBoard,
  PhoneShot,
  type Line,
} from "../components/Mockups";
import WaveOrb from "../effects/WaveOrb";

export type CaseItem = {
  /** Matches a key in LAYOUTS below; set per case in the locale files. */
  id: string;
  /** Plain-text title for the tab's accessible name. */
  label: string;
  title: ReactNode;
  metric: ReactNode;
  tasks: ReactNode[];
};

const AUTOPLAY_MS = 15000;

/*
 * Conversation mockups per case, positioned relative to the card as in the
 * source layout.
 *
 * These are reconstructions of the kind of exchange each agent handles, not
 * captures of a real customer's inbox — names and figures inside them are
 * illustrative. The outcome numbers beside them come from the case text.
 *
 * Where a case has a phone, it is listed first: below 1200px only the first
 * mockup is shown, and a phone survives that crop better than a cropped card.
 */
type Media =
  | {
      kind: "phone";
      app: "telegram" | "whatsapp";
      contact: string;
      lines: Line[];
      w: number;
      h: number;
      x: number;
      y: number;
    }
  | { kind: "chat"; lines: Line[]; w: number; h: number; x: number; y: number }
  | { kind: "board"; w: number; h: number; x: number; y: number }
  | {
      kind: "emblem";
      text: string;
      w: number;
      h: number;
      x: number;
      y: number;
    };

const c = (text: string): Line => ({ from: "customer", text });
const a = (text: string): Line => ({ from: "agent", text });

/**
 * `titleSize` shrinks the title for cases whose mockups start close to the text
 * (x ≈ 572): at the default 39px their titles would run into the images.
 */
type CaseLayout = {
  height: number;
  media: Media[];
  orb?: boolean;
  titleSize?: "md" | "sm";
  /** "list": the metric is several "— …" lines, set in the smaller body size. */
  metricStyle?: "list";
};

/**
 * Mockups per case, keyed by the case `id` in the locale files. A case shows
 * up on the page when its text is in `cases.items`; the layouts of cases that
 * are currently off stay here so they can be switched back on.
 */
const LAYOUTS: Record<string, CaseLayout> = {
  // AI content production studio
  "ai-content-studio": {
    height: 403,
    metricStyle: "list",
    media: [
      {
        kind: "phone",
        app: "telegram",
        contact: "AI Content Studio",
        w: 276,
        h: 538,
        x: 690,
        y: -15,
        lines: [
          c("Hi! Do you make AI video ads?"),
          a(
            "Hi! Yes — ads, product visuals and UGC-style clips. What are you promoting?",
          ),
          c("A skincare brand, launching in March"),
          c("Need content for TikTok and Reels"),
          a(
            "Nice. Roughly how many videos a month, and what budget do you have in mind?",
          ),
          c("About 20 videos, around €3k"),
          a(
            "That fits our Growth plan: 20 videos, 5-day delivery. Sending 3 skincare examples.",
          ),
          c("Love them. Can we talk this week?"),
          a(
            "Thursday 14:00 with Anna, our producer? Your brief is already in HubSpot.",
          ),
        ],
      },
    ],
  },

  // Developer and real estate agency in the UAE
  "uae-real-estate": {
    height: 503,
    metricStyle: "list",
    media: [
      {
        kind: "phone",
        app: "telegram",
        contact: "Marina Residences",
        w: 276,
        h: 568,
        x: 690,
        y: -65,
        lines: [
          c("Hello, I saw your tower on Instagram"),
          a("Hello! Marina or Downtown?"),
          c("Marina"),
          c("What is left there?"),
          a(
            "Two units — 96 m² and 104 m², handover Q3 2027. Is this to live in or to let?",
          ),
          c("To let"),
          a(
            "Then the 96 m²: 880k on a 40/60 plan, better yield. Viewing Thursday 15:00?",
          ),
          c("That works"),
          a(
            "Booked with Amir. Your card in Bitrix24 is updated and you will get a reminder.",
          ),
        ],
      },
    ],
  },

  // Permanent makeup studio in Spain
  "pmu-studio-spain": {
    height: 503,
    titleSize: "md",
    media: [
      {
        kind: "phone",
        app: "whatsapp",
        contact: "Lumière Studio",
        w: 244,
        h: 522,
        x: 748,
        y: -40,
        lines: [
          c("Hi, are you taking new clients?"),
          a("Hello! Yes we are. Brows or lips?"),
          c("Brows"),
          c("How much are powder brows?"),
          a(
            "€280, and the six-week touch-up is included. First visit takes about 2.5 hours.",
          ),
          c("Do you have anything this weekend?"),
          a("Saturday 11:00 and 16:30 are free. Which suits you?"),
          c("11:00 please"),
          a("Held for two hours — deposit link sent. See you Saturday!"),
        ],
      },
      {
        kind: "chat",
        w: 172,
        h: 108,
        x: 572,
        y: 44,
        lines: [c("How much are powder brows?"), a("€280, touch-up included.")],
      },
      {
        kind: "chat",
        w: 172,
        h: 126,
        x: 572,
        y: 176,
        lines: [
          c("Anything this weekend?"),
          a("Saturday 11:00 or 16:30 — which one?"),
        ],
      },
      {
        kind: "chat",
        w: 172,
        h: 114,
        x: 572,
        y: 326,
        lines: [c("11:00"), a("Held. Deposit link sent, slot is yours.")],
      },
    ],
  },

  // // 3 — Inspection of apartments, houses and commercial real estate
  // "property-inspection": {
  //   height: 503,
  //   media: [
  //     {
  //       kind: "phone",
  //       app: "telegram",
  //       contact: "Inspection service",
  //       w: 244,
  //       h: 522,
  //       x: 572,
  //       y: -40,
  //       lines: [
  //         c("Hello, do you do pre-handover inspections?"),
  //         a("Hello! Flats, houses and commercial. Which is it?"),
  //         c("A flat in a new build"),
  //         c("How much for 70 m²?"),
  //         a(
  //           "For 70 m² it is a standard inspection — thermal imaging and a written report included.",
  //         ),
  //         c("How long does it take?"),
  //         a(
  //           "About three hours on site, report the next day. Nearest free slot is Wednesday 10:00.",
  //         ),
  //         c("Book it"),
  //         a("Booked in Yclients. I will remind you the evening before."),
  //       ],
  //     },
  //     {
  //       kind: "chat",
  //       w: 168,
  //       h: 430,
  //       x: 826,
  //       y: 46,
  //       lines: [
  //         c("Do you inspect commercial too?"),
  //         a("Yes — offices, retail and warehouses."),
  //         c("600 m² warehouse"),
  //         a("Two specialists, half a day."),
  //         c("Friday?"),
  //         a("Friday 09:00 is free. Holding it for you."),
  //       ],
  //     },
  //   ],
  // },

  // Cosmetology clinic in Israel
  "cosmetology-israel": {
    height: 531,
    titleSize: "md",
    media: [
      {
        kind: "chat",
        w: 204,
        h: 140,
        x: 786,
        y: 32,
        lines: [
          c("I would like to book a consultation"),
          a("Of course. First time with us?"),
        ],
      },
      {
        kind: "chat",
        w: 204,
        h: 140,
        x: 572,
        y: 96,
        lines: [
          a("Dr. Levi has Tuesday 14:00 or Thursday 17:30."),
          c("Thursday"),
        ],
      },
      {
        kind: "chat",
        w: 204,
        h: 140,
        x: 786,
        y: 204,
        lines: [
          a("Six months since your last treatment — shall I find a slot?"),
          c("Yes, evening"),
        ],
      },
      {
        kind: "chat",
        w: 204,
        h: 148,
        x: 572,
        y: 268,
        lines: [
          c("Can we move tomorrow to Friday?"),
          a("Moved to Friday 17:30. Calendar updated."),
        ],
      },
    ],
  },

  // Travel company in the UAE
  "travel-uae": {
    height: 525,
    titleSize: "md",
    media: [
      {
        kind: "phone",
        app: "whatsapp",
        contact: "Travel desk",
        w: 220,
        h: 470,
        x: 572,
        y: -24,
        lines: [
          c("Hi, do you do family trips?"),
          a("Hello! We do. Where were you thinking?"),
          c("Looking for something for the school holidays"),
          a("Happy to help. Which dates, and who is travelling?"),
          c("Two adults, two kids, late March, around 4k"),
          a(
            "That fits the Maldives half-board or a Sri Lanka tour. Shall I send both?",
          ),
          c("Both please"),
          a(
            "Sent. I have put a call with Dana in your calendar for tomorrow 11:00.",
          ),
        ],
      },
      {
        kind: "phone",
        app: "telegram",
        contact: "Travel desk",
        w: 198,
        h: 424,
        x: 794,
        y: 20,
        lines: [
          c("Hello!"),
          a("Hello! Travel desk — what can I help with?"),
          c("Is the Georgia tour still on for May?"),
          a("Yes, two rooms left on the 12th. Flying from Dubai?"),
          c("Yes"),
          a(
            "Then it is 1,840 for two with flights. Want me to hold it for 24 hours?",
          ),
          c("Hold it"),
          a('Held, and the deal is in Bitrix24 at "Offer sent".'),
        ],
      },
    ],
  },

  // RBmotors ATV manufacturing and sales
  rbmotors: {
    height: 525,
    media: [
      { kind: "board", w: 400, h: 250, x: 580, y: 40 },
      {
        kind: "chat",
        w: 330,
        h: 214,
        x: 572,
        y: 300,
        lines: [
          c("Difference between the 300 and the 400?"),
          a(
            "Engine and suspension travel. For dunes most people take the 400.",
          ),
          c("Can I try one?"),
          a("Test drives run Saturdays. 11:00 or 14:00?"),
        ],
      },
    ],
  },

  // REAKTIV ski apparel brand
  reaktiv: {
    height: 503,
    media: [
      {
        kind: "phone",
        app: "telegram",
        contact: "REAKTIV",
        w: 276,
        h: 568,
        x: 690,
        y: -65,
        lines: [
          c("Hi, is this the official store?"),
          a("Hello! REAKTIV official. What are you after?"),
          c("A ski jacket"),
          c("Is the shell warm enough for −20?"),
          a(
            "It is a shell, so it needs a mid-layer. With our fleece it is rated to −25.",
          ),
          c("I am 182 cm, 78 kg — which size?"),
          a("L. If you ski in a back protector, take XL."),
          c("Any discount?"),
          a("The set is 15% off until Sunday. Shall I send the link?"),
        ],
      },
    ],
  },
};

function Shot({ media }: { media: Media }) {
  const geometry = {
    width: media.w,
    height: media.h,
    className: "case__shot",
    style: { left: media.x, top: media.y },
  };

  if (media.kind === "phone") {
    return (
      <PhoneShot
        {...geometry}
        className="case__shot case__shot--phone"
        app={media.app}
        contact={media.contact}
        lines={media.lines}
      />
    );
  }
  if (media.kind === "chat")
    return <ChatShot {...geometry} lines={media.lines} />;
  if (media.kind === "board") return <CrmBoard {...geometry} />;
  return <ClientEmblem {...geometry}>{media.text}</ClientEmblem>;
}

type Props = { items: CaseItem[]; tasksLabel: string };

/**
 * Tabbed case studies. Every case is in the server-rendered HTML;
 * only the tab switching and autoplay run in the browser.
 */
export default function CaseSlider({ items, tasksLabel }: Props) {
  const [active, setActive] = useState(0);
  // With a single case there is nothing to switch between: no tabs, no autoplay.
  const hasTabs = items.length > 1;

  // Advance automatically; picking a tab restarts the timer.
  useEffect(() => {
    if (!hasTabs) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % items.length),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(id);
  }, [active, hasTabs, items.length]);

  return (
    <>
      {hasTabs && (
        <div className="cases__tabs" role="tablist">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={item.label}
              className={`cases__tab ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="cases__stage">
        {items.map((item, i) => {
          const layout = LAYOUTS[item.id];
          return (
            <article
              key={item.id}
              role={hasTabs ? "tabpanel" : undefined}
              aria-hidden={hasTabs ? i !== active : undefined}
              className={[
                "case",
                i === active && "is-active",
                layout?.titleSize && `case--title-${layout.titleSize}`,
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  minHeight: layout?.height,
                  // Left edge of the nearest mockup; CSS keeps the text clear of it.
                  "--media-left": layout?.media.length
                    ? `${Math.min(...layout.media.map((m) => m.x))}px`
                    : undefined,
                } as CSSProperties
              }
            >
              <div className="case__glow" />
              <div className="case__content">
                <h3 className="case__title">{item.title}</h3>
                <p
                  className={`case__metric ${layout?.metricStyle === "list" ? "t-body" : ""}`}
                >
                  {item.metric}
                </p>
                <p className="case__label t-body">
                  <strong>{tasksLabel}</strong>
                </p>
                <ul className="case__tasks">
                  {item.tasks.map((task, j) => (
                    <li key={j} className="case__task t-body">
                      <span className="case__toggle" aria-hidden="true" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {layout && (
                <div
                  className={
                    // Chat-only cases stack every exchange on small screens
                    // instead of stretching the first one (see Cases.css).
                    layout.media.every((m) => m.kind === "chat")
                      ? "case__media case__media--chats"
                      : "case__media"
                  }
                >
                  {layout.orb && <WaveOrb className="case__orb" />}
                  {layout.media.map((m, j) => (
                    <Shot key={j} media={m} />
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
