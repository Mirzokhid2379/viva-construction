// Bir nechta sahifada takrorlanadigan bloklar
import { Link } from "react-router-dom";
import { CERT_CODES, PARTNERS } from "../data/company.js";
import { useI18n } from "../i18n/index.jsx";
import { Watermark } from "./VivaMark.jsx";

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
  return (
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
