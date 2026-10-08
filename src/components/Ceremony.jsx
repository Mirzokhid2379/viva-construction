import { Link } from "react-router-dom";
import { img } from "./Img.js";
import { useI18n } from "../i18n/index.jsx";
import { useLightbox } from "./Lightbox.jsx";
import { Watermark } from "./VivaMark.jsx";
import { Arrow } from "./Blocks.jsx";

// Farg‘ona BESS: Prezident videoselektorida tarmoqqa ulanish marosimi
const PHOTOS = ["cer_main", "cer_2", "cer_3", "cer_4", "cer_5", "cer_6"];

export default function Ceremony() {
  const { t } = useI18n();
  const c = t.ceremony;
  const [openPhotos, lightbox] = useLightbox();
  const photos = PHOTOS.map((k, i) => [k, c.caps[i]]);
  return (
    <section className="cer tex">
      <Watermark />
      <div className="wrap">
        <div className="cer-txt">
          <div className="cer-badge"><i />{c.badge}</div>
          <h2>{c.title}</h2>
          <p>{c.text}</p>
          <div className="cer-kv">{c.kv.map(([b, s]) => <div key={s}><b>{b}</b><span>{s}</span></div>)}</div>
          <Link className="cta amber" to="/loyiha/fargona-bess">{c.btn} <Arrow /></Link>
        </div>
        <div className="cer-grid">
          {photos.slice(0, 5).map(([k, cap], i) => (
            <button type="button" key={k} className={i === 0 ? "big" : ""} onClick={() => openPhotos(photos, i)} aria-label={cap}>
              <img src={img(k)} alt={cap} loading="lazy" decoding="async" />
              {i === 0 && <span className="cer-date">{c.date}</span>}
              {i === 4 && <span className="pr-more">+{photos.length - 4}</span>}
            </button>
          ))}
        </div>
      </div>
      {lightbox}
    </section>
  );
}
