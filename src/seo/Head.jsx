import { useEffect } from "react";
import { useI18n } from "../i18n/index.jsx";

// <head> ichidagi teglarni JSX dan boshqaradi: favicon, rang, tavsif, sarlavha, til.
// index.html da faqat charset va viewport qoladi — ular brauzerga eng boshida kerak.

function setTag(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(create);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

// Butun sayt uchun bir marta: favicon, theme-color, bosh rasmni oldindan yuklash
export function SiteHead() {
  const { t } = useI18n();
  useEffect(() => {
    setTag('link[rel="icon"]', "link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" });
    setTag('link[rel="apple-touch-icon"]', "link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png" });
    setTag('meta[name="theme-color"]', "meta", { name: "theme-color", content: "#132E49" });
    setTag('link[rel="preload"][as="image"]', "link", { rel: "preload", as: "image", href: "/images/f-hero.webp" });
  }, []);
  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    setTag('meta[name="description"]', "meta", { name: "description", content: t.meta.description });
    setTag('meta[property="og:site_name"]', "meta", { property: "og:site_name", content: "VIVA Construction" });
    setTag('meta[property="og:description"]', "meta", { property: "og:description", content: t.meta.description });
    setTag('meta[property="og:image"]', "meta", { property: "og:image", content: "/images/f-hero.webp" });
  }, [t]);
  return null;
}

// Har bir sahifa o‘z sarlavhasini qo‘yadi: <PageTitle title="Loyihalar" />
export function PageTitle({ title }) {
  const { t } = useI18n();
  useEffect(() => {
    const full = title ? `${title} — VIVA Construction` : t.meta.title;
    document.title = full;
    setTag('meta[property="og:title"]', "meta", { property: "og:title", content: full });
  }, [title, t]);
  return null;
}
