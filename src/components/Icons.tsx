import type { SVGProps } from "react";

const base = (props: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const IconBag = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M5.5 8h13l-1.1 12.5h-10.8L5.5 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);

export const IconMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M3 9h18" />
    <path d="M3 15h18" />
  </svg>
);

export const IconClose = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M5 5l14 14" />
    <path d="M19 5L5 19" />
  </svg>
);

export const IconPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const IconMinus = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M5 12h14" />
  </svg>
);

export const IconArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M3 12h17" />
    <path d="M14 6l6 6-6 6" />
  </svg>
);

export const IconArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M12 4v15" />
    <path d="M6 13l6 6 6-6" />
  </svg>
);

export const IconCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M4.5 12.5l5 5L19.5 7" />
  </svg>
);

export const IconWhatsApp = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5Z" />
    <path d="M8.6 8.1c-.4.5-.5 3 .9 5.1 1.4 2.1 3.9 3.4 4.8 3.4 1 0 2-1 2-1.5l-2.2-1.1-.9.7c-1.2-.5-2-1.4-2.5-2.6l.8-.9-1.2-2.2-1.7.1Z" />
  </svg>
);

export const IconInstagram = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="0.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconPin = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.3" />
  </svg>
);

export const IconClock = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconScissors = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <circle cx="6" cy="6.5" r="2.5" />
    <circle cx="6" cy="17.5" r="2.5" />
    <path d="M8.2 8.2 20 19" />
    <path d="M8.2 15.8 20 5" />
  </svg>
);
