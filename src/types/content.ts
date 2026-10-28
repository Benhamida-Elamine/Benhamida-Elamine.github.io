export type ProjectVisual = "iot" | "mri" | "cnn" | "energy";

export type ProjectStatus = {
  /** Short label shown on cards, e.g. "Tested locally". */
  label: string;
  /** Longer, precise statement shown on the detail page. */
  detail: string;
};

export type ProjectSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type ProjectFigure = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One-line purpose, shown under the title. */
  headline: string;
  /** Where the work comes from: "Personal project", "Master's project, Université de Bordeaux"... */
  context: string;
  year?: string;
  category: string;
  /** What Amine did, phrased only as far as the evidence goes. */
  contribution: string;
  summary: string;
  stack: string[];
  status: ProjectStatus;
  repoUrl: string;
  demoUrl?: string;
  visual: ProjectVisual;
  figures?: ProjectFigure[];
  sections: ProjectSection[];
  /** SEO description for the detail page. */
  description: string;
};

export type MinorProject = {
  title: string;
  summary: string;
  stack: string[];
  context: string;
  repoUrl: string;
};

export type Experience = {
  company: string;
  place: string;
  role: string;
  period: string;
  points: string[];
  stack: string[];
};

export type Milestone = {
  period: string;
  title: string;
  place: string;
  kind: "education" | "work";
};

export type SkillGroup = {
  area: string;
  skills: string[];
};
