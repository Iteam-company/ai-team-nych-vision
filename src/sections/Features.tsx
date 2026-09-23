import { useTranslation } from 'react-i18next';
import ImagePlaceholder from '../components/ImagePlaceholder';
import RichText from '../components/RichText';
import { trackSpotlight } from '../effects/spotlight';
import './Features.css';

export default function Features() {
  const { t } = useTranslation();

  return (
    <section className="features">
      <div className="container features__grid">
        <div className="features__col">
          <h2 className="h-sub is-accent">{t('features.agentTitle')}</h2>
          <p className="features__text t-lead">{t('features.agentText')}</p>
          <div className="features__card features__card--chats spotlight" onMouseMove={trackSpotlight}>
            {[1, 2, 3].map((n) => (
              <ImagePlaceholder key={n} label={`Chat notification ${n}`} width={375} height={73} />
            ))}
          </div>
        </div>

        <div className="features__col">
          <h2 className="h-sub is-accent">{t('features.integrationsTitle')}</h2>
          <p className="features__text t-lead">{t('features.integrationsText')}</p>
          <div
            className="features__card features__card--integrations spotlight"
            onMouseMove={trackSpotlight}
          >
            <ImagePlaceholder label="Integration logos" width={275} height={263} />
            <div className="features__more-col">
              <ImagePlaceholder label="Integration logos" width={275} height={137} />
              <p className="features__more t-lead">
                <RichText k="features.integrationsMore" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
