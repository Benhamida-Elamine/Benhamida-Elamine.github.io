import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { profile } from "../data/profile.ts";
import { useActiveSection } from "../hooks/useActiveSection.ts";
import { ExternalLink } from "./ExternalLink.tsx";
import styles from "./Nav.module.css";

export const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const Nav = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const active = useActiveSection(
    SECTIONS.map((section) => section.id),
    isHome,
  );
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  // The menu closes by itself when the route changes.
  const open = openPath === pathname;
  const pillRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0, visible: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slide the glass indicator under the active section link.
  useLayoutEffect(() => {
    const link = pillRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    setIndicator((current) =>
      link ? { x: link.offsetLeft, width: link.offsetWidth, visible: true } : { ...current, visible: false },
    );
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpenPath(null);

  return (
    <>
      <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
        <div className={`container ${styles.row}`}>
          <Link to="/" className={styles.brand} aria-label={`${profile.name}, home`} onClick={close}>
            <strong>{profile.name}</strong>
            <span>{profile.role}</span>
          </Link>

          <nav ref={pillRef} className={styles.pill} aria-label="Main">
            <span
              className={styles.indicator}
              style={{ transform: `translateX(${indicator.x}px)`, width: indicator.width, opacity: indicator.visible ? 1 : 0 }}
            />
            {SECTIONS.map((section) => (
              <Link
                key={section.id}
                data-id={section.id}
                to={{ pathname: "/", hash: `#${section.id}` }}
                className={styles.pillLink}
                aria-current={active === section.id ? "true" : undefined}
              >
                {section.label}
              </Link>
            ))}
          </nav>

          <div className={styles.social}>
            <ExternalLink className={styles.socialLink} href={profile.links.github}>
              GitHub
            </ExternalLink>
            <ExternalLink className={styles.socialLink} href={profile.links.linkedin}>
              LinkedIn
            </ExternalLink>
          </div>

          <button
            type="button"
            className={`${styles.menuButton} ${open ? styles.open : ""}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className={styles.burger} aria-hidden="true" />
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`} inert={!open}>
        <nav className={styles.overlayLinks} aria-label="Mobile">
          {SECTIONS.map((section, index) => (
            <Link
              key={section.id}
              to={{ pathname: "/", hash: `#${section.id}` }}
              className={styles.overlayLink}
              style={{ transitionDelay: open ? `${80 + index * 60}ms` : "0ms" }}
              onClick={close}
            >
              {section.label}
            </Link>
          ))}
        </nav>
        <div className={styles.overlayFooter}>
          <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
          <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>
    </>
  );
};
