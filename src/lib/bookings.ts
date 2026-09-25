import type { VisitorData } from './cookies';

/** Fixed daily slots. Kept here so both the picker and the mock share one list. */
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
};

export type BookingResult = { ok: true } | { ok: false; conflict: boolean };

const NETWORK_DELAY_MS = 500;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Deterministic per date, so a given day always looks the same across a
 * reload instead of jumping around — a real endpoint would return whichever
 * slots are actually booked.
 */
function mockTakenSlots(date: string): string[] {
  let hash = 0;
  for (const char of date) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  const count = 1 + (hash % 2);
  const taken = new Set<string>();
  for (let i = 0; i < count; i++) taken.add(TIME_SLOTS[(hash >> (i * 3)) % TIME_SLOTS.length]);
  return [...taken];
}

/**
 * Which slots are already booked for a date. Not wired to a backend yet —
 * TODO: replace with `GET /api/bookings/availability?date=...`.
 */
export async function fetchBookedTimes(date: string): Promise<string[]> {
  await delay(NETWORK_DELAY_MS - 200);
  return mockTakenSlots(date);
}

/**
 * Sends a booking. Not wired to a backend yet — TODO: replace with
 * `POST /api/bookings`. In development it logs the full payload to the
 * console so the collected data can be checked, and occasionally reports a
 * conflict (as if someone else just took the slot) to exercise that path.
 */
export async function submitBooking(booking: Booking): Promise<BookingResult> {
  await delay(NETWORK_DELAY_MS);
  if (process.env.NODE_ENV !== 'production') {
    console.info('[booking] not sent yet — payload:', booking);
  }
  if (mockTakenSlots(booking.date).includes(booking.time)) {
    return { ok: false, conflict: true };
  }
  return { ok: true };
}
