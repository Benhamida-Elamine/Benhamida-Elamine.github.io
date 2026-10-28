import type { Experience, Milestone, SkillGroup } from "../types/content.ts";

// Every fact below comes from Amine's own CV statements, his public GitHub
// profile, or his showreel. Do not add claims that cannot be traced back to one of them.

export const SITE_URL = "https://benhamida-elamine.github.io";

export const profile = {
  name: "Amine Benhamida",
  role: "Data Engineer",
  location: "France",
  email: "elamine.benhamida@gmail.com",
  links: {
    github: "https://github.com/Benhamida-Elamine",
    linkedin: "https://www.linkedin.com/in/amine-benhamida",
  },
};

export const experience: Experience[] = [
  {
    company: "Symbio",
    place: "Lyon, France",
    role: "Data Engineer (apprenticeship)",
    period: "Jan 2025 — Dec 2025",
    points: [
      "Designed ELT/ETL pipelines ingesting Dynamics 365 ERP data, flat files and SFTP drops with SQL, Python, PowerShell and Talend.",
      "Modeled a Snowflake warehouse on the Medallion architecture (Bronze, Silver, Gold) with Dynamic Tables, views and stored procedures.",
      "Automated processing with Snowflake Tasks and scripts, and set up pipeline monitoring: log normalization, KO/WA anomaly detection and a supervision dashboard.",
      "Built self-service Streamlit apps for business KPIs, with dynamic filters and CSV/Excel exports, delivered from DEV to PROD through GitLab CI/CD and SchemaChange.",
    ],
    stack: ["Snowflake", "SQL", "Python", "PowerShell", "Talend", "Streamlit", "GitLab CI/CD", "SchemaChange", "Dynamics 365"],
  },
  {
    company: "Sonatrach",
    place: "Algiers, Algeria",
    role: "Data Engineer",
    period: "Jan 2022 — Aug 2022",
    points: [
      "Built and maintained Python (Pandas) ETL pipelines from PostgreSQL and flat files into MySQL, cutting processing time by about 40%.",
      "Applied a Kalman filter to remove measurement noise from sensor data before analysis.",
      "Developed Streamlit dashboards to follow equipment behavior in real time.",
    ],
    stack: ["Python", "Pandas", "PostgreSQL", "MySQL", "Kalman filter", "Streamlit"],
  },
];

export const milestones: Milestone[] = [
  { period: "2017 — 2020", title: "BSc Applied Mathematics", place: "USTHB, Algiers", kind: "education" },
  { period: "2020 — 2022", title: "MSc Operations Research", place: "USTHB, Algiers", kind: "education" },
  { period: "2022", title: "Data Engineer", place: "Sonatrach, Algiers", kind: "work" },
  { period: "2023 — 2025", title: "MSc Image & Data Science", place: "Université de Bordeaux", kind: "education" },
  { period: "2025", title: "Data Engineer, apprenticeship", place: "Symbio, Lyon", kind: "work" },
];

/** Used in a job: appears in the experience above. */
export const skillsAtWork: SkillGroup[] = [
  { area: "Languages", skills: ["Python", "SQL", "PowerShell"] },
  { area: "Data engineering", skills: ["ETL / ELT", "Talend", "Pandas", "Medallion architecture", "Data modeling", "Kalman filtering"] },
  { area: "Platforms & databases", skills: ["Snowflake", "Dynamic Tables", "Snowflake Tasks", "PostgreSQL", "MySQL"] },
  { area: "Delivery & operations", skills: ["Git", "GitLab CI/CD", "SchemaChange", "Pipeline monitoring", "Streamlit"] },
];

/** Used in personal or academic projects and coursework, not in a job. */
export const skillsInProjects: SkillGroup[] = [
  { area: "Machine learning", skills: ["PyTorch", "CNNs", "scikit-learn", "Prophet", "R"] },
  { area: "Image & signal", skills: ["OpenCV", "scikit-image", "NumPy / SciPy", "Optical flow", "PCA", "FFT", "MediaPipe"] },
  { area: "Engineering", skills: ["pytest", "Plotly", "Jupyter"] },
  { area: "Motion & front end", skills: ["Remotion", "React", "TypeScript"] },
];
