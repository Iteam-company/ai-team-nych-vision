import { NextResponse } from "next/server";
import { TIME_SLOTS } from "../../../lib/bookings";

/*
 * Receives a booking from the contact form / popup and forwards it to a
 * Telegram chat through a bot.
 *
 * Needs two environment variables (see .env.example):
 *   TELEGRAM_BOT_TOKEN — from @BotFather
 *   TELEGRAM_CHAT_ID   — the chat, group or channel the bot posts to
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITS = { name: 100, email: 200, phone: 40, note: 2000 } as const;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  note?: unknown;
  date?: unknown;
  time?: unknown;
  locale?: unknown;
  /** Honeypot: a hidden field people never fill in. */
  website?: unknown;
  visitor?: {
    page?: unknown;
    timeZone?: unknown;
    attribution?: Record<string, unknown>;
  } | null;
};

const str = (value: unknown, max = 300) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** Telegram's HTML mode only needs these three escaped. */
const esc = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function formatDate(iso: string, locale: string) {
  const date = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(locale === "ua" ? "uk-UA" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(date);
}

function buildMessage(b: {
  name: string;
  email: string;
  phone: string;
  note: string;
  date: string;
  time: string;
  locale: string;
  page: string;
  timeZone: string;
  source: string;
}) {
  const lines = [
    "📅 <b>New call booking</b>",
    "",
    `<b>When:</b> ${esc(formatDate(b.date, b.locale))}, ${esc(b.time)}${
      b.timeZone ? ` (visitor's time zone: ${esc(b.timeZone)})` : ""
    }`,
    `<b>Name:</b> ${esc(b.name)}`,
    `<b>Email:</b> ${esc(b.email)}`,
  ];
  if (b.phone) lines.push(`<b>Phone:</b> ${esc(b.phone)}`);
  if (b.note) lines.push("", `<b>Message:</b>\n${esc(b.note)}`);
  lines.push("", `<b>Site language:</b> ${b.locale === "ua" ? "UA" : "EN"}`);
  if (b.source) lines.push(`<b>Source:</b> ${esc(b.source)}`);
  if (b.page) lines.push(`<b>Page:</b> ${esc(b.page)}`);
  return lines.join("\n");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Bots fill every field; pretend it worked so they don't retry.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const booking = {
    name: str(body.name, LIMITS.name),
    email: str(body.email, LIMITS.email),
    phone: str(body.phone, LIMITS.phone),
    note: str(body.note, LIMITS.note),
    date: str(body.date, 10),
    time: str(body.time, 5),
    locale: str(body.locale, 5) || "en",
  };

  if (
    !booking.name ||
    !EMAIL_RE.test(booking.email) ||
    !DATE_RE.test(booking.date) ||
    !TIME_SLOTS.includes(booking.time)
  ) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("[booking] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const visitor = body.visitor && typeof body.visitor === "object" ? body.visitor : null;
  const attribution = visitor?.attribution ?? {};
  const utm = ["utm_source", "utm_medium", "utm_campaign"]
    .map((key) => str(attribution[key], 100))
    .filter(Boolean)
    .join(" / ");
  const source = utm || str(attribution.referrer, 200);

  const text = buildMessage({
    ...booking,
    page: str(visitor?.page, 300),
    timeZone: str(visitor?.timeZone, 60),
    source,
  });

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[booking] Telegram error", response.status, await response.text());
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("[booking] Telegram request failed", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
