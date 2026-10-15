// Yangiliklar: sana, rasmlar va bog‘liq loyiha. Matnlar src/i18n/{uz,ru,en}.js -> news.items[id]
// Yangi yangilik qo‘shish: shu ro‘yxatning boshiga yozing va uchala tilga matn qo‘shing.
export const NEWS = [
  { id: "bess-launch", date: "2024-12-13", project: "fargona-bess", photos: ["cer_main", "cer_2", "cer_3", "cer_4", "cer_5", "cer_6"], kv: true, featured: true },
  { id: "nurobod-start", date: "2026-01-02", project: "nurobod", photos: ["nu05", "nu07", "nu09"] },
  { id: "contracts", date: "2025-11-28", project: null, photos: ["f_eng1"] },
  { id: "lt-award", date: null, project: "nurobod", photos: ["aw1"] },
  { id: "sazagan", date: null, project: "sazagan", photos: ["sz07", "sz06", "sz04"] },
];

const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  uz: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"],
  ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
};
export function newsDate(iso, lang) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (lang === "en") return `${d} ${MONTHS.en[m - 1]} ${y}`;
  if (lang === "ru") return `${d} ${MONTHS.ru[m - 1]} ${y}`;
  return `${y}-yil ${d}-${MONTHS.uz[m - 1]}`;
}
