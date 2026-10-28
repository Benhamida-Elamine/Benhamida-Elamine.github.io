import { Link } from "react-router-dom";
import { profile } from "../data/profile.ts";
import { ExternalLink } from "./ExternalLink.tsx";
import styles from "./Footer.module.css";
import { SECTIONS } from "./Nav.tsx";

export const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div className={styles.columns}>
        <div>
          <p className={styles.heading}>Main</p>
          <ul>
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <Link to={{ pathname: "/", hash: `#${section.id}` }}>{section.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={styles.heading}>Contact</p>
          <ul>
            <li>
              <a href={`mailto:${profile.email}`}>Email</a>
            </li>
            <li>
              <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {profile.name}.
          </p>
          <p className={styles.note}>Designed and built in React and TypeScript. Motion inspired by my own showreel.</p>
        </div>
        <p className={styles.signature} aria-hidden="true">
          let&apos;s build something meaningful<span className={styles.cursor} />
        </p>
      </div>
    </div>
  </footer>
);
