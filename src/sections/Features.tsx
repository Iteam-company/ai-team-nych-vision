import { ChatNotification, IntegrationGrid, IntegrationNames } from '../components/Mockups';
import type { Translator } from '../i18n/translator';
import './Features.css';

/**
 * The three notifications are the shortest way to show what the agent actually
 * does: one lead qualified, one booking taken, one payment collected — each in
 * a different channel, all while nobody was at the desk.
 */
const NOTIFICATIONS = [
  {
    app: 'telegram' as const,
    name: 'Marina Residences',
    text: 'Budget confirmed — viewing booked for Thursday 15:00',
    time: '02:14',
    unread: 2,
  },
  {
    app: 'whatsapp' as const,
    name: 'Lumière Studio',
    text: 'Saturday 11:00 held, deposit link sent',
    time: '03:47',
    unread: 1,
  },
  {
    app: 'instagram' as const,
    name: 'RB Motors',
    text: 'Test drive agreed, lead moved to "Meeting" in the CRM',
    time: '05:09',
    unread: 3,
  },
];

export default function Features({ tr }: { tr: Translator }) {
  return (
    <section className="features">
      <div className="container features__grid">
        <div className="features__col">
          <h2 className="h-sub is-accent">{tr.t('features.agentTitle')}</h2>
          <p className="features__text t-lead">{tr.t('features.agentText')}</p>
          <div className="features__card features__card--chats spotlight">
            {NOTIFICATIONS.map((n) => (
              <ChatNotification key={n.app} {...n} width={375} height={73} />
            ))}
          </div>
        </div>

        <div className="features__col">
          <h2 className="h-sub is-accent">{tr.t('features.integrationsTitle')}</h2>
          <p className="features__text t-lead">{tr.t('features.integrationsText')}</p>
          <div className="features__card features__card--integrations spotlight">
            <IntegrationGrid width={275} height={263} />
            <div className="features__more-col">
              <IntegrationNames width={275} height={137} />
              <p className="features__more t-lead">{tr.rich('features.integrationsMore')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
