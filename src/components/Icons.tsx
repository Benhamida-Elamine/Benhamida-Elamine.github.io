type IconProps = { className?: string };

export const ArrowUpRight = ({ className }: IconProps) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3.5 10.5 10.5 3.5M4.5 3.5h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowRight = ({ className }: IconProps) => (
  <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path d="M3 11h16M13 5l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowDown = ({ className }: IconProps) => (
  <svg className={className} width="22" height="28" viewBox="0 0 22 28" fill="none" aria-hidden="true">
    <path d="M11 2v23M4 18l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeft = ({ className }: IconProps) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13 8H3M7 4 3 8l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Play = ({ className }: IconProps) => (
  <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
    <path d="M6 3.8v14.4a.8.8 0 0 0 1.2.7l12-7.2a.8.8 0 0 0 0-1.4l-12-7.2A.8.8 0 0 0 6 3.8Z" />
  </svg>
);
