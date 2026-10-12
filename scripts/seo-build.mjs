// Build’dan keyin ishlaydi (npm run build): har bir sahifa uchun alohida HTML yaratadi
// (to‘g‘ri sarlavha va tavsif bilan), sitemap.xml va robots.txt ni yozadi.
// Shunda Google, Yandex, Telegram va Facebook har bir sahifani to‘g‘ri ko‘radi.
import fs from "node:fs";
import path from "node:path";
import { SITE_URL } from "../site.config.js";
import { PAGES, projectMeta } from "../src/seo/meta.js";
import { PROJECTS } from "../src/data/projects.js";
import uz from "../src/i18n/uz.js";

const DIST = path.resolve("dist");
const today = new Date().toISOString().slice(0, 10);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

let base = fs.readFileSync(path.join(DIST, "index.html"), "utf8").replaceAll("https://viva-site.placeholder", SITE_URL);
fs.writeFileSync(path.join(DIST, "index.html"), base);

const routes = Object.entries(PAGES.uz).map(([p, [title, desc]]) => ({ p, title, desc, pr: p === "/" ? "1.0" : "0.8" }));
for (const pr of PROJECTS) {
  const [title, desc] = projectMeta({ ...pr, ...uz.projects[pr.id] });
  routes.push({ p: `/loyiha/${pr.id}`, title, desc, pr: "0.7", img: pr.img });
}

const setMeta = (html, attr, key, val) =>
  html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), `$1${esc(val)}$2`);

for (const r of routes) {
  if (r.p === "/") continue;
  const url = SITE_URL + r.p;
  let h = base
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  h = setMeta(h, "name", "description", r.desc);
  h = setMeta(h, "property", "og:title", r.title);
  h = setMeta(h, "property", "og:description", r.desc);
  h = setMeta(h, "property", "og:url", url);
  h = setMeta(h, "name", "twitter:title", r.title);
  h = setMeta(h, "name", "twitter:description", r.desc);
  if (r.img) {
    const im = `${SITE_URL}/images/${r.img.replace(/_/g, "-")}.webp`;
    h = setMeta(h, "property", "og:image", im);
    h = setMeta(h, "name", "twitter:image", im);
  }
  h = h.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript><h1>${esc(r.title)}</h1><p>${esc(r.desc)}</p></noscript>`);
  const dir = path.join(DIST, r.p);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), h);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE_URL}${r.p}</loc><lastmod>${today}</lastmod><priority>${r.pr}</priority></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`SEO: ${routes.length} ta sahifa, sitemap.xml, robots.txt → ${SITE_URL}`);
