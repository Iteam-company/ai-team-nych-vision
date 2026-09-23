import { Trans } from 'react-i18next';

/** Tags that translations may use for inline formatting. */
const components = {
  accent: <span className="accent" />,
  b: <strong />,
  m: <span style={{ fontWeight: 500 }} />,
  br: <br />,
};

type Props = { k: string };

/** Renders a translation string that contains inline markup tags. */
export default function RichText({ k }: Props) {
  return <Trans i18nKey={k} components={components} />;
}
