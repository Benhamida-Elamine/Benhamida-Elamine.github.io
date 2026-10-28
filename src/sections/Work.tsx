import { ExternalLink } from "../components/ExternalLink.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";
import { profile } from "../data/profile.ts";
import { minorProjects, projects } from "../data/projects.ts";
import styles from "./Work.module.css";

export const Work = () => (
  <section id="work" className={styles.work} aria-labelledby="work-title">
    <div className="container">
      <header className={styles.header} data-reveal>
        <p className="eyebrow">01 · Selected work</p>
        <h2 id="work-title" className="section-title">
          Projects, from sensors <br className={styles.br} />
          to <em className="serif">signals.</em>
        </h2>
        <p className={styles.intro}>
          A personal data-engineering project and work from my Master&apos;s in image and data science. Each case study
          says what was built, with what, and how far it was tested.
        </p>
      </header>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <div className={styles.more} data-reveal>
        <h3 className={styles.moreTitle}>Also on GitHub</h3>
        <ul>
          {minorProjects.map((project) => (
            <li key={project.repoUrl}>
              <ExternalLink href={project.repoUrl} className={styles.row} bare>
                <span className={styles.rowTitle}>{project.title}</span>
                <span className={styles.rowSummary}>{project.summary}</span>
                <span className={styles.rowMeta}>
                  {project.context} · {project.stack.join(", ")}
                </span>
                <span className={styles.rowArrow} aria-hidden="true">
                  ↗
                </span>
              </ExternalLink>
            </li>
          ))}
        </ul>
        <ExternalLink href={profile.links.github} className={styles.all}>
          All repositories
        </ExternalLink>
      </div>
    </div>
  </section>
);
