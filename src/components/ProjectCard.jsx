import { useState } from "react";
import { Link } from "react-router-dom";
import Cover from "./Cover.jsx";
import { useI18n, useProjects } from "../i18n/index.jsx";

export function Status({ st }) {
  const { t } = useI18n();
  return <span className={`st ${st}`}>{t.status[st]}</span>;
}

// p — localize() qilingan loyiha
export default function ProjectCard({ p }) {
  const { t } = useI18n();
  return (
    <Link className="pc" to={`/loyiha/${p.id}`}>
      <div className="im">
        <Cover k={p.img} type={p.type} />
        <span className="cap num">{p.cap}<small>{p.capUnit}</small></span>
      </div>
      <div className="meta"><span>{p.regName} · {t.types[p.type]}</span><Status st={p.st} /></div>
      <h3>{p.t}</h3>
      <p>{p.sub}</p>
    </Link>
  );
}

const FILTERS = ["all", "sol", "bess", "th", "now"];

// Saralash tugmalari bilan loyihalar to‘ri
export function ProjectGrid() {
  const { t } = useI18n();
  const projects = useProjects();
  const [k, setK] = useState("all");
  const list = projects.filter((p) => k === "all" || p.type === k || p.st === k);
  return (
    <>
      <div className="filters">
        {FILTERS.map((key) => (
          <button key={key} className="chip" type="button" aria-pressed={k === key} onClick={() => setK(key)}>{t.filters[key]}</button>
        ))}
      </div>
      <div className="pgrid">{list.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
    </>
  );
}
