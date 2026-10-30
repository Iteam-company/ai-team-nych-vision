import AgentIcon, { type AgentId } from '../components/AgentIcon';
import Button from '../components/Button';
import { OwnerIcon } from '../components/LineIcons';
import Tilt from '../effects/Tilt';
import type { Translator } from '../i18n/translator';
import './Agents.css';

type Agent = {
  id: AgentId;
  name: string;
  role: string;
  text: string;
  does: string[];
  replaces: string;
  report: string;
};

/*
 * The org chart is drawn on a fixed 1160×330 grid. The SVG keeps that aspect
 * ratio and the HTML nodes are placed in percentages of the same grid, so the
 * lines always meet the nodes at any width.
 */
const W = 1160;
const H = 330;
const OWNER = { x: 580, y: 42 };
const CEO = { x: 580, y: 160 };
const ROW_Y = 286;
const BUS_Y = 228;
/** Agents under the CEO, left to right. */
const TEAM: AgentId[] = ['sales', 'finance', 'engineering', 'analytics', 'custom'];
const TEAM_X = [116, 348, 580, 812, 1044];

const pos = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

/** Path from the CEO node down to one agent node. */
const down = (x: number) => `M${CEO.x} ${CEO.y + 30}V${BUS_Y}H${x}V${ROW_Y - 30}`;
/** The same route back up — reports travel this way. */
const up = (x: number) => `M${x} ${ROW_Y - 30}V${BUS_Y}H${CEO.x}V${CEO.y + 30}`;

function OrgChart({ tr, agents }: { tr: Translator; agents: Agent[] }) {
  const byId = Object.fromEntries(agents.map((a) => [a.id, a])) as Record<AgentId, Agent>;
  const ownerPath = `M${OWNER.x} ${OWNER.y + 30}V${CEO.y - 30}`;

  return (
    <div className="org" aria-hidden="true">
      <svg className="org__lines" viewBox={`0 0 ${W} ${H}`}>
        <path className="org__line" d={ownerPath} />
        {TEAM_X.map((x) => (
          <path key={x} className="org__line" d={down(x)} />
        ))}

        {/* Tasks flow down from the CEO agent, reports come back up. */}
        <g className="org__pulses">
          <circle r="4" className="org__pulse org__pulse--task">
            <animateMotion dur="2.4s" repeatCount="indefinite" path={`M${OWNER.x} ${OWNER.y + 30}V${CEO.y - 30}`} />
          </circle>
          {TEAM_X.map((x, i) => (
            <g key={x}>
              <circle r="4" className="org__pulse org__pulse--task">
                <animateMotion dur="3.2s" begin={`-${(i * 0.55).toFixed(2)}s`} repeatCount="indefinite" path={down(x)} />
              </circle>
              <circle r="4" className="org__pulse org__pulse--report">
                <animateMotion dur="3.2s" begin={`-${(1.6 + i * 0.55).toFixed(2)}s`} repeatCount="indefinite" path={up(x)} />
              </circle>
            </g>
          ))}
        </g>
      </svg>

      <div className="org__node org__node--owner" style={pos(OWNER.x, OWNER.y)}>
        <span className="org__icon">
          <OwnerIcon width={26} height={26} />
        </span>
        <span className="org__text">
          <span className="org__name">{tr.t('agents.owner')}</span>
          <span className="org__note">{tr.t('agents.ownerNote')}</span>
        </span>
      </div>

      <a className="org__node org__node--ceo" href="#agent-ceo" style={pos(CEO.x, CEO.y)} tabIndex={-1}>
        <span className="org__icon">
          <AgentIcon id="ceo" width={28} height={28} />
        </span>
        <span className="org__text">
          <span className="org__name">{byId.ceo.name}</span>
          <span className="org__note">{byId.ceo.role}</span>
        </span>
      </a>

      {TEAM.map((id, i) => (
        <a key={id} className="org__node org__node--agent" href={`#agent-${id}`} style={pos(TEAM_X[i], ROW_Y)} tabIndex={-1}>
          <span className="org__icon">
            <AgentIcon id={id} width={24} height={24} />
          </span>
          <span className="org__name">{byId[id].name}</span>
        </a>
      ))}

      <p className="org__legend">
        <span className="org__legend-item org__legend-item--task">{tr.t('agents.legendTasks')}</span>
        <span className="org__legend-item org__legend-item--report">{tr.t('agents.legendReports')}</span>
      </p>
    </div>
  );
}

/** Phone version of the chart: the same hierarchy, stacked vertically. */
function OrgStack({ tr, agents }: { tr: Translator; agents: Agent[] }) {
  const ceo = agents.find((a) => a.id === 'ceo');
  return (
    <div className="org-stack" aria-hidden="true">
      <div className="org__node org__node--owner">
        <span className="org__icon">
          <OwnerIcon width={22} height={22} />
        </span>
        <span className="org__text">
          <span className="org__name">{tr.t('agents.owner')}</span>
          <span className="org__note">{tr.t('agents.ownerNote')}</span>
        </span>
      </div>
      <span className="org-stack__link" />
      <div className="org__node org__node--ceo">
        <span className="org__icon">
          <AgentIcon id="ceo" width={24} height={24} />
        </span>
        <span className="org__text">
          <span className="org__name">{ceo?.name}</span>
          <span className="org__note">{ceo?.role}</span>
        </span>
      </div>
      <span className="org-stack__link" />
      <div className="org-stack__team">
        {TEAM.map((id) => (
          <a key={id} className="org-stack__agent" href={`#agent-${id}`} tabIndex={-1}>
            <AgentIcon id={id} width={18} height={18} />
            {agents.find((a) => a.id === id)?.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Agents({ tr }: { tr: Translator }) {
  const agents = tr.raw<Agent[]>('agents.items');

  return (
    <section className="agents" id="agents">
      <div className="container">
        <h2 className="agents__title h-section">{tr.rich('agents.title')}</h2>
        <p className="agents__subtitle t-lead">{tr.t('agents.subtitle')}</p>

        <OrgChart tr={tr} agents={agents} />
        <OrgStack tr={tr} agents={agents} />

        <div className="agents__grid">
          {agents.map((agent) => (
            <article key={agent.id} id={`agent-${agent.id}`} className={`agent agent--${agent.id} spotlight`}>
              <header className="agent__head">
                <Tilt className="agent__icon">
                  <AgentIcon id={agent.id} width={30} height={30} />
                </Tilt>
                <div>
                  <h3 className="agent__name h-card">{agent.name}</h3>
                  <p className="agent__role">{agent.role}</p>
                </div>
              </header>

              <p className="agent__text t-body">{agent.text}</p>

              <p className="agent__label">{tr.t('agents.doesLabel')}</p>
              <ul className="agent__does t-body">
                {agent.does.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="agent__replaces t-body">
                <span className="agent__label">{tr.t('agents.replacesLabel')}:</span> {agent.replaces}
              </p>

              <div className="agent__report">
                <span className="agent__report-label">{tr.t('agents.reportLabel')}</span>
                <p className="agent__report-text">{agent.report}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="agents__honest t-body">{tr.t('agents.honest')}</p>

        <div className="agents__actions">
          <Button width={324}>{tr.t('hero.cta')}</Button>
          <Button width={265} variant="outline">
            {tr.t('cta.demo')}
          </Button>
        </div>
      </div>
    </section>
  );
}
