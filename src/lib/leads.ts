import type { VisitorData } from './cookies';

export type Lead = {
  name: string;
  /** E.164, e.g. +37255512345 */
  phone: string;
  locale: string;
  submittedAt: string;
  /** Cookie data and context; null when the visitor declined cookies. */
  visitor: VisitorData | null;
};

/**
 * Sends a lead. Not wired to a backend yet: in development it logs the full
 * payload to the browser console so the collected data can be checked.
 */
export async function submitLead(lead: Lead) {
  // TODO: POST the lead to the CRM (e.g. via a Next.js route handler).
  if (process.env.NODE_ENV !== 'production') {
    console.info('[lead] not sent yet — payload:', lead);
  }
}
