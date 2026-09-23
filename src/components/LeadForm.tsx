import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput, { isValidPhoneNumber, type Country } from 'react-phone-number-input';
import enLabels from 'react-phone-number-input/locale/en.json';
import ruLabels from 'react-phone-number-input/locale/ru.json';
import 'react-phone-number-input/style.css';
import './LeadForm.css';

const COUNTRY_LABELS = { en: enLabels, ru: ruLabels };

/** Company is based in Estonia. */
const DEFAULT_COUNTRY: Country = 'EE';

/** Name + phone lead form. Submission is local only until a backend is wired up. */
export default function LeadForm() {
  const { t, i18n } = useTranslation();
  const [phone, setPhone] = useState<string | undefined>();
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const labels = COUNTRY_LABELS[i18n.resolvedLanguage as keyof typeof COUNTRY_LABELS] ?? enLabels;

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
    return <p className="lead-form__success">{t('form.success')}</p>;
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <input
        className="lead-form__input"
        type="text"
        name="name"
        autoComplete="name"
        placeholder={t('form.namePlaceholder')}
        aria-label={t('form.namePlaceholder')}
      />
      <label className="lead-form__label" htmlFor="lead-phone">
        {t('form.phoneLabel')}
      </label>
      <PhoneInput
        id="lead-phone"
        name="phone"
        className={`lead-form__phone ${error ? 'is-invalid' : ''}`}
        international
        countryCallingCodeEditable={false}
        defaultCountry={DEFAULT_COUNTRY}
        labels={labels}
        value={phone}
        onChange={(value) => {
          setPhone(value);
          setError(false);
        }}
        aria-invalid={error}
      />
      {error && (
        <p className="lead-form__error" role="alert">
          {t('form.phoneInvalid')}
        </p>
      )}
      <button className="lead-form__submit" type="submit">
        {t('form.submit')}
      </button>
    </form>
  );
}
