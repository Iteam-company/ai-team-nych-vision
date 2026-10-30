import { ChatAppIcon, DashboardIcon, SparkIcon } from '../components/LineIcons';
import PhoneChat, { type Channel } from '../components/PhoneChat';
import Tilt from '../effects/Tilt';
import type { Translator } from '../i18n/translator';
import './Control.css';

type Option = { id: 'chatgpt' | 'claude' | 'dashboard'; title: string; text: string };
type Thread = Omit<Channel, 'placeholder' | 'startAt'>;

const OPTION_ICONS = { chatgpt: ChatAppIcon, claude: SparkIcon, dashboard: DashboardIcon };

export default function Control({ tr }: { tr: Translator }) {
  const options = tr.raw<Option[]>('control.options');
  const placeholder = tr.t('control.placeholder');
  // The first exchange is already on screen, as in the hero phone.
  const channels: Channel[] = tr
    .raw<Thread[]>('control.threads')
    .map((thread) => ({ ...thread, placeholder, startAt: 2 }));

  return (
    <section className="control">
      <div className="container control__grid">
        <div className="control__info">
          <h2 className="control__title h-section">{tr.rich('control.title')}</h2>
          <p className="control__text t-lead">{tr.t('control.text')}</p>

          <ul className="control__options">
            {options.map((option) => {
              const Glyph = OPTION_ICONS[option.id];
              return (
                <li key={option.id} className={`control__option control__option--${option.id} spotlight`}>
                  <Tilt className="control__icon">
                    <Glyph width={26} height={26} />
                  </Tilt>
                  <div>
                    <h3 className="h-card">{option.title}</h3>
                    <p className="control__option-text t-body">{option.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="control__more t-body">{tr.t('control.more')}</p>
        </div>

        <PhoneChat
          className="control__phone"
          channels={channels}
          tablistLabel={tr.t('control.tablist')}
          typingLabel={tr.t('control.typing')}
        />
      </div>
    </section>
  );
}
