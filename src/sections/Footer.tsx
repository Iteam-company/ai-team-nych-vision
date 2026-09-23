import { useTranslation } from "react-i18next";
import ImagePlaceholder from "../components/ImagePlaceholder";
import "./Footer.css";

/** Legal company details. Kept verbatim in every language. */
const COMPANY = {
  registryCode: "17602105",
  address:
    "Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50-201, 10152",
  email: "Nychvision@gmail.com",
};

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <ImagePlaceholder
          label="Nychvision logo"
          width={120}
          height={111}
          className="footer__logo"
        />

        <address className="footer__company t-body">
          <p className="footer__name">{t("footer.company")}</p>
          <dl className="footer__details">
            <div>
              <dt>{t("footer.registryCode")}</dt>
              <dd>{COMPANY.registryCode}</dd>
            </div>
            <div>
              <dt>{t("footer.address")}</dt>
              <dd>{COMPANY.address}</dd>
            </div>
            <div>
              <dt>{t("footer.email")}</dt>
              <dd>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </dd>
            </div>
          </dl>
        </address>
      </div>
    </footer>
  );
}
