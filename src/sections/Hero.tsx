import AnimatedLine from "../components/AnimatedLine";
import BrandLogo from "../components/BrandLogo";
import Button from "../components/Button";
import LanguageSwitcher from "../components/LanguageSwitcher";
import PhoneChat, { type Channel } from "../components/PhoneChat";
import TechCanvas from "../effects/TechCanvas";
import type { Translator } from "../i18n/translator";
import "./Hero.css";

const CTA_FRAME =
  "M1 21C1 9.954 9.954 1 21 1H646C657.046 1 666 9.954 666 21V120C666 131.046 657.046 140 646 140H21C9.954 140 1 131.046 1 120Z";

const DEFAULT_TELEGRAM_USER = "+380673686408";
const TELEGRAM_USER =
  process.env.TELEGRAM_USER?.trim().replace(/^@/, "") || DEFAULT_TELEGRAM_USER;
const TELEGRAM_URL = `https://t.me/${TELEGRAM_USER}`;

export default function Hero({ tr }: { tr: Translator }) {
  const stats = tr.raw<string[]>("hero.stats");
  const placeholder = tr.t("hero.chat.placeholder");
  const subtitle = tr.t("hero.chat.subtitle");
  // One tab per agent: the owner gives a task, the agent reports back.
  const channels: Channel[] = tr
    .raw<Omit<Channel, "placeholder" | "subtitle">[]>("hero.chat.threads")
    .map((thread) => ({ ...thread, placeholder, subtitle, theme: "agent", startAt: 2 }));

  return (
    <section className="hero">
      <div className="container">
        <TechCanvas className="hero__canvas" />

        <header className="hero__top">
          <BrandLogo className="hero__logo" />
          <LanguageSwitcher
            locale={tr.locale}
            label={tr.t("common.language")}
            className="hero__lang"
          />
        </header>

        <h1 className="hero__title">{tr.rich("hero.title")}</h1>
        <p className="hero__subtitle">{tr.t("hero.subtitle")}</p>

        <ul className="hero__stats timeline">
          {stats.map((_, i) => (
            <li key={i} className="hero__stat timeline__item t-body">
              {tr.rich(`hero.stats.${i}`)}
            </li>
          ))}
        </ul>

        <div className="hero__cta">
          <AnimatedLine
            className="hero__cta-frame"
            d={CTA_FRAME}
            viewBox="0 0 667 141"
            width={667}
            height={141}
          />
          <Button width={324} className="hero__cta-btn" href={TELEGRAM_URL}>
            {tr.t("hero.cta")}
          </Button>
          <p className="hero__cta-note t-lead">{tr.rich("hero.ctaNote")}</p>
        </div>

        <PhoneChat
          className="hero__phone"
          channels={channels}
          tablistLabel={tr.t("hero.chat.tablist")}
          typingLabel={tr.t("control.typing")}
        />
      </div>
    </section>
  );
}
