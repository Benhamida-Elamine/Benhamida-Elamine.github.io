import { useEffect } from "react";
import { profile } from "../data/profile.ts";
import { applySeo } from "../lib/seo.ts";
import { About } from "../sections/About.tsx";
import { Contact } from "../sections/Contact.tsx";
import { Experience } from "../sections/Experience.tsx";
import { Hero } from "../sections/Hero.tsx";
import { Pipeline } from "../sections/Pipeline.tsx";
import { Showreel } from "../sections/Showreel.tsx";
import { Work } from "../sections/Work.tsx";

export const HOME_TITLE = `${profile.name} — ${profile.role}`;
export const HOME_DESCRIPTION =
  "Amine Benhamida, data engineer based in France: pipelines, Snowflake warehouses and Streamlit apps, plus projects in IoT data, medical imaging and computer vision.";

export const Home = () => {
  useEffect(() => applySeo(HOME_TITLE, HOME_DESCRIPTION, "/"), []);

  return (
    <>
      <Hero />
      <Pipeline />
      <Work />
      <Experience />
      <Showreel />
      <About />
      <Contact />
    </>
  );
};
