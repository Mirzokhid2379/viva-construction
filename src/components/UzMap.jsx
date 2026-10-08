import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GEO } from "../data/geo.js";
import { REGIONS, TYPE_COLOR } from "../data/projects.js";
import { useI18n, useProjects } from "../i18n/index.jsx";
import Cover from "./Cover.jsx";

// Uzunlik/kenglikni xarita koordinatasiga aylantirish
export const proj = (lon, lat) => [(lon - GEO.L0) * GEO.k * GEO.sx, (GEO.B1 - lat) * GEO.sx];

// Nuqta yonidagi nom qayerda turishi: [dx, dy, tekislash]
const LABEL = {
  "fargona-bess": [12, 4, "start"], nurobod: [-12, -4, "end"], sazagan: [12, 10, "start"], buxoro: [-12, 4, "end"],
  nishon: [12, 2, "start"], tolimarjon: [12, 10, "start"], "navoiy-ies": [12, 4, "start"], "navoiy-gibrid": [-12, -2, "end"],
};

// Kichik xarita — loyiha sahifasida joylashuvni ko‘rsatadi
export function MiniMap({ project }) {
  const { t } = useI18n();
  const [x, y] = proj(...project.ll);
  return (
    <div className="minimap">
      <svg viewBox={`0 0 ${GEO.W} ${GEO.H}`} role="img" aria-label={`${t.map.location}: ${project.place}`}>
        <path className="uz" d={GEO.uz} />
        <g className={`pin ${project.type} ${project.st}`}>
          <circle className="halo" cx={x} cy={y} r={16} />
          <circle className="dot" cx={x} cy={y} r={16} />
        </g>
      </svg>
      <p>{project.place}</p>
    </div>
  );
}

// Asosiy xarita: barcha qurilgan joylar
function BigMap({ projects, active, setActive }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const boxRef = useRef(null);
  const [tip, setTip] = useState(null);
  const [ax, ay] = proj(62.6, 42.5);
  const [bx, by] = proj(72.7, 37.05);
  const [tx, ty] = proj(69.24, 41.31);

  const show = (id, el) => {
    const b = boxRef.current.getBoundingClientRect();
    const r = el.querySelector(".dot").getBoundingClientRect();
    const left = Math.max(130, Math.min(b.width - 130, r.left - b.left + r.width / 2));
    setTip({ id, left, top: r.top - b.top });
    setActive(id);
  };
  const hide = () => { setTip(null); setActive(null); };
  const tp = tip && projects.find((p) => p.id === tip.id);

  return (
    <div className="mapbox" ref={boxRef}>
      <svg viewBox={`${ax} ${ay} ${bx - ax} ${by - ay}`} role="img" aria-label={t.map.aria}>
        <defs>
          <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".14" stopColor="#fff" /></linearGradient>
          <mask id="mk"><rect x={ax} y={ay} width={bx - ax} height={by - ay} fill="url(#fade)" /></mask>
        </defs>
        <g mask="url(#mk)">
          {GEO.nb.map((d, i) => <path key={i} className="nb" d={d} />)}
          <path className="uz" d={GEO.uz} />
        </g>
        <g className="city"><circle cx={tx} cy={ty} r={2.5} /><text x={tx + 6} y={ty + 4}>{t.map.tashkent}</text></g>
        {[[t.map.valley, 71.3, 41.15], [t.map.desert, 63.9, 41.6]].map(([n, lo, la]) => {
          const [x, y] = proj(lo, la);
          return <text key={n} className="reglab" x={x} y={y} textAnchor="middle">{n}</text>;
        })}
        {projects.map((p) => {
          const [x, y] = proj(...p.ll);
          const L = LABEL[p.id];
          return (
            <g
              key={p.id}
              className={`pin ${p.type} ${p.st}${active === p.id ? " on" : ""}`}
              tabIndex={0}
              role="link"
              aria-label={p.t}
              onMouseEnter={(e) => show(p.id, e.currentTarget)}
              onMouseLeave={hide}
              onFocus={(e) => show(p.id, e.currentTarget)}
              onBlur={hide}
              onClick={() => navigate(`/loyiha/${p.id}`)}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/loyiha/${p.id}`)}
            >
              <circle className="halo" cx={x} cy={y} r={7} />
              <circle className="dot" cx={x} cy={y} r={7} />
              <text className="pl" x={x + L[0]} y={y + L[1]} textAnchor={L[2]}>{p.t}</text>
            </g>
          );
        })}
      </svg>
      <div className={`tip${tp ? " show" : ""}`} style={tp ? { left: tip.left, top: tip.top } : undefined}>
        {tp && (
          <>
            <Cover k={tp.img} type={tp.type} className="im" />
            <div className="bd"><b>{tp.t}</b><span>{tp.sub}<br />{tp.place}</span></div>
          </>
        )}
      </div>
    </div>
  );
}

// To‘liq bo‘lim: xarita + viloyatlar ro‘yxati
export default function MapSection() {
  const { t } = useI18n();
  const projects = useProjects();
  const [active, setActive] = useState(null);
  return (
    <section className="mapsec tex" id="map">
      <div className="wrap">
        <div className="head">
          <div><div className="eyebrow">{t.map.eyebrow}</div><h2>{t.map.title}</h2></div>
          <p>{t.map.text}</p>
        </div>
        <div className="mapgrid">
          <div>
            <BigMap projects={projects} active={active} setActive={setActive} />
            <div className="legend">
              {["sol", "bess", "th"].map((k) => <span key={k}><i style={{ background: TYPE_COLOR[k] }} />{t.types[k]}</span>)}
            </div>
          </div>
          <div className="reglist">
            {REGIONS.map((r) => {
              const list = projects.filter((p) => p.reg === r);
              return (
                <div className="rg" key={r}>
                  <h3>{t.regions[r]}<small>{t.map.objects(list.length)}</small></h3>
                  <ul>
                    {list.map((p) => (
                      <li key={p.id}>
                        <Link to={`/loyiha/${p.id}`} className={active === p.id ? "on" : ""} onMouseEnter={() => setActive(p.id)} onMouseLeave={() => setActive(null)}>
                          <i style={{ background: TYPE_COLOR[p.type] }} /><span>{p.t}</span><em>{p.cap} {p.capUnit}</em>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <p className="note">{t.map.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
