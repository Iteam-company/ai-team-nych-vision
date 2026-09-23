'use client';

import { useState, type FormEvent } from 'react';
import PhoneInput, { isValidPhoneNumber, type Country } from 'react-phone-number-input';
import enLabels from 'react-phone-number-input/locale/en.json';
import etLabels from 'react-phone-number-input/locale/et.json';
import ruLabels from 'react-phone-number-input/locale/ru.json';
import uaLabels from 'react-phone-number-input/locale/ua.json';
import 'react-phone-number-input/style.css';
import './LeadForm.css';

/** Country names in the country picker, keyed by our locale codes. */
const COUNTRY_LABELS: Record<string, typeof enLabels> = {
  en: enLabels,
  ua: uaLabels,
  ru: ruLabels,
  et: etLabels,
};

/** Company is based in Estonia. */
const DEFAULT_COUNTRY: Country = 'EE';

export type LeadFormLabels = {
  namePlaceholder: string;
  phoneLabel: string;
  phoneInvalid: string;
  submit: string;
  success: string;
};

export type LeadFormProps = {
  locale: string;
  labels: LeadFormLabels;
  /** Must be unique on the page (the form appears in the contact block and the popup). */
  id: string;
};

/** Name + phone lead form. Submission is local only until a backend is wired up. */
export default function LeadForm({ locale, labels, id }: LeadFormProps) {
  const [phone, setPhone] = useState<string | undefined>();
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const phoneId = `${id}-phone`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phone || !isValidPhoneNumber(phone)) {
      setError(true);
      return;
    }
    // TODO: send the lead (name + E.164 phone) to the CRM endpoint.
    setSent(true);
  };

  if (sent) {
    return <p className="lead-form__success">{labels.success}</p>;
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <input
        className="lead-form__input"
        type="text"
        name="name"
        autoComplete="name"
        placeholder={labels.namePlaceholder}
        aria-label={labels.namePlaceholder}
      />
      <label className="lead-form__label" htmlFor={phoneId}>
        {labels.phoneLabel}
      </label>
      <PhoneInput
        id={phoneId}
        name="phone"
        className={`lead-form__phone ${error ? 'is-invalid' : ''}`}
        international
        countryCallingCodeEditable={false}
        defaultCountry={DEFAULT_COUNTRY}
        labels={COUNTRY_LABELS[locale] ?? enLabels}
        value={phone}
        onChange={(value) => {
          setPhone(value);
          setError(false);
        }}
        aria-invalid={error}
      />
      {error && (
        <p className="lead-form__error" role="alert">
          {labels.phoneInvalid}
        </p>
      )}
      <button className="lead-form__submit" type="submit">
        {labels.submit}
      </button>
    </form>
  );
}
