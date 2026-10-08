import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageTitle } from "../seo/Head.jsx";
import { PROCESS_HERO, STAGES } from "../data/process.js";
import { useI18n, useProjects } from "../i18n/index.jsx";
import { img } from "../components/Img.js";
import { useLightbox } from "../components/Lightbox.jsx";
import { Watermark } from "../components/VivaMark.jsx";
import BeforeAfter from "../components/BeforeAfter.jsx";
import { Arrow, Closing, SectionHead } from "../components/Blocks.jsx";

const pad = (n) => String(n).padStart(2, "0");

// Ekranda qaysi bosqich turganini va sahifa qancha o‘qilganini kuzatadi
function useScrollStage(refs) {
  const [active, setActive] = useState(0);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.45;
      let a = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < mid) a = i;
      });
      setActive(a);
      const first = refs.current[0];
      const last = refs.current[refs.current.length - 1];
      if (first && last) {
        const top = first.getBoundingClientRect().top + window.scrollY - mid;
        const end = last.getBoundingClientRect().bottom + window.scrollY - mid;
        setPct(Math.max(0, Math.min(1, (window.scrollY - top) / (end - top))));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [refs]);
  return [active, pct];
}

// Bosqich kartochkalari ekranga kirganda ohista paydo bo‘ladi
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".pr-stage");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -12% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Stage({ s, i, text, n, project, onOpen, refCb }) {
  const { t } = useI18n();
  const pr = t.process;
  const [main, ...rest] = s.photos;
  const thumbs = rest.slice(0, 4);
  const more = s.photos.length - 1 - thumbs.length;
  return (
    <article className={`pr-stage ${i % 2 ? "flip" : ""}`} id={`bosqich-${i + 1}`} ref={refCb}>
      <div className="pr-txt">
        <div className="pr-no" aria-hidden="true">{pad(i + 1)}</div>
        <div className="eyebrow">{pr.stage} {i + 1} / {n}</div>
        <h2>{text.t}</h2>
        <p>{text.d}</p>
        <ul>{text.pts.map((x) => <li key={x}>{x}</li>)}</ul>
        <Link className="pr-proj" to={`/loyiha/${s.project}`}>{pr.project}: <b>{project?.t}</b> <Arrow /></Link>
      </div>
      <div className="pr-media">
        <button type="button" className="pr-main" onClick={() => onOpen(0)} aria-label={`${pr.open}: ${text.t}`}>
          <img src={img(main)} alt={text.t} loading={i < 1 ? "eager" : "lazy"} decoding="async" />
          <span className="pr-count">{pr.photos(s.photos.length)}</span>
        </button>
        <div className="pr-thumbs">
          {thumbs.map((k, j) => (
            <button type="button" key={k} onClick={() => onOpen(j + 1)} aria-label={`${text.t} ${j + 2}`}>
              <img src={img(k)} alt="" loading="lazy" decoding="async" />
              {j === thumbs.length - 1 && more > 0 && <span className="pr-more">+{more}</span>}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Process() {
  const { t } = useI18n();
  const pr = t.process;
  const projects = useProjects();
  const [openPhotos, lightbox] = useLightbox();
  const refs = useRef([]);
  const [active, pct] = useScrollStage(refs);
  const chips = useRef(null);
  useReveal();

  // Faol bosqich tugmasini paneldagi ko‘rinadigan joyga suradi
  useEffect(() => {
    const box = chips.current;
    const el = box?.children[active];
    if (!box || !el) return;
    const left = el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2;
    box.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  const openStage = (i, at) => {
    const s = STAGES[i];
    const name = projects.find((p) => p.id === s.project)?.t;
    openPhotos(s.photos.map((k) => [k, `${pr.stages[i].t} · ${name}`]), at);
  };
  const go = (i) => (e) => {
    e.preventDefault();
    const el = refs.current[i];
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
  };

  return (
    <>
      <PageTitle title={pr.nav} />

      <section className="pr-hero">
        <div className="ph" style={{ backgroundImage: `url(${img(PROCESS_HERO)})` }} />
        <Watermark />
        <div className="wrap">
          <div className="crumbs"><Link to="/">{t.nav.home}</Link><span>/</span><span>{pr.nav}</span></div>
          <div className="eyebrow">{pr.eyebrow}</div>
          <h1>{pr.title}</h1>
          <p className="lead">{pr.lead}</p>
          <a className="cta amber" href="#bosqich-1" onClick={go(0)}>{pr.start} <Arrow /></a>
          <div className="pr-kv">{pr.kv.map(([b, s]) => <div key={s}><b>{b}</b><span>{s}</span></div>)}</div>
        </div>
      </section>

      <nav className="pr-rail" aria-label={pr.eyebrow}>
        <div className="wrap">
          <div className="pr-chips" ref={chips}>
            {STAGES.map((_, i) => (
              <a key={i} href={`#bosqich-${i + 1}`} onClick={go(i)} className={i === active ? "on" : i < active ? "past" : ""}>
                <span>{pad(i + 1)}</span>{pr.stages[i].t}
              </a>
            ))}
          </div>
        </div>
        <div className="pr-bar"><i style={{ transform: `scaleX(${pct})` }} /></div>
      </nav>

      <section className="pr-list">
        <div className="wrap">
          {STAGES.map((s, i) => (
            <Stage
              key={i}
              s={s}
              i={i}
              n={STAGES.length}
              text={pr.stages[i]}
              project={projects.find((p) => p.id === s.project)}
              onOpen={(at) => openStage(i, at)}
              refCb={(el) => (refs.current[i] = el)}
            />
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={pr.resultEyebrow} title={pr.resultTitle}>{pr.resultText}</SectionHead>
          <div className="pr-ba"><BeforeAfter /></div>
        </div>
      </section>

      <Closing />
      {lightbox}
    </>
  );
}
