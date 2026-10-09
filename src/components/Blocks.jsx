// Bir nechta sahifada takrorlanadigan bloklar
import { Link } from "react-router-dom";
import { CERT_CODES, PARTNERS } from "../data/company.js";
import { useI18n } from "../i18n/index.jsx";
import { Watermark } from "./VivaMark.jsx";
import { useLightbox } from "./Lightbox.jsx";

export const Arrow = () => <span className="ar">→</span>;

// Sahifa sarlavhasi (to‘q ko‘k blok, logo naqshi bilan)
export function PageBand({ crumb, title, children }) {
  const { t } = useI18n();
  return (
    <div className="band tex">
      <Watermark />
      <div className="wrap">
        {crumb && (
          <div className="crumbs"><Link to="/">{t.nav.home}</Link><span>/</span><span>{crumb}</span></div>
        )}
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
    </div>
  );
}

export function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="head">
      <div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div>
      {children && <p>{children}</p>}
    </div>
  );
}

export function Closing() {
  const { t } = useI18n();
  return (
    <section className="close tex">
      <Watermark />
      <div className="wrap">
        <h2>{t.closing.title}</h2>
        <div>
          <p>{t.closing.text}</p>
          <Link className="cta amber" to="/aloqa">{t.closing.btn} <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

export function Certificates() {
  const { t } = useI18n();
  const [openPhotos, lightbox] = useLightbox();
  const pages = ["lic_1", "lic_2"].map((k, i) => [k, `${t.trust.docsT} · ${i + 1} ${t.trust.page}`]);
  return (
    <>
    <div className="cert-owner">
      <span className="co-logo"><img src="/images/omega-logo.webp" alt="OMEGA Energy Group" width="520" height="437" loading="lazy" /></span>
      <div><span className="k">{t.trust.ownerK}</span><b>OMEGA Energy Group</b><p>{t.trust.owner}</p></div>
    </div>
    <div className="lic-docs">
      <div className="lic-txt">
        <span className="k">{t.trust.docsK}</span>
        <b>{t.trust.docsT}</b>
        <p>{t.trust.docsP}</p>
        <button type="button" className="cta line sm" onClick={() => openPhotos(pages, 0)}>{t.trust.open}</button>
      </div>
      <div className="lic-pages">
        {pages.map(([k, c], i) => (
          <button type="button" key={k} onClick={() => openPhotos(pages, i)} aria-label={c}>
            <img src={`/images/${k.replace("_", "-")}.webp`} alt={c} loading="lazy" />
            <span>{i + 1} {t.trust.page}</span>
          </button>
        ))}
      </div>
    </div>
    <div className="trust">
      {t.trust.items.map(([name, text, valid], i) => (
        <div className="tr" key={CERT_CODES[i]}>
          <span className="k">{i === 0 ? t.trust.lic : t.trust.cert}</span>
          <b>{name}</b>
          <span>{text}</span>
          <small>{i === 0 ? valid : `${CERT_CODES[i]} · ${valid}`}</small>
        </div>
      ))}
    </div>
    {lightbox}
    </>
  );
}

export function Partners({ label }) {
  const { t } = useI18n();
  return (
    <div className="partners">
      <span className="eyebrow">{label || t.trust.partners}</span>
      {PARTNERS.map((x) => <b key={x}>{x}</b>)}
    </div>
  );
}
