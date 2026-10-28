import type { ReactNode } from "react";
import styles from "./WindowFrame.module.css";

type Props = {
  title?: string;
  status?: string;
  size?: "large" | "small";
  className?: string;
  children: ReactNode;
};

/** Application window chrome shared by the hero, the project previews and the showreel. */
export const WindowFrame = ({ title, status, size = "large", className = "", children }: Props) => (
  <div className={`${styles.frame} ${size === "small" ? styles.small : ""} ${className}`}>
    <div className={styles.inner}>
      <div className={styles.bar} aria-hidden="true">
        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
        {title && <div className={styles.title}>{title}</div>}
        {status && <div className={styles.status}>{status}</div>}
      </div>
      {children}
    </div>
  </div>
);
