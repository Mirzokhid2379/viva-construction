import { useEffect, useState } from "react";
import { PageTitle } from "../seo/Head.jsx";
import { Link, useLocation } from "react-router-dom";
import { PROJECTS, totalMW } from "../data/projects.js";
import { STEPS } from "../data/company.js";
import { useI18n } from "../i18n/index.jsx";
import { img } from "../components/Img.js";
import { Watermark } from "../components/VivaMark.jsx";
import MapSection from "../components/UzMap.jsx";
import { ProjectGrid } from "../components/ProjectCard.jsx";
import { Arrow, Certificates, Closing, Partners, SectionHead } from "../components/Blocks.jsx";
import BeforeAfter from "../components/BeforeAfter.jsx";

const fmt = (n, lang) => Math.round(n).toLocaleString(lang === "en" ? "en-US" : "ru-RU").replace(/ /g, " ");

function Hero() {
  const { t } = useI18n();
  const h = t.hero;
  return (
    <section className="hero">
      <div className="ph" style={{ backgroundImage: `url(${img("f_hero")})` }} />
      <Watermark />
      <div className="wrap">
        <div className="eyebrow hb">{h.eyebrow.map((x) => <span key={x}>{x}</span>)}</div>
        <h1>{h.h1[0]}<em>{h.h1[1]}</em>{h.h1[2]}</h1>
        <p className="lead">{h.lead}</p>
        <div className="acts">
          <Link className="cta amber" to="/xarita">{h.btnMap} <Arrow /></Link>
          <Link className="cta line" to="/aloqa">{h.btnContact}</Link>
        </div>
        <Link className="cap" to="/loyiha/fargona-bess"><b>{h.capTitle}</b>{h.capText}</Link>
      </div>
    </section>
  );
}

function Figures() {
  const { t, lang } = useI18n();
  const now = PROJECTS.filter((p) => p.st === "now").length;
  const u = t.unit.mw;
  return (
    <div className="figs tex">
      <div className="wrap">
        <div className="fig"><b className="num">{PROJECTS.length}</b><span>{t.figs.stations(PROJECTS.length, now)}</span></div>
        <div className="fig"><b className="num">{fmt(totalMW("sol"), lang)}<small>{u}</small></b><span>{t.figs.solar}</span></div>
        <div className="fig"><b className="num">{fmt(totalMW("th"), lang)}<small>{u}</small></b><span>{t.figs.thermal}</span></div>
        <div className="fig"><b className="num">{fmt(totalMW("bess"), lang)}<small>{u}</small></b><span>{t.figs.storage}</span></div>
        <div className="fig"><b className="num">500<small>+</small></b><span>{t.figs.staff}</span></div>
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  // /xarita manzili bosh sahifani ochib, xaritaga tushiradi
  useEffect(() => {
    if (pathname === "/xarita") {
      requestAnimationFrame(() => {
        const m = document.getElementById("map");
        if (m) window.scrollTo({ top: m.getBoundingClientRect().top + window.scrollY - 68 });
      });
    }
  }, [pathname]);

  return (
    <>
      <PageTitle />
      <Hero />
      <Figures />
      <MapSection />

      <section>
        <div className="wrap">
          <SectionHead eyebrow={t.projectsSec.eyebrow} title={t.projectsSec.title}>{t.projectsSec.text}</SectionHead>
          <ProjectGrid />
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="feat">
            <BeforeAfter />
            <div>
              <div className="eyebrow">{t.feat.eyebrow}</div>
              <h2 style={{ marginTop: 12 }}>{t.feat.title}</h2>
              <p className="q">{t.feat.quote}</p>
              <div className="kv">{t.feat.kv.map(([b, s]) => <div key={s}><b>{b}</b><span>{s}</span></div>)}</div>
              <Link className="cta line" to="/loyiha/fargona-bess">{t.feat.btn} <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={t.steps.eyebrow} title={t.steps.title}>{t.steps.text}</SectionHead>
          <div className="proc">
            {STEPS.map((k, i) => (
              <div className="step" key={k}>
                <div className="im" style={{ backgroundImage: `url(${img(k)})` }} />
                <b>{t.steps.items[i][0]}</b>
                <p>{t.steps.items[i][1]}</p>
              </div>
            ))}
          </div>
          <div className="steps-more"><Link className="cta amber" to="/jarayon">{t.process.teaserBtn} <Arrow /></Link></div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={t.trust.eyebrow} title={t.trust.title}>{t.trust.text}</SectionHead>
          <Certificates />
          <Partners />
        </div>
      </section>

      <Closing />
    </>
  );
}
