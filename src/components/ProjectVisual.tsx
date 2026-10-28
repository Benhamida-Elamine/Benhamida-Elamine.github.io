import type { CSSProperties, JSX } from "react";
import iotSample from "../data/iot-sample.json";
import { useInView } from "../hooks/useInView.ts";
import type { ProjectVisual as VisualKind } from "../types/content.ts";
import styles from "./ProjectVisual.module.css";

type Series = Record<string, { temperature: number[]; vibration: number[]; rpm: number[] }>;
const series = iotSample.series as Series;

const average = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;

const toPath = (values: number[], width: number, height: number, min: number, max: number) =>
  values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / (max - min)) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

/** Real simulator output (IOT-simulation, seed 2026) drawn as a monitoring panel. */
const IotVisual = () => {
  const machines = Object.entries(series);
  const temperatures = machines.flatMap(([, data]) => data.temperature);
  const min = Math.floor(Math.min(...temperatures)) - 1;
  const max = Math.ceil(Math.max(...temperatures)) + 1;
  const tiles = [
    { label: "Machines", value: String(machines.length) },
    { label: "Cycles", value: String(machines[0][1].temperature.length) },
    { label: "Avg temp", value: `${average(temperatures).toFixed(1)} °C` },
    { label: "Avg rpm", value: Math.round(average(machines.flatMap(([, data]) => data.rpm))).toLocaleString("en-US") },
  ];

  return (
    <div className={styles.iot}>
      <div className={styles.tiles}>
        {tiles.map((tile) => (
          <div key={tile.label} className={styles.tile}>
            <span>{tile.label}</span>
            <strong>{tile.value}</strong>
          </div>
        ))}
      </div>
      <div className={styles.chart}>
        <div className={styles.chartHead}>
          <span>temperature · °C</span>
          <span className={styles.legend}>
            {machines.map(([id], index) => (
              <i key={id} style={{ "--i": index } as CSSProperties}>
                {id.replace("MACHINE_", "M")}
              </i>
            ))}
          </span>
        </div>
        <svg viewBox="0 0 600 170" preserveAspectRatio="none" className={styles.lines}>
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line key={ratio} x1="0" x2="600" y1={170 * ratio} y2={170 * ratio} className={styles.grid} />
          ))}
          {machines.map(([id, data], index) => (
            <path
              key={id}
              d={toPath(data.temperature, 600, 170, min, max)}
              className={styles.line}
              style={{ "--i": index } as CSSProperties}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
      <p className={styles.caption}>Real output · simulator.py · 5 machines × 180 cycles · seed 2026</p>
    </div>
  );
};

/** Illustration of a dense motion field; the numbers are the project's reported results. */
const MriVisual = () => {
  const columns = 18;
  const rows = 10;
  const arrows = [];
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = (column + 0.5) / columns;
      const y = (row + 0.5) / rows;
      // Stronger, mostly vertical motion near the center, as with breathing.
      const strength = Math.exp(-((x - 0.5) ** 2 / 0.08 + (y - 0.55) ** 2 / 0.12));
      const angle = -90 + (x - 0.5) * 50;
      arrows.push({ x, y, strength, angle, key: `${row}-${column}` });
    }
  }
  return (
    <div className={styles.mri}>
      <div className={styles.field} aria-hidden="true">
        {arrows.map((arrow) => (
          <span
            key={arrow.key}
            className={styles.arrow}
            style={
              {
                left: `${arrow.x * 100}%`,
                top: `${arrow.y * 100}%`,
                "--len": 0.25 + arrow.strength * 0.9,
                "--rot": `${arrow.angle}deg`,
                "--alpha": 0.25 + arrow.strength * 0.75,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className={styles.mriStats}>
        <div>
          <strong>0.19 Hz</strong>
          <span>respiration</span>
        </div>
        <div>
          <strong>0.39 Hz</strong>
          <span>cardiac</span>
        </div>
        <div>
          <strong>7 PCs ≈ 91%</strong>
          <span>of motion</span>
        </div>
      </div>
      <p className={styles.caption}>Illustration of a Horn–Schunck flow field · figures from the project report</p>
    </div>
  );
};

/** Test accuracies reported in the repository README. */
const CnnVisual = () => {
  const models = [
    { name: "Model 1", accuracy: 95.82 },
    { name: "Model 2", accuracy: 96.97 },
    { name: "Model 3", accuracy: 96.94 },
  ];
  const floor = 90;
  return (
    <div className={styles.cnn}>
      <div className={styles.bars}>
        {models.map((model, index) => (
          <div key={model.name} className={styles.barRow}>
            <span className={styles.barLabel}>{model.name}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.bar}
                style={{ "--w": (model.accuracy - floor) / (100 - floor), "--i": index } as CSSProperties}
              />
            </div>
            <span className={styles.barValue}>{model.accuracy.toFixed(2)}%</span>
          </div>
        ))}
        <div className={styles.axis} aria-hidden="true">
          <span>90%</span>
          <span>95%</span>
          <span>100%</span>
        </div>
      </div>
      <div className={styles.agreement}>
        <strong>94.25%</strong>
        <span>of 4,993 images get the same label from all three models</span>
      </div>
      <p className={styles.caption}>Test accuracy as reported in the repository · axis starts at 90%</p>
    </div>
  );
};

const wave = (count: number, fn: (t: number) => number) =>
  Array.from({ length: 121 }, (_, index) => {
    const t = index / 120;
    return `${index === 0 ? "M" : "L"}${(t * 200).toFixed(1)} ${(20 - fn(t * count) * 14).toFixed(1)}`;
  }).join(" ");

/** Schematic of Prophet's additive model; not a plot of the project's data. */
const EnergyVisual = () => {
  const components = [
    { label: "trend", d: wave(1, (t) => -0.6 + t * 1.1) },
    { label: "yearly", d: wave(1, (t) => Math.cos(t * Math.PI * 2) * 0.8) },
    { label: "weekly", d: wave(4, (t) => Math.sin(t * Math.PI * 2) * 0.6) },
    { label: "holidays", d: wave(1, (t) => (Math.abs(t - 0.32) < 0.02 || Math.abs(t - 0.78) < 0.02 ? -0.9 : 0)) },
  ];
  return (
    <div className={styles.energy}>
      <div className={styles.components}>
        {components.map((component, index) => (
          <div key={component.label} className={styles.component} style={{ "--i": index } as CSSProperties}>
            <span>{index === 0 ? "" : "+"}</span>
            <code>{component.label}</code>
            <svg viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
              <path d={component.d} className={styles.compLine} />
            </svg>
          </div>
        ))}
        <div className={`${styles.component} ${styles.total}`}>
          <span>=</span>
          <code>hourly demand forecast</code>
        </div>
      </div>
      <p className={styles.caption}>Schematic of Prophet&apos;s additive model · open data from data.gouv.fr and ODRE éCO2mix</p>
    </div>
  );
};

const visuals: Record<VisualKind, () => JSX.Element> = {
  iot: IotVisual,
  mri: MriVisual,
  cnn: CnnVisual,
  energy: EnergyVisual,
};

export const ProjectVisual = ({ kind }: { kind: VisualKind }) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const Visual = visuals[kind];
  return (
    <div ref={ref} className={`${styles.visual} ${inView ? styles.play : ""}`}>
      <Visual />
    </div>
  );
};
