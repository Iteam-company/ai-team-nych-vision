import type { SVGProps } from 'react';
import {
  AnalyticsIcon,
  CeoIcon,
  CustomIcon,
  EngineeringIcon,
  FinanceIcon,
  SalesIcon,
} from './LineIcons';

export type AgentId = 'ceo' | 'sales' | 'finance' | 'engineering' | 'analytics' | 'custom';

const ICONS = {
  ceo: CeoIcon,
  sales: SalesIcon,
  finance: FinanceIcon,
  engineering: EngineeringIcon,
  analytics: AnalyticsIcon,
  custom: CustomIcon,
} satisfies Record<AgentId, unknown>;

/** The line icon for one agent role. */
export default function AgentIcon({ id, ...rest }: { id: AgentId } & Omit<SVGProps<SVGSVGElement>, 'title'>) {
  const Glyph = ICONS[id];
  return <Glyph {...rest} />;
}
