import { useEffect } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile.ts";
import styles from "./NotFound.module.css";

export const NotFound = () => {
  useEffect(() => {
    document.title = `Page not found — ${profile.name}`;
  }, []);

  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <div className="container">
        <p className={styles.prompt}>
          <span>PS /Users/amine&gt;</span> cd {window.location.pathname}
        </p>
        <p className={styles.error}>Set-Location: Cannot find path because it does not exist.</p>
        <h1 id="not-found-title" className={styles.title}>
          This page doesn&apos;t <em className="serif">exist.</em>
        </h1>
        <Link to="/" className={styles.home}>
          Back to the homepage
        </Link>
      </div>
    </section>
  );
};
