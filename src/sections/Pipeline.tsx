import type { CSSProperties } from "react";
import { useInView } from "../hooks/useInView.ts";
import styles from "./Pipeline.module.css";

// The four stages of the showreel's data-engineering scene, with the tools used at work.
const STAGES = [
  { name: "Ingest", tools: "Dynamics 365 · SFTP · flat files" },
  { name: "Transform", tools: "SQL · Python · Talend" },
  { name: "Validate", tools: "Deduplication · quality rules" },
  { name: "Deliver", tools: "Snowflake · Streamlit" },
];

export const Pipeline = () => {
  const [ref, inView] = useInView<HTMLElement>(0.4);
  return (
    <section ref={ref} className={`${styles.pipeline} ${inView ? styles.on : ""}`} aria-labelledby="pipeline-title">
      <div className="container">
        <h2 id="pipeline-title" className={styles.lead}>
          More than moving information: building reliable pipelines, transforming complex data and making it{" "}
          <em className="serif">useful.</em>
        </h2>
        <div className={styles.trackWrap}>
          <span className={styles.rail} aria-hidden="true">
            <span className={styles.packet} />
            <span className={styles.packet} />
            <span className={styles.packet} />
          </span>
          <ol className={styles.track}>
          {STAGES.map((stage, index) => (
            <li key={stage.name} className={styles.stage} style={{ "--i": index } as CSSProperties}>
              <span className={styles.node}>{stage.name}</span>
              <span className={styles.tools}>{stage.tools}</span>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
