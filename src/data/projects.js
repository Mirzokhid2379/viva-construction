// Loyihalarning tildan mustaqil ma’lumotlari: turi, holati, koordinatasi, quvvati, rasmlari.
// Matnlar (nomi, tavsifi, ish hajmi, rasm izohlari) src/i18n/{uz,ru,en}.js fayllarida, `projects[id]` ichida.
// Rasm kalitlari public/images/ dagi fayllarga mos: "f_hero" -> /images/f-hero.webp

export const PROJECTS = [
  { id: "fargona-bess", type: "bess", st: "done", co: "VIVA Construction", reg: "fergana", ll: [70.82, 40.37], cap: 150, img: "f_hero", big: true,
    partner: "Energy China · UET Construction",
    gal: ["f_site", "s_camp", "f_camp", "f_geo1", "f_geo2", "f_dig", "f_exc", "f_reb6", "f_reb1", "f_reb3", "f_fnd1", "f_fnd3", "f_col4", "f_col1", "s_bld", "f_tow", "f_line4", "s_wall", "f_wall1", "s_crane", "f_mnt1", "f_mnt3", "s_sub", "s_tr", "s_el1", "s_oru", "s_row", "s_cont", "s_field", "s_top", "f_done4", "f_done1", "f_hero"] },
  { id: "nurobod", type: "sol", st: "now", co: "OMEGA Energy Group", reg: "samarkand", ll: [66.28, 39.6], cap: 500, img: "xd0530",
    partner: "Larsen & Toubro · ACWA Power", start: "2026-01-02", months: 17,
    plans: ["nu_plan", "nu_seq"],
    gal: ["xd0530", "xd0521", "xd0533", "xd0662", "xd0661", "xd0541", "xd0548", "xd0005"] },
  { id: "sazagan", type: "bess", st: "now", co: "OMEGA Energy Group", reg: "samarkand", ll: [66.78, 39.5], cap: 334, img: "xb44",
    partner: "UET Construction",
    gal: ["xb44", "xb42", "xb45", "xb35", "xb78", "xb63", "xb71", "xb75", "sz_map"] },
  { id: "buxoro", type: "sol", st: "done", co: "OMEGA Energy Group", reg: "bukhara", ll: [64.8, 39.5], cap: 500, img: "xd0506",
    partner: "Energy China",
    gal: ["xd0003", "xd0506", "xd0567"] },
  { id: "nishon", type: "sol", st: "done", co: "OMEGA Energy Group", reg: "kashkadarya", ll: [65.68, 38.7], cap: 500, img: "xd0733",
    partner: "Energy China",
    gal: ["xd0733", "xd0570", "xd0702"] },
  { id: "navoiy-gibrid", type: "sol", st: "done", co: "OMEGA Energy Group", reg: "navoi", ll: [64.85, 40.42], cap: 300, img: null,
    partner: "Energy China",
    gal: [] },
];

export const TYPE_COLOR = { sol: "var(--sol)", bess: "var(--bess)", th: "var(--th)" };
export const REGIONS = ["fergana", "samarkand", "bukhara", "kashkadarya", "navoi"];
export const getProject = (id) => PROJECTS.find((p) => p.id === id);
export const totalMW = (type) => PROJECTS.filter((p) => p.type === type).reduce((s, p) => s + p.cap, 0);
