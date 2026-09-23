import ImagePlaceholder from '../components/ImagePlaceholder';
import type { Translator } from '../i18n/translator';
import './Features.css';

export default function Features({ tr }: { tr: Translator }) {
  return (
    <section className="features">
      <div className="container features__grid">
        <div className="features__col">
          <h2 className="h-sub is-accent">{tr.t('features.agentTitle')}</h2>
          <p className="features__text t-lead">{tr.t('features.agentText')}</p>
          <div className="features__card features__card--chats spotlight">
            {[1, 2, 3].map((n) => (
              <ImagePlaceholder key={n} label={`Chat notification ${n}`} width={375} height={73} />
            ))}
          </div>
        </div>

        <div className="features__col">
          <h2 className="h-sub is-accent">{tr.t('features.integrationsTitle')}</h2>
          <p className="features__text t-lead">{tr.t('features.integrationsText')}</p>
          <div className="features__card features__card--integrations spotlight">
            <ImagePlaceholder label="Integration logos" width={275} height={263} />
            <div className="features__more-col">
              <ImagePlaceholder label="Integration logos" width={275} height={137} />
              <p className="features__more t-lead">{tr.rich('features.integrationsMore')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
