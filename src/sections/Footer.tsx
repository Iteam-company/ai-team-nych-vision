import BrandLogo from '../components/BrandLogo';
import CookieSettingsButton from '../components/CookieSettingsButton';
import type { Translator } from '../i18n/translator';
import { COMPANY } from '../lib/company';
import './Footer.css';

export default function Footer({ tr }: { tr: Translator }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <BrandLogo size="footer" className="footer__logo" />

        <address className="footer__company t-body">
          <p className="footer__name">{tr.t('footer.company')}</p>
          <dl className="footer__details">
            <div>
              <dt>{tr.t('footer.registryCode')}</dt>
              <dd>{COMPANY.registryCode}</dd>
            </div>
            <div>
              <dt>{tr.t('footer.address')}</dt>
              <dd>{COMPANY.address}</dd>
            </div>
            <div>
              <dt>{tr.t('footer.email')}</dt>
              <dd>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </dd>
            </div>
          </dl>
          <CookieSettingsButton label={tr.t('cookies.settings')} className="footer__cookies" />
        </address>
      </div>
    </footer>
  );
}
