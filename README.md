# VIVA Construction — sayt (React + Vite)

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tayyor sayt dist/ papkasiga tushadi
```

## Tuzilma

```
src/
  main.jsx               — kirish nuqtasi, BrowserRouter
  App.jsx                — marshrutlar (sahifalar lazy yuklanadi)
  pages/
    Home.jsx             — bosh sahifa: hero, raqamlar, xarita, loyihalar, oldin/keyin, ish tartibi, sertifikatlar
    Projects.jsx         — /loyihalar
    ProjectDetail.jsx    — /loyiha/:id (har bir stansiya sahifasi)
    Company.jsx          — /kompaniya
    Contact.jsx          — /aloqa (forma)
    NotFound.jsx         — 404
  components/
    Header.jsx, Footer.jsx
    VivaMark.jsx         — logo (nuqtali X) va fondagi katta naqsh
    UzMap.jsx            — O‘zbekiston xaritasi, kichik xarita
    ProjectCard.jsx      — loyiha kartasi va saralash
    Lightbox.jsx         — fotosuratni kattalashtirish
    Blocks.jsx           — umumiy bloklar (sarlavha, sertifikatlar, hamkorlar…)
    Img.js               — rasm kaliti -> /images/*.webp
  i18n/
    index.jsx            — til konteksti, useI18n(), useProjects(), LangSwitch
    uz.js, ru.js, en.js  — barcha matnlar (interfeys + loyihalar + kompaniya)
  data/
    projects.js          — 8 ta loyiha: turi, holati, koordinata, quvvat, rasmlar
    company.js           — texnika soni, shartnoma sanalari, sertifikat raqamlari, kontaktlar
    geo.js               — xarita chegaralari
  styles/global.css      — barcha stillar, ranglar :root da
public/images/           — 70 ta fotosurat, WebP
```

## Tillar

Sayt o‘zbek, rus va ingliz tillarida. Til headerdagi UZ · RU · EN tugmasi bilan almashadi va brauzerda eslab qolinadi; birinchi kirishda brauzer tili bo‘yicha tanlanadi.
Matnni o‘zgartirish uchun `src/i18n/` dagi tegishli faylni tahrirlang — uchala faylda kalitlar bir xil bo‘lishi kerak.

## Tahrirlash

- Yangi loyiha: `src/data/projects.js` ga obyekt qo‘shing, uning matnlarini `src/i18n/uz.js`, `ru.js`, `en.js` dagi `projects` ichiga yozing, rasmlarni `public/images/` ga `.webp` qilib qo‘ying.
- Kontaktlar: `src/data/company.js` → `CONTACTS` (telefon, pochta), manzillar esa til fayllarida.
- Ranglar: `src/styles/global.css` boshidagi `:root`.
- Forma hozircha hech qayerga yubormaydi: `src/pages/Contact.jsx` dagi `TODO` joyiga backend yoki Telegram botni ulang.

## index.html haqida

`index.html` da faqat `charset`, `viewport` va `<div id="root">` qoldi — Vite uchun bu fayl majburiy.
Qolgan hamma narsa JSX da:
- favicon, theme-color, tavsif, og-teglar — `src/seo/Head.jsx` (`SiteHead`)
- har bir sahifa sarlavhasi — `<PageTitle title="..." />` sahifa ichida
- shriftlar — `src/styles/global.css` boshidagi `@import`

## Domen va hostingga joylash

Avval build qiling:

```bash
npm install
npm run build
```

`dist/` papkasidagi **hamma narsani** (yashirin `.htaccess` ham) hostingga yuklang.

- **cPanel / oddiy hosting (Apache):** `dist/` ichidagilarni `public_html/` ga yuklang. `.htaccess` tayyor — `/loyihalar`, `/loyiha/nurobod` kabi manzillar sahifani yangilaganda ham ishlaydi.
- **VPS (nginx):** `deploy/nginx.conf` namunasidan foydalaning, domen va yo‘lni almashtiring. HTTPS uchun: `sudo certbot --nginx -d domeningiz.uz`.
- **Netlify / Vercel:** GitHub’ga joylab ulang. Netlify uchun `netlify.toml` tayyor.

Domen: domen sozlamalarida `A` yozuvini hosting IP manziliga yo‘naltiring (hosting provayderingiz IP ni beradi).
