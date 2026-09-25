import type { SVGProps } from 'react';

/*
 * Line icons drawn for this page. Stroked with currentColor on a viewBox that
 * matches the slot each one sits in, so they inherit colour from the card and
 * need no separate light/dark asset.
 */

type Props = SVGProps<SVGSVGElement> & { title: string };

function Icon({ title, children, ...rest }: Props) {
  return (
    <svg
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Leads leaking away while the clock runs. */
export function HourglassIcon(props: Omit<Props, 'title'>) {
  return (
    <Icon title="Hourglass" viewBox="0 0 33 38" {...props}>
      <path d="M4.5 3.5H28.5M4.5 34.5H28.5" />
      <path d="M7.5 3.5V9c0 5 9 7 9 10s-9 5-9 10v5.5" />
      <path d="M25.5 3.5V9c0 5-9 7-9 10s9 5 9 10v5.5" />
      <path d="M16.5 19c0 3-6.5 4.5-6.5 9h13c0-4.5-6.5-6-6.5-9Z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** Traffic spend going up. */
export function MoneyIcon(props: Omit<Props, 'title'>) {
  return (
    <Icon title="Money" viewBox="0 0 49 38" {...props}>
      <rect x="2" y="6" width="29" height="19.5" rx="3.5" />
      <circle cx="16.5" cy="15.8" r="4.6" />
      <path d="M6.5 10.5h2M24.5 21h2" />
      {/* Filled so the note behind it is occluded rather than crossed through */}
      <circle cx="33.5" cy="24" r="10" fill="var(--icon-fill, var(--color-surface))" />
      <path d="M33.5 18.5v11M30 21.5h7" />
    </Icon>
  );
}

/** Manual qualification eating the budget. */
export function PriceTagIcon(props: Omit<Props, 'title'>) {
  return (
    <Icon title="Price tag" viewBox="0 0 42 45" {...props}>
      <path d="M4 5.5A2 2 0 0 1 6 3.5h16.6a2 2 0 0 1 1.4.6l14.1 14.1a3 3 0 0 1 0 4.2L23.4 37.1a3 3 0 0 1-4.2 0L5.1 23a2 2 0 0 1-.6-1.4Z" />
      <circle cx="12.5" cy="12" r="3.2" />
    </Icon>
  );
}

/** Results riding on individual people. */
export function PersonIcon(props: Omit<Props, 'title'>) {
  return (
    <Icon title="Person" viewBox="0 0 41 52" {...props}>
      <circle cx="20.5" cy="13.5" r="9.5" />
      <path d="M3.5 49C3.5 38 11.1 31 20.5 31S37.5 38 37.5 49" />
    </Icon>
  );
}

/** Support and guarantee under contract. */
export function ContractIcon(props: Omit<Props, 'title'>) {
  return (
    <Icon title="Contract" viewBox="0 0 54 63" {...props}>
      <path d="M6 5a2 2 0 0 1 2-2h24l16 16v42a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" />
      <path d="M32 3v14a2 2 0 0 0 2 2h14" />
      <path d="M15 28h18M15 36h22" />
      <path d="M15 48c4-6 6 5 10 0s6 3 11-3" />
    </Icon>
  );
}

/** You can take the conversation over at any moment. */
export function ChatIcon(props: Omit<Props, 'title'>) {
  return (
    <Icon title="Chat" viewBox="0 0 69 47" {...props}>
      <path d="M31 12h29a7 7 0 0 1 7 7v12a7 7 0 0 1-7 7H45" />
      <rect x="2" y="2" width="42" height="29" rx="9" fill="var(--icon-fill, transparent)" />
      <path d="M14 31v9l10-9" fill="var(--icon-fill, transparent)" />
      <path d="M12 13h22M12 20h14" />
    </Icon>
  );
}

/** Lead arriving, used on the CRM mockups. */
export function BoltIcon(props: Omit<Props, 'title'>) {
  return (
    <Icon title="Lead" viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12Z" />
    </Icon>
  );
}

export function CalendarIcon(props: Omit<Props, 'title'>) {
  return (
    <Icon title="Calendar" viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Icon>
  );
}

export function ClockIcon(props: Omit<Props, 'title'>) {
  return (
    <Icon title="Time" viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Icon>
  );
}

/** Disclosure caret for the mobile accordion — points down, rotated open via CSS. */
export function ChevronIcon(props: Omit<Props, 'title'>) {
  return (
    <Icon title="Toggle" viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function CheckIcon(props: Omit<Props, 'title'>) {
  return (
    <Icon title="Done" viewBox="0 0 24 24" strokeWidth={2.4} {...props}>
      <path d="m5 12.5 5 5 9-11" />
    </Icon>
  );
}

export function CardIcon(props: Omit<Props, 'title'>) {
  return (
    <Icon title="Payment" viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="M2.5 10h19M6 15h4" />
    </Icon>
  );
}
