import { useRef, useState } from "react";
import { Play } from "../components/Icons.tsx";
import { WindowFrame } from "../components/WindowFrame.tsx";
import { asset } from "../lib/asset.ts";
import styles from "./Showreel.module.css";

export const Showreel = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  // Nothing is downloaded until the visitor asks for it, and sound only starts on that click.
  const start = () => {
    setStarted(true);
    void videoRef.current?.play();
  };

  return (
    <section id="showreel" className={styles.showreel} aria-labelledby="showreel-title">
      <div className="container">
        <header className={styles.header} data-reveal>
          <p className="eyebrow">03 · Motion</p>
          <h2 id="showreel-title" className="section-title">
            The same story, <br className={styles.br} />
            told in <em className="serif">motion.</em>
          </h2>
          <p className={styles.intro}>
            A 63-second showreel about my work, built entirely in code with Remotion (React) and narrated with my own voice.
            Its palette, type and timing became the design system of this site.
          </p>
        </header>

        <div data-reveal>
          <WindowFrame title="Amine_Benhamida_Showreel.mp4 — 1:03" className={styles.frame}>
            <div className={styles.player}>
              <video
                ref={videoRef}
                className={styles.video}
                poster={asset("assets/images/showreel-poster.jpg")}
                preload="none"
                playsInline
                controls={started}
                width={1280}
                height={720}
              >
                <source src={asset("assets/videos/showreel-720p.mp4")} type="video/mp4" />
                Your browser cannot play this video.{" "}
                <a href={asset("assets/videos/showreel-720p.mp4")}>Download the showreel (MP4, 2.5 MB)</a>.
              </video>
              {!started && (
                <button type="button" className={styles.play} onClick={start}>
                  <span className={styles.playIcon}>
                    <Play />
                  </span>
                  <span>Play showreel · sound on</span>
                </button>
              )}
            </div>
          </WindowFrame>
        </div>

        <dl className={styles.credits} data-reveal>
          <div>
            <dt>Format</dt>
            <dd>1920 × 1080, 60 fps · web version 720p</dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>Remotion, React, TypeScript</dd>
          </div>
          <div>
            <dt>Voice</dt>
            <dd>My own recording</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};
