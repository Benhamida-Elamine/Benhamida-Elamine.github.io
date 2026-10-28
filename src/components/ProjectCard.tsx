import type { PointerEvent } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../types/content.ts";
import { ArrowRight } from "./Icons.tsx";
import styles from "./ProjectCard.module.css";
import { ProjectVisual } from "./ProjectVisual.tsx";
import { WindowFrame } from "./WindowFrame.tsx";

// The soft spotlight follows the pointer; it is purely decorative.
const trackPointer = (event: PointerEvent<HTMLAnchorElement>) => {
  if (event.pointerType !== "mouse") return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

export const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const meta = [project.context, project.year && `'${project.year.slice(2)}`].filter(Boolean).join(", ");
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={styles.card}
      onPointerMove={trackPointer}
      data-reveal
      aria-label={`${project.title}: ${project.headline} View case study`}
    >
      <div className={styles.head}>
        <div>
          <p className={styles.index}>
            {String(index + 1).padStart(2, "0")} · {project.category}
          </p>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.meta}>
            <span>{meta}</span> — {project.headline}
          </p>
        </div>
        <span className={styles.arrow} aria-hidden="true">
          <ArrowRight />
        </span>
      </div>

      <div className={styles.tags}>
        <span className={`chip ${styles.status}`}>{project.status.label}</span>
        {project.stack.slice(0, 4).map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>

      <WindowFrame size="small" title={project.repoUrl.replace("https://", "")} className={styles.preview}>
        <ProjectVisual kind={project.visual} />
      </WindowFrame>
    </Link>
  );
};
