import { Link } from "react-router-dom";
import { img } from "./Img.js";
import { useI18n } from "../i18n/index.jsx";
import { useLightbox } from "./Lightbox.jsx";
import { Watermark } from "./VivaMark.jsx";
import { Arrow } from "./Blocks.jsx";
import { NEWS, newsDate } from "../data/news.js";

// Asosiy yangilik: katta blok, rasmlar to‘plami bilan (Farg‘ona BESS ishga tushirilishi)
export function NewsFeature() {
  const { t, lang } = useI18n();
  const n = NEWS.find((x) => x.featured);
  const c = t.news.items[n.id];
  const [openPhotos, lightbox] = useLightbox();
  const photos = n.photos.map((k, i) => [k, t.ceremony.caps[i] || c.title]);
  return (
    <section className="cer tex" id={n.id}>
      <Watermark />
      <div className="wrap">
        <div className="cer-txt">
          <div className="cer-badge"><i />{c.tag} · {newsDate(n.date, lang)}</div>
          <h2>{c.title}</h2>
          <p>{c.text}</p>
          <div className="cer-kv">{t.ceremony.kv.map(([b, s]) => <div key={s}><b>{b}</b><span>{s}</span></div>)}</div>
          <Link className="cta amber" to={`/loyiha/${n.project}`}>{t.ceremony.btn} <Arrow /></Link>
        </div>
        <div className="cer-grid">
          {photos.slice(0, 5).map(([k, cap], i) => (
            <button type="button" key={k} className={i === 0 ? "big" : ""} onClick={() => openPhotos(photos, i)} aria-label={cap}>
              <img src={img(k)} alt={cap} loading="lazy" decoding="async" />
              {i === 0 && <span className="cer-date">{t.ceremony.date}</span>}
              {i === 4 && <span className="pr-more">+{photos.length - 4}</span>}
            </button>
          ))}
        </div>
      </div>
      {lightbox}
    </section>
  );
}

// Yangilik kartasi
export function NewsCard({ n, full = false, onOpen }) {
  const { t, lang } = useI18n();
  const c = t.news.items[n.id];
  return (
    <article className={`nw${full ? " full" : ""}`} id={full ? n.id : undefined}>
      <button type="button" className="nw-im" onClick={onOpen} aria-label={c.title}>
        <img src={img(n.photos[0])} alt={c.title} loading="lazy" decoding="async" />
        <span className="nw-tag">{c.tag}</span>
        {n.photos.length > 1 && <span className="nw-cnt">{n.photos.length} {t.news.photos}</span>}
      </button>
      <div className="nw-tx">
        {n.date && <time dateTime={n.date}>{newsDate(n.date, lang)}</time>}
        <h3>{c.title}</h3>
        <p>{c.text}</p>
        {n.project
          ? <Link className="nw-more" to={`/loyiha/${n.project}`}>{t.news.more} <Arrow /></Link>
          : !full && <Link className="nw-more" to={`/yangiliklar#${n.id}`}>{t.news.all} <Arrow /></Link>}
      </div>
    </article>
  );
}

// Bosh sahifa uchun: 3 ta so‘nggi yangilik
export function NewsTeaser() {
  const { t } = useI18n();
  const [openPhotos, lightbox] = useLightbox();
  const list = NEWS.slice(0, 3);
  return (
    <section className="news-sec">
      <div className="wrap">
        <div className="head">
          <div><div className="eyebrow">{t.news.eyebrow}</div><h2>{t.news.teaserTitle}</h2></div>
          <Link className="cta line" to="/yangiliklar">{t.news.all} <Arrow /></Link>
        </div>
        <div className="nw-grid">
          {list.map((n) => (
            <NewsCard key={n.id} n={n} onOpen={() => openPhotos(n.photos.map((k) => [k, t.news.items[n.id].title]), 0)} />
          ))}
        </div>
      </div>
      {lightbox}
    </section>
  );
}
