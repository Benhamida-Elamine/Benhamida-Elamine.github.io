import type { CSSProperties } from "react";
import { experience, milestones, skillsAtWork, skillsInProjects } from "../data/profile.ts";
import { useInView } from "../hooks/useInView.ts";
import type { SkillGroup } from "../types/content.ts";
import styles from "./Experience.module.css";

const Timeline = () => {
  const [ref, inView] = useInView<HTMLOListElement>(0.35);
  return (
    <ol ref={ref} className={`${styles.timeline} ${inView ? styles.on : ""}`} aria-label="Timeline">
      {milestones.map((milestone, index) => (
        <li
          key={milestone.title}
          className={`${styles.milestone} ${milestone.kind === "work" ? styles.work : ""}`}
          style={{ "--i": index } as CSSProperties}
        >
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.when}>{milestone.period}</span>
          <span className={styles.what}>{milestone.title}</span>
          <span className={styles.where}>{milestone.place}</span>
        </li>
      ))}
    </ol>
  );
};

const Skills = ({ title, note, groups }: { title: string; note: string; groups: SkillGroup[] }) => (
  <div className={styles.skillColumn} data-reveal>
    <h3 className={styles.skillTitle}>{title}</h3>
    <p className={styles.skillNote}>{note}</p>
    <dl className={styles.skillGroups}>
      {groups.map((group) => (
        <div key={group.area} className={styles.skillGroup}>
          <dt>{group.area}</dt>
          <dd>
            {group.skills.map((skill) => (
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

export const Experience = () => (
  <section id="experience" className={styles.experience} aria-labelledby="experience-title">
    <div className="container">
      <header data-reveal>
        <p className="eyebrow">02 · Experience</p>
        <h2 id="experience-title" className="section-title">
          Mathematics first, <br className={styles.br} />
          then <em className="serif">data platforms.</em>
        </h2>
      </header>

      <Timeline />

      <div className={styles.jobs}>
        {experience.map((job, index) => (
          <article key={job.company} className={styles.job} data-reveal style={{ "--delay": `${index * 120}ms` } as CSSProperties}>
            <header className={styles.jobHead}>
              <div>
                <h3 className={styles.jobRole}>{job.role}</h3>
                <p className={styles.jobCompany}>
                  {job.company} · {job.place}
                </p>
              </div>
              <p className={styles.jobPeriod}>{job.period}</p>
            </header>
            <ul className={styles.points}>
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className={styles.stack}>{job.stack.join(" · ")}</p>
          </article>
        ))}
      </div>

      <div id="skills" className={styles.skills}>
        <Skills title="Used at work" note="Technologies from the roles above." groups={skillsAtWork} />
        <Skills
          title="Used in projects & coursework"
          note="Applied in the projects on this site and during my Master's, not yet in a job."
          groups={skillsInProjects}
        />
      </div>
    </div>
  </section>
);
