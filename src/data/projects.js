// Loyihalarning tildan mustaqil ma’lumotlari: turi, holati, koordinatasi, quvvati, rasmlari.
// Matnlar (nomi, tavsifi, ish hajmi, rasm izohlari) src/i18n/{uz,ru,en}.js fayllarida, `projects[id]` ichida.
// Rasm kalitlari public/images/ dagi fayllarga mos: "f_hero" -> /images/f-hero.webp

export const PROJECTS = [
  { id: "fargona-bess", type: "bess", st: "done", co: "VIVA Construction", reg: "fergana", ll: [70.82, 40.37], cap: 150, img: "f_hero", big: true,
    partner: "Energy China · UET Construction",
    gal: ["f_site", "s_camp", "ew2", "ew1", "f_geo1", "f_reb6", "f_reb3", "f_fnd1", "f_col4", "s_bld", "f_tow", "f_line4", "f_wall1", "f_mnt1", "f_mnt3", "s_tr", "s_oru", "s_field", "s_top", "f_hero"] },
  { id: "nurobod", type: "sol", st: "now", co: "OMEGA Energy Group", reg: "samarkand", ll: [66.28, 39.6], cap: 500, img: "nu09",
    partner: "Larsen & Toubro · ACWA Power", start: "2026-01-02", months: 17,
    plans: ["nu_plan"],
    gal: ["nu01", "nu02", "nu03", "nu04", "nu05", "nu06", "nu07", "nu08", "nu09", "nu10", "nu11", "nu12", "nu13"] },
  { id: "sazagan", type: "bess", st: "now", co: "OMEGA Energy Group", reg: "samarkand", ll: [66.78, 39.5], cap: 334, img: "sz07",
    partner: "UET Construction",
    plans: ["nu_seq"],
    gal: ["sz01", "sz02", "sz03", "sz04", "sz05", "sz06", "sz07", "sz08", "sz09", "sz10", "sz11", "sz12", "sz13", "sz14"] },
  { id: "buxoro", type: "sol", st: "done", co: "OMEGA Energy Group", reg: "bukhara", ll: [64.8, 39.5], cap: 500, img: "bx12",
    partner: "Energy China",
    gal: ["bx01", "bx02", "bx03", "bx04", "bx05", "bx06", "bx07", "bx08", "bx09", "bx10", "bx11", "bx12"] },
  { id: "nishon", type: "sol", st: "done", co: "OMEGA Energy Group", reg: "kashkadarya", ll: [65.68, 38.7], cap: 500, img: "qq08",
    partner: "Energy China",
    gal: ["qq01", "qq02", "qq03", "qq04", "qq05", "qq06", "qq07", "qq08"] },
  { id: "navoiy-gibrid", type: "sol", st: "done", co: "OMEGA Energy Group", reg: "navoi", ll: [64.85, 40.42], cap: 300, img: "ng1",
    partner: "Energy China",
    gal: ["ng1", "ng2", "ng3", "ng4"] },
];

export const TYPE_COLOR = { sol: "var(--sol)", bess: "var(--bess)", th: "var(--th)" };
export const REGIONS = ["fergana", "samarkand", "bukhara", "kashkadarya", "navoi"];
export const getProject = (id) => PROJECTS.find((p) => p.id === id);
export const totalMW = (type) => PROJECTS.filter((p) => p.type === type).reduce((s, p) => s + p.cap, 0);
