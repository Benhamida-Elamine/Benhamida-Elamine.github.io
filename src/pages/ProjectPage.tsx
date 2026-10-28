import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ExternalLink } from "../components/ExternalLink.tsx";
import { ArrowLeft, ArrowRight } from "../components/Icons.tsx";
import { ProjectVisual } from "../components/ProjectVisual.tsx";
import { WindowFrame } from "../components/WindowFrame.tsx";
import { profile } from "../data/profile.ts";
import { projects } from "../data/projects.ts";
import { applySeo } from "../lib/seo.ts";
import { NotFound } from "./NotFound.tsx";
import styles from "./ProjectPage.module.css";

export const ProjectPage = () => {
  const { slug } = useParams();
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];

  useEffect(() => {
    if (project) applySeo(`${project.title} — ${profile.name}`, project.description, `/projects/${project.slug}/`);
  }, [project]);

  if (!project) return <NotFound />;

  const next = projects[(index + 1) % projects.length];
  const facts = [
    { label: "Context", value: project.context },
    { label: "Year", value: project.year },
    { label: "Role", value: project.contribution },
    { label: "Status", value: project.status.label },
  ].filter((fact) => fact.value);

  return (
    <article className={styles.page}>
      <div className="container">
        <Link to={{ pathname: "/", hash: "#work" }} className={styles.back}>
          <ArrowLeft /> All projects
        </Link>

        <header className={styles.header}>
          <p className="eyebrow">{project.category}</p>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.headline}>{project.headline}</p>
        </header>

        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.links}>
          <ExternalLink href={project.repoUrl} className={styles.primary}>
            Source on GitHub
          </ExternalLink>
          {project.demoUrl && (
            <ExternalLink href={project.demoUrl} className={styles.secondary}>
              Live demo
            </ExternalLink>
          )}
        </div>

        <WindowFrame title={project.repoUrl.replace("https://", "")} className={styles.visual}>
          <ProjectVisual kind={project.visual} />
        </WindowFrame>

        <div className={styles.body}>
          <section className={styles.overview} aria-labelledby="overview">
            <h2 id="overview" className={styles.h2}>
              Overview
            </h2>
            <p className={styles.summary}>{project.summary}</p>
            {project.figures && (
              <dl className={styles.figures}>
                {project.figures.map((figure) => (
                  <div key={figure.label}>
                    <dt>{figure.value}</dt>
                    <dd>{figure.label}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>

          {project.sections.map((section, sectionIndex) => (
            <section key={section.title} className={styles.section} aria-labelledby={`section-${sectionIndex}`}>
              <h2 id={`section-${sectionIndex}`} className={styles.h2}>
                {section.title}
              </h2>
              <div className={styles.sectionBody}>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items && (
                  <ul className={styles.items}>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section className={styles.section} aria-labelledby="stack">
            <h2 id="stack" className={styles.h2}>
              Stack
            </h2>
            <div className={styles.stack}>
              {project.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="status">
            <h2 id="status" className={styles.h2}>
              Status
            </h2>
            <p className={styles.sectionBody}>{project.status.detail}</p>
          </section>
        </div>

        <Link to={`/projects/${next.slug}`} className={styles.next}>
          <span className={styles.nextLabel}>Next project</span>
          <span className={styles.nextTitle}>
            {next.title} <ArrowRight />
          </span>
        </Link>
      </div>
    </article>
  );
};
