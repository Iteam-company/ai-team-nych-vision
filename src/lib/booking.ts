import type { BookingProps } from '../components/Booking';
import type { Translator } from '../i18n/translator';

/** Translated props for the client-side booking form. */
export function getBookingProps(tr: Translator): Omit<BookingProps, 'id'> {
  return {
    locale: tr.locale,
    labels: {
      date: tr.t('booking.date'),
      time: tr.t('booking.time'),
      dateAndTime: tr.t('booking.dateAndTime'),
      details: tr.t('booking.details'),
      detailsHint: tr.t('booking.detailsHint'),
      name: tr.t('booking.name'),
      email: tr.t('booking.email'),
      phone: tr.t('booking.phone'),
      note: tr.t('booking.note'),
      submit: tr.t('booking.submit'),
      sending: tr.t('booking.sending'),
      success: tr.t('booking.success'),
      slotTaken: tr.t('booking.slotTaken'),
      failed: tr.t('booking.failed'),
      fieldRequired: tr.t('booking.fieldRequired'),
      emailInvalid: tr.t('booking.emailInvalid'),
    },
  };
}
