import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageTitle } from "../seo/Head.jsx";
import { useI18n } from "../i18n/index.jsx";
import { PageBand, Closing } from "../components/Blocks.jsx";
import { useLightbox } from "../components/Lightbox.jsx";
import { NewsCard, NewsFeature } from "../components/News.jsx";
import { NEWS } from "../data/news.js";

export default function News() {
  const { t } = useI18n();
  const { hash } = useLocation();
  const [openPhotos, lightbox] = useLightbox();
  useEffect(() => {
    if (!hash) return;
    const id = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90 });
    }, 150);
    return () => clearTimeout(id);
  }, [hash]);
  return (
    <>
      <PageTitle title={t.news.title} />
      <PageBand crumb={t.news.eyebrow} title={t.news.title}>{t.news.lead}</PageBand>
      <NewsFeature />
      <section>
        <div className="wrap nw-list">
          {NEWS.filter((x) => !x.featured).map((n) => (
            <NewsCard key={n.id} n={n} full onOpen={() => openPhotos(n.photos.map((k) => [k, t.news.items[n.id].title]), 0)} />
          ))}
        </div>
      </section>
      <Closing />
      {lightbox}
    </>
  );
}
