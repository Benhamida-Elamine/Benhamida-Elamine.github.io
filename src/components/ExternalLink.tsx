import type { ReactNode } from "react";
import { ArrowUpRight } from "./Icons.tsx";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  /** Hide the arrow icon, e.g. when the link already has its own visual. */
  bare?: boolean;
};

/** Link to another site: opens in a new tab and says so to screen readers. */
export const ExternalLink = ({ href, className, children, bare = false }: Props) => (
  <a className={className} href={href} target="_blank" rel="noreferrer">
    {children}
    {!bare && <ArrowUpRight />}
    <span className="visually-hidden"> (opens in a new tab)</span>
  </a>
);
