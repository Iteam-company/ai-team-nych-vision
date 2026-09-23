import type { LeadFormProps } from '../components/LeadForm';
import type { Translator } from '../i18n/translator';

/** Translated props for the client-side lead form. */
export function getLeadFormProps(tr: Translator): Omit<LeadFormProps, 'id'> {
  return {
    locale: tr.locale,
    labels: {
      namePlaceholder: tr.t('form.namePlaceholder'),
      phoneLabel: tr.t('form.phoneLabel'),
      phoneInvalid: tr.t('form.phoneInvalid'),
      submit: tr.t('form.submit'),
      success: tr.t('form.success'),
    },
  };
}
