// Loyihalarning tildan mustaqil ma’lumotlari: turi, holati, koordinatasi, quvvati, rasmlari.
// Matnlar (nomi, tavsifi, ish hajmi, rasm izohlari) src/i18n/{uz,ru,en}.js fayllarida, `projects[id]` ichida.
// Rasm kalitlari public/images/ dagi fayllarga mos: "f_hero" -> /images/f-hero.webp

export const PROJECTS = [
  { id: "fargona-bess", type: "bess", st: "done", co: "VIVA Construction", reg: "fergana", ll: [70.82, 40.37], cap: 150, img: "f_hero", big: true,
    partner: "Energy China · UET Construction",
    gal: ["f_hero", "f_done1", "f_done2", "f_mnt1", "f_mnt3", "f_col4", "f_reb6", "f_fnd1", "f_geo1", "f_tow", "f_site", "f_done4"] },
  { id: "nurobod", type: "sol", st: "now", co: "OMEGA Energy Group", reg: "samarkand", ll: [66.28, 39.6], cap: 500, img: null,
    partner: "Larsen & Toubro · ACWA Power", start: "2026-01-02", months: 17,
    plans: ["nu_plan", "nu_seq"],
    gal: [] },
  { id: "sazagan", type: "bess", st: "now", co: "OMEGA Energy Group", reg: "samarkand", ll: [66.78, 39.5], cap: 334, img: "s_wide",
    partner: "UET Construction",
    gal: ["s_wide", "s_top", "s_cont", "s_row", "s_field", "s_sub", "s_oru", "s_tr", "s_el1", "s_bld", "s_camp", "s_wall", "s_crane"] },
  { id: "buxoro", type: "sol", st: "done", co: "OMEGA Energy Group", reg: "bukhara", ll: [64.8, 39.5], cap: 500, img: null,
    partner: "Energy China",
    gal: [] },
  { id: "nishon", type: "sol", st: "done", co: "OMEGA Energy Group", reg: "kashkadarya", ll: [65.68, 38.7], cap: 500, img: null,
    partner: "Energy China",
    gal: [] },
  { id: "tolimarjon", type: "th", st: "done", co: "OMEGA Energy Group", reg: "kashkadarya", ll: [65.62, 38.3], cap: 900, img: null,
    partner: "Calik Energy · Mitsubishi Corporation",
    gal: [] },
  { id: "navoiy-ies", type: "th", st: "done", co: "OMEGA Energy Group", reg: "navoi", ll: [65.37, 40.1], cap: 650, img: null,
    partner: "Calik Energy · Mitsubishi Corporation",
    gal: [] },
  { id: "navoiy-gibrid", type: "sol", st: "now", co: "OMEGA Energy Group", reg: "navoi", ll: [64.85, 40.42], cap: 300, img: null,
    partner: "Energy China",
    gal: [] },
];

export const TYPE_COLOR = { sol: "var(--sol)", bess: "var(--bess)", th: "var(--th)" };
export const REGIONS = ["fergana", "samarkand", "bukhara", "kashkadarya", "navoi"];
export const getProject = (id) => PROJECTS.find((p) => p.id === id);
export const totalMW = (type) => PROJECTS.filter((p) => p.type === type).reduce((s, p) => s + p.cap, 0);
