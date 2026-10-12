import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../i18n/index.jsx";
import { SITE_URL } from "../../site.config.js";
import { KEYWORDS, PAGES } from "./meta.js";

// <head> teglarini JSX dan boshqaradi. Asosiy (statik) teglar index.html da ham bor —
// JavaScript ishlatmaydigan botlar (Telegram, Facebook preview) ularni o‘qiydi.

const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const LOCALE = { uz: "uz_UZ", ru: "ru_RU", en: "en_US" };

function setTag(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(create);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}
const meta = (name, content) => setTag(`meta[name="${name}"]`, "meta", { name, content });
const prop = (property, content) => setTag(`meta[property="${property}"]`, "meta", { property, content });

// Butun sayt uchun: favicon, til, kalit so‘zlar
export function SiteHead() {
  const { t, lang } = useI18n();
  useEffect(() => {
    setTag('link[rel="preload"][as="image"]', "link", { rel: "preload", as: "image", href: "/images/f-hero.webp" });
  }, []);
  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    meta("keywords", KEYWORDS[lang]);
    prop("og:locale", LOCALE[lang]);
  }, [t, lang]);
  return null;
}

// Har bir sahifa: <PageTitle title="..." description="..." />
// title/description berilmasa, manzil bo‘yicha meta.js dagi matn olinadi.
export function PageTitle({ title, full: fullTitle, description, noindex = false }) {
  const { t, lang } = useI18n();
  const { pathname: raw } = useLocation();
  const pathname = raw.length > 1 ? raw.replace(/\/+$/, "") : raw;
  useEffect(() => {
    const page = PAGES[lang][pathname];
    const full = fullTitle || (page ? page[0] : title ? `${title} — VIVA Construction` : t.meta.title);
    const desc = description || (page ? page[1] : t.meta.description);
    const url = SITE_URL + (pathname === "/" ? "/" : pathname);
    document.title = full;
    meta("description", desc);
    meta("robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setTag('link[rel="canonical"]', "link", { rel: "canonical", href: url });
    prop("og:type", "website");
    prop("og:title", full);
    prop("og:description", desc);
    prop("og:url", url);
    prop("og:image", OG_IMAGE);
    meta("twitter:card", "summary_large_image");
    meta("twitter:title", full);
    meta("twitter:description", desc);
    meta("twitter:image", OG_IMAGE);
  }, [title, fullTitle, description, noindex, t, lang, pathname]);
  return null;
}
