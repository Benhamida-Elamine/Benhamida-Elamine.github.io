import { useState } from "react";
import { ExternalLink } from "../components/ExternalLink.tsx";
import { profile } from "../data/profile.ts";
import styles from "./Contact.module.css";

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <p className="eyebrow" data-reveal>
          05 · Contact
        </p>
        <h2 id="contact-title" className={styles.title} data-reveal>
          Let&apos;s build something <em className="serif">meaningful.</em>
        </h2>
        <p className={styles.text} data-reveal>
          Open to data engineering conversations. The quickest way to reach me is by email.
        </p>

        <div className={styles.actions} data-reveal>
          <a href={`mailto:${profile.email}`} className={styles.email}>
            {profile.email}
          </a>
          <button type="button" className={styles.copy} onClick={copy}>
            {copied ? "Copied" : "Copy email"}
          </button>
          <span className="visually-hidden" aria-live="polite">
            {copied ? "Email address copied to the clipboard" : ""}
          </span>
        </div>

        <div className={styles.links} data-reveal>
          <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
          <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
        </div>
      </div>
    </section>
  );
};
