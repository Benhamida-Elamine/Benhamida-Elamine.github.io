import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer.tsx";
import { Nav } from "./components/Nav.tsx";
import { useReveal } from "./hooks/useReveal.ts";
import { Home } from "./pages/Home.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { ProjectPage } from "./pages/ProjectPage.tsx";

/** Scrolls to the requested section, or to the top on a new page, and starts scroll reveals. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useReveal(pathname);

  useEffect(() => {
    if (hash) {
      // Wait one frame so the target section is in the DOM after a page change.
      const frame = requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView());
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
    <a className="skip-link" href="#main">
      Skip to content
    </a>
    <ScrollManager />
    <Nav />
    <main id="main" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);
