interface IconProps {
  className?: string;
  strokeWidth?: number;
}

const base = (className?: string) => className ?? "w-5 h-5";

export const IconDrop = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path
      d="M12 2.8C12 2.8 5.2 10.6 5.2 15.2a6.8 6.8 0 0 0 13.6 0C18.8 10.6 12 2.8 12 2.8Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path d="M9 15.5a3.1 3.1 0 0 0 2.4 3" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconDropSolid = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={base(className)} aria-hidden="true">
    <path d="M12 2.4C12 2.4 5 10.5 5 15.3a7 7 0 0 0 14 0C19 10.5 12 2.4 12 2.4Z" fill="currentColor" />
  </svg>
);

export const IconPulse = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path
      d="M2.5 12h4.2l2.1-4.6 3.4 9.2 2.4-4.6h6.9"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconClipboard = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <rect x="5" y="4.5" width="14" height="16.5" rx="1.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M9 4.5V3h6v1.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M8.5 10h7M8.5 13.5h7M8.5 17h4.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconBag = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path
      d="M8 5.5h8V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v1.5Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <rect x="6.5" y="5.5" width="11" height="14" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M6.5 11h11" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M12 13.5v3.5M10.2 15.2h3.6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconCup = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path d="M5.5 8h11v7a4.5 4.5 0 0 1-4.5 4.5h-2A4.5 4.5 0 0 1 5.5 15V8Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M16.5 9.5h1.6a2.2 2.2 0 0 1 0 4.4h-1.6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M8.5 4.5c0 .9.8.9.8 1.8M11.6 4.5c0 .9.8.9.8 1.8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconUsers = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M3.5 19.5c.6-3.4 2.7-5.3 5.5-5.3s4.9 1.9 5.5 5.3" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M15.5 5.2a3.2 3.2 0 0 1 0 5.6M17.8 14.6c1.5.8 2.5 2.5 2.8 4.9" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconPhone = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path
      d="M8.4 3.5 10 3.2c.5-.1 1 .2 1.2.7l1.2 2.9c.2.4.1.9-.3 1.2l-1.5 1.3c.9 1.9 2.4 3.4 4.3 4.3l1.3-1.5c.3-.4.8-.5 1.2-.3l2.9 1.2c.5.2.8.7.7 1.2l-.3 1.6c-.2 1-1.1 1.8-2.1 1.7C11.9 16.9 7.1 12.1 6.5 5.4c-.1-1 .9-1.9 1.9-1.9Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);

export const IconPin = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path
      d="M12 21.5s-6.5-5.9-6.5-10.7a6.5 6.5 0 0 1 13 0c0 4.8-6.5 10.7-6.5 10.7Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10.6" r="2.4" stroke="currentColor" strokeWidth={strokeWidth} />
  </svg>
);

export const IconCalendar = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <rect x="4" y="5.5" width="16" height="15" rx="1.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M8 14h3M8 17h6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconClock = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M12 7.5V12l3 2.2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconArrow = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path d="M4 12h15M13.5 5.5 20 12l-6.5 6.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCheck = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path d="m4.5 12.5 5 5 10-11" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconX = ({ className, strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconHeart = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path
      d="M12 20.5S4 15.3 4 9.6A4.4 4.4 0 0 1 8.4 5.2c1.6 0 3 .9 3.6 2.1.6-1.2 2-2.1 3.6-2.1A4.4 4.4 0 0 1 20 9.6c0 5.7-8 10.9-8 10.9Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);

export const IconShield = ({ className, strokeWidth = 1.7 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path
      d="M12 3 5 5.8v5.4c0 4.6 2.9 7.7 7 9.3 4.1-1.6 7-4.7 7-9.3V5.8L12 3Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path d="m8.8 11.8 2.3 2.3 4.3-4.6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconTrendUp = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path d="m6 14 6-6 6 6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconTrendDown = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path d="m6 10 6 6 6-6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconTrendFlat = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path d="M5 12h14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconMenu = ({ className, strokeWidth = 1.8 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconInsta = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
  </svg>
);

export const IconFacebook = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path
      d="M13.5 8.5H16V5h-2.5A3.5 3.5 0 0 0 10 8.5V11H7.5v3.4H10V21h3.5v-6.6h2.6l.5-3.4h-3.1V8.9c0-.3.2-.4.5-.4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconWhatsapp = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
    <path
      d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path
      d="M9 8.8c0 3.4 2.8 6.2 6.2 6.2l.8-1.7-2-1.2-.9.7a4.6 4.6 0 0 1-2.6-2.6l.7-.9-1.2-2L9 8.8Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);

/** ECG heartbeat line used as ambient hero element */
export const EcgLine = ({ className }: IconProps) => (
  <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className={className} aria-hidden="true">
    <path
      className="ecg-path"
      d="M0 60h180l30-18 30 36 24-18h156l30-42 36 84 24-42h160l30-18 30 36 24-18h156l30-42 36 84 24-42h160l30-18 30 36 24-18h156l30-42 36 84 24-42H1440"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const LogoMark = ({ className }: IconProps) => (
  <svg viewBox="0 0 40 40" fill="none" className={className ?? "w-9 h-9"} aria-hidden="true">
    <path d="M20 4C20 4 8 17.5 8 25a12 12 0 0 0 24 0C32 17.5 20 4 20 4Z" fill="var(--color-blood)" />
    <path
      d="M11.5 24.5h5l2.4-4.8 3.6 8.4 2.4-3.6h3.6"
      stroke="var(--color-bone)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
