import type { CSSProperties } from "react";
import { asset } from "../lib/asset.ts";
import styles from "./About.module.css";

export const About = () => (
  <section id="about" className={styles.about} aria-labelledby="about-title">
    {/* Letterboxed crop on the band of light across the eyes. */}
    <figure className={styles.band} data-reveal>
      <img
        src={asset("assets/images/amine-portrait-896.jpg")}
        width={896}
        height={1195}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </figure>

    <div className={`container ${styles.grid}`}>
      <header data-reveal>
        <p className="eyebrow">04 · About</p>
        <h2 id="about-title" className="section-title">
          Separating signal <br className={styles.br} />
          from <em className="serif">noise.</em>
        </h2>
      </header>

      <div className={styles.text} data-reveal style={{ "--delay": "120ms" } as CSSProperties}>
        <p className={styles.lead}>
          I&apos;m Amine, a data engineer. For me, data engineering is more than moving information: it&apos;s about
          building reliable pipelines, transforming complex data and making it useful.
        </p>
        <p>
          My path went through applied mathematics, operations research and a Master&apos;s in image and data science.
          It left me with a taste for problems where the signal has to be pulled out of the noise: a Kalman filter on
          sensor readings, optical flow on MRI frames, or de-duplication rules in a warehouse.
        </p>
        <p>
          I like structure and I like to understand what I ship: clear models, repeatable loads, monitoring that says
          when something goes wrong. Lately I have also been using code to tell stories, as in the showreel above.
        </p>
      </div>
    </div>
  </section>
);
