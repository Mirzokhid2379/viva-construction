// Loyihalarning tildan mustaqil ma’lumotlari: turi, holati, koordinatasi, quvvati, rasmlari.
// Matnlar (nomi, tavsifi, ish hajmi, rasm izohlari) src/i18n/{uz,ru,en}.js fayllarida, `projects[id]` ichida.
// Rasm kalitlari public/images/ dagi fayllarga mos: "f_hero" -> /images/f-hero.webp

export const PROJECTS = [
  { id: "fargona-bess", type: "bess", st: "done", co: "VIVA Construction", reg: "fergana", ll: [70.82, 40.37], cap: 150, img: "f_hero", big: true,
    partner: "Energy China · UET Construction",
    gal: ["f_hero", "f_done1", "f_done2", "f_mnt1", "f_mnt3", "f_col4", "f_reb6", "f_fnd1", "f_geo1", "f_tow", "f_site", "f_done4", "s_wide", "s_top", "s_cont", "s_row", "s_field", "s_sub", "s_oru", "s_tr", "s_el1", "s_bld", "s_camp", "s_wall", "s_crane"] },
  { id: "nurobod", type: "sol", st: "now", co: "OMEGA Energy Group", reg: "samarkand", ll: [66.28, 39.6], cap: 500, img: "xd0530",
    partner: "Larsen & Toubro · ACWA Power", start: "2026-01-02", months: 17,
    plans: ["nu_plan", "nu_seq"],
    gal: ["xd0530", "xd0521", "xd0533", "xd0662", "xd0661", "xd0541", "xd0548", "xd0005"] },
  { id: "sazagan", type: "bess", st: "now", co: "OMEGA Energy Group", reg: "samarkand", ll: [66.78, 39.5], cap: 334, img: "xb44",
    partner: "UET Construction",
    gal: ["xb44", "xb42", "xb45", "xb35", "xb78", "xb63", "xb71", "xb75", "sz_map"] },
  { id: "buxoro", type: "sol", st: "done", co: "OMEGA Energy Group", reg: "bukhara", ll: [64.8, 39.5], cap: 500, img: "xd0506",
    partner: "Energy China",
    gal: ["xd0506", "xd0003", "xd0567"] },
  { id: "nishon", type: "sol", st: "done", co: "OMEGA Energy Group", reg: "kashkadarya", ll: [65.68, 38.7], cap: 500, img: "xd0733",
    partner: "Energy China",
    gal: ["xd0733", "xd0570", "xd0702"] },
  { id: "tolimarjon", type: "th", st: "done", co: "OMEGA Energy Group", reg: "kashkadarya", ll: [65.62, 38.3], cap: 900, img: "tm1",
    partner: "Calik Energy · Mitsubishi Corporation",
    gal: ["tm1", "tm2", "tm3", "tm4", "tm5", "tm6", "tm7", "tm8"] },
  { id: "navoiy-ies", type: "th", st: "done", co: "OMEGA Energy Group", reg: "navoi", ll: [65.37, 40.1], cap: 650, img: "xt52",
    partner: "Calik Energy · Mitsubishi Corporation",
    gal: ["xt52", "xt9", "xt13", "xt31", "xt32", "xt46"] },
  { id: "navoiy-gibrid", type: "sol", st: "now", co: "OMEGA Energy Group", reg: "navoi", ll: [64.85, 40.42], cap: 300, img: "xd0679",
    partner: "Energy China",
    gal: ["xd0679", "xd0508", "xd0001"] },
];

export const TYPE_COLOR = { sol: "var(--sol)", bess: "var(--bess)", th: "var(--th)" };
export const REGIONS = ["fergana", "samarkand", "bukhara", "kashkadarya", "navoi"];
export const getProject = (id) => PROJECTS.find((p) => p.id === id);
export const totalMW = (type) => PROJECTS.filter((p) => p.type === type).reduce((s, p) => s + p.cap, 0);
