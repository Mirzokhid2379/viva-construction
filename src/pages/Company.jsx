import { CONTRACT_DATES, FLEET, SITE_LIFE } from "../data/company.js";
import { PageTitle } from "../seo/Head.jsx";
import { useI18n } from "../i18n/index.jsx";
import { img } from "../components/Img.js";
import { useLightbox } from "../components/Lightbox.jsx";
import { Certificates, Closing, PageBand, Partners, SectionHead } from "../components/Blocks.jsx";

export default function Company() {
  const { t } = useI18n();
  const c = t.company;
  const [openPhotos, lightbox] = useLightbox();
  return (
    <>
      <PageTitle title={t.nav.company} />
      <PageBand crumb={t.nav.company} title={c.title}>{c.lead}</PageBand>

      <section>
        <div className="wrap">
          <SectionHead eyebrow={c.teamEyebrow} title={c.teamTitle}>{c.teamText}</SectionHead>
          <div className="team">{c.team.map(([n, r]) => <div key={n}><b>{n}</b><span>{r}</span></div>)}</div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={c.fleetEyebrow} title={c.fleetTitle}>{c.fleetText}</SectionHead>
          <div className="fleet">{FLEET.map((n, i) => <div key={i}><b className="num">{n}</b><span>{c.fleet[i]}</span></div>)}</div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={c.lifeEyebrow} title={c.lifeTitle}>{c.lifeText}</SectionHead>
          <div className="life">
            {SITE_LIFE.map((keys, i) => {
              const item = c.life[i];
              const photos = keys.map((k, j) => [k, item.captions[j]]);
              return (
                <button type="button" key={keys[0]} onClick={() => openPhotos(photos, 0)}>
                  <div className="im" style={{ backgroundImage: `url(${img(keys[0])})` }}><span>{c.photos(keys.length)}</span></div>
                  <b>{item.title}</b>
                  <p>{item.text}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={c.docsEyebrow} title={c.docsTitle}>{c.docsText}</SectionHead>
          <Certificates />
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={c.contrEyebrow} title={c.contrTitle}>{c.contrText}</SectionHead>
          <ul className="contracts">
            {CONTRACT_DATES.map((date, i) => {
              const [title, place, side] = c.contracts[i];
              return <li key={date}><time className="num">{date}</time><div><b>{title}</b><br /><span>{place}</span></div><span>{side}</span></li>;
            })}
          </ul>
          <Partners label={c.partners} />
        </div>
      </section>

      <Closing />
      {lightbox}
    </>
  );
}
