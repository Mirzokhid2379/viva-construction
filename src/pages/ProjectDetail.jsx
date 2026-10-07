import { Link, useParams } from "react-router-dom";
import { PageTitle } from "../seo/Head.jsx";
import { PROJECTS } from "../data/projects.js";
import { useI18n, useProject, useProjects } from "../i18n/index.jsx";
import { img } from "../components/Img.js";
import { MiniMap } from "../components/UzMap.jsx";
import { useLightbox } from "../components/Lightbox.jsx";
import { Closing, SectionHead } from "../components/Blocks.jsx";
import NotFound from "./NotFound.jsx";

// Bugungi sanaga nisbatan qurilish muddatining necha foizi o‘tgani
function progress(p) {
  const start = new Date(p.start);
  const end = new Date(start);
  end.setMonth(end.getMonth() + p.months);
  const pct = Math.max(0, Math.min(100, Math.round(((Date.now() - start) / (end - start)) * 100)));
  return { pct, end: `${String(end.getMonth() + 1).padStart(2, "0")}.${end.getFullYear()}` };
}

function HeroText({ p }) {
  const { t } = useI18n();
  return (
    <div>
      <div className="crumbs"><Link to="/">{t.nav.home}</Link><span>/</span><Link to="/loyihalar">{t.nav.projects}</Link><span>/</span><span>{p.regName}</span></div>
      <h1>{p.t}</h1>
      <p className="sub">{p.sub}</p>
      <div className="loc">{p.place} · {t.types[p.type]}</div>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const { t } = useI18n();
  const p = useProject(id);
  const all = useProjects();
  const [openPhotos, lightbox] = useLightbox();
  if (!p) return <NotFound />;

  const d = t.detail;
  const i = PROJECTS.findIndex((x) => x.id === id);
  const prev = all[(i - 1 + all.length) % all.length];
  const next = all[(i + 1) % all.length];
  const g = p.start ? progress(p) : null;

  return (
    <>
      <PageTitle title={p.t} />
      {p.big ? (
        <section className="ph-hero big">
          <div className="bgp" style={{ backgroundImage: `url(${img(p.img)})` }} />
          <div className="wrap"><HeroText p={p} /></div>
        </section>
      ) : (
        <section className="ph-hero">
          <div className="wrap">
            <HeroText p={p} />
            <div className="frame" style={{ backgroundImage: `url(${img(p.img)})` }} />
          </div>
        </section>
      )}

      <div className="facts">
        <div className="wrap">
          <div><span>{d.company}</span><b>{p.co}</b></div>
          <div><span>{d.role}</span><b>{p.roleName}</b></div>
          <div><span>{d.partners}</span><b>{p.partner}</b></div>
          <div><span>{d.status}</span><b>{t.status[p.st]}</b></div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="body2">
            <div>
              <p className="lead">{p.d}</p>
              <div className="eyebrow" style={{ marginBottom: 14 }}>{d.scope}</div>
              <ul className="scope">{p.scope.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
            <aside className="side">
              <div className="statg">
                {p.stats.map(([a, b]) => <div key={b}><b className="num">{a}</b><span>{b}</span></div>)}
              </div>
              {g && (
                <div className="prog">
                  <div className="t"><span>{d.progress(g.pct)}</span><span>{d.end(g.end)}</span></div>
                  <div className="bar"><i style={{ width: `${g.pct}%` }} /></div>
                  <small>{d.started(p.months)}</small>
                </div>
              )}
              <MiniMap project={p} />
            </aside>
          </div>
        </div>
      </section>

      {p.infra && (
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <SectionHead eyebrow={d.infraEyebrow} title={d.infraTitle} />
            <div className="infra">{p.infra.map(([a, b]) => <div key={b}><b className="num">{a}</b><span>{b}</span></div>)}</div>
          </div>
        </section>
      )}

      {p.planPhotos && (
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <SectionHead eyebrow={d.plansEyebrow} title={d.plansTitle}>{d.plansText}</SectionHead>
            <div className="plans">
              {p.planPhotos.map(([k, c], j) => (
                <button type="button" key={k} onClick={() => openPhotos(p.planPhotos, j)}>
                  <img src={img(k)} alt={c} loading="lazy" /><span>{c}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={d.galEyebrow} title={d.galTitle}>{d.galText(p.photos.length)}</SectionHead>
          <div className="gal">
            {p.photos.map(([k, c], j) => (
              <button type="button" key={k} aria-label={c} onClick={() => openPhotos(p.photos, j)}>
                <img src={img(k)} alt={c} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="nextp">
            {[[d.prev, prev], [d.next, next]].map(([label, q]) => (
              <Link key={label} to={`/loyiha/${q.id}`}>
                <div className="im" style={{ backgroundImage: `url(${img(q.img)})` }} />
                <div><span>{label}</span><b>{q.t}</b></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Closing />
      {lightbox}
    </>
  );
}
