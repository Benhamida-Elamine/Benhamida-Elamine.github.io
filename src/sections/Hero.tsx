import { ArrowDown, ArrowRight } from "../components/Icons.tsx";
import { WindowFrame } from "../components/WindowFrame.tsx";
import { profile } from "../data/profile.ts";
import { useReducedMotion } from "../hooks/useReducedMotion.ts";
import { useTypewriter } from "../hooks/useTypewriter.ts";
import { asset } from "../lib/asset.ts";
import styles from "./Hero.module.css";

export const Hero = () => {
  const reducedMotion = useReducedMotion();
  const command = useTypewriter("whoami", { delay: 900, speed: 95, enabled: !reducedMotion });

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <WindowFrame title="amine — pwsh — 120×32" className={styles.window}>
          <div className={styles.content}>
            <div className={styles.copy}>
              <p className={styles.prompt} aria-hidden="true">
                <span className={styles.ps}>PS /Users/amine&gt;</span> <span>{command.visible}</span>
                {!command.done && <span className={styles.cursor} />}
              </p>
              <p className={`${styles.output} ${command.done ? styles.outputIn : ""}`} aria-hidden="true">
                {profile.name.toLowerCase().replace(" ", "_")} <span>· {profile.role.toLowerCase()}</span>
                {command.done && <span className={styles.cursor} />}
              </p>

              <h1 id="hero-title" className={styles.title}>
                <span className="visually-hidden">
                  {profile.name}, {profile.role}.{" "}
                </span>
                <span className={styles.line}>
                  <span style={{ animationDelay: "350ms" }}>I build pipelines</span>
                </span>
                <span className={styles.line}>
                  <span style={{ animationDelay: "450ms" }}>that turn raw data</span>
                </span>
                <span className={styles.line}>
                  <span style={{ animationDelay: "550ms" }}>into something</span>
                </span>
                <span className={styles.line}>
                  <span style={{ animationDelay: "650ms" }}>
                    <em className={`serif ${styles.accent}`}>meaningful.</em>
                  </span>
                </span>
              </h1>

              <div className={styles.foot}>
                <p className={styles.intro}>
                  {profile.role} based in {profile.location}.
                  <span> Snowflake, SQL and Python. Previously at Symbio and Sonatrach.</span>
                </p>
                <div className={styles.actions}>
                  <a href="#work" className={styles.primary}>
                    View projects <ArrowRight />
                  </a>
                  <a href="#contact" className={styles.secondary}>
                    Get in touch
                  </a>
                </div>
              </div>
            </div>

            <figure className={styles.portrait}>
              <img
                src={asset("assets/images/amine-portrait.jpg")}
                srcSet={`${asset("assets/images/amine-portrait.jpg")} 720w, ${asset("assets/images/amine-portrait-896.jpg")} 896w`}
                sizes="(max-width: 860px) 90vw, 380px"
                width={720}
                height={960}
                alt="Portrait of Amine Benhamida in a black turtleneck, a band of warm light across his eyes."
                fetchPriority="high"
              />
              <span className={styles.band} aria-hidden="true" />
            </figure>
          </div>
        </WindowFrame>

        <a href="#work" className={styles.scroll} aria-label="Scroll to selected work">
          <ArrowDown />
        </a>
      </div>
    </section>
  );
};
