import type { VisitorData } from './cookies';

/** Fixed daily slots. Shared by the picker and the /api/bookings check. */
export const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

export type Booking = {
  name: string;
  email: string;
  /** Optional; not validated, unlike the phone in the lead form. */
  phone: string;
  note: string;
  /** ISO date, e.g. 2026-10-02 */
  date: string;
  /** One of TIME_SLOTS */
  time: string;
  locale: string;
  submittedAt: string;
  /** Cookie data and context; null when the visitor declined cookies. */
  visitor: VisitorData | null;
  /** Honeypot: hidden from people, so only bots fill it in. */
  website?: string;
};

export type BookingResult = { ok: true } | { ok: false; conflict: boolean };

/**
 * Which slots are already booked for a date. There is no shared calendar yet,
 * so every slot is offered; the team confirms the exact time by email.
 * TODO: return real availability once bookings are stored (e.g. Google Calendar).
 */
export async function fetchBookedTimes(_date: string): Promise<string[]> {
  return [];
}

/** Sends a booking to /api/bookings, which forwards it to Telegram. */
export async function submitBooking(booking: Booking): Promise<BookingResult> {
  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });
    if (response.ok) return { ok: true };
    return { ok: false, conflict: response.status === 409 };
  } catch {
    return { ok: false, conflict: false };
  }
}
