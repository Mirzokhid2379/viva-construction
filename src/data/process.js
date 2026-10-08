// "Qurilish jarayoni" sahifasi: bosqichlar va ularning rasmlari.
// Matnlar src/i18n/{uz,ru,en}.js da, `process.stages[i]` ichida (shu tartibda).
// project — rasm qaysi loyihadan ekani (loyiha sahifasiga havola uchun).
export const STAGES = [
  { project: "fargona-bess", photos: ["f_site", "f_camp", "f_shed", "f_base", "f_pad"] },
  { project: "fargona-bess", photos: ["f_team", "f_geo1", "f_geo2", "f_dig", "f_exc"] },
  { project: "fargona-bess", photos: ["f_reb6", "f_reb1", "f_reb2", "f_reb3", "f_reb4", "f_reb5"] },
  { project: "fargona-bess", photos: ["f_fnd1", "f_fnd2", "f_fnd3", "f_fnd4", "f_fnd5"] },
  { project: "fargona-bess", photos: ["f_col4", "f_col1", "f_col2", "f_col3"] },
  // Alohida, katta ko‘rinishdagi bosqich (wide): YuK liniyasi va po‘lat minoralar
  { project: "fargona-bess", wide: true, photos: ["f_line4", "f_line7", "f_line6", "f_line5"] },
  // Obyekt infratuzilmasi: devor, nazorat binosi, omborxona, suv hovuzlari, kanalizatsiya
  { project: "fargona-bess", photos: ["f_wall1", "w_brick", "w_fnd", "f_wall3", "w_sub", "w_plas", "w_inner", "w_bld", "s_bld"] },
  { project: "fargona-bess", photos: ["f_mnt1", "f_mnt2", "f_mnt3", "f_mnt4", "f_mnt5"] },
  { project: "fargona-bess", photos: ["s_tr", "s_el3", "s_el1", "s_el2", "s_el4", "s_oru"] },
  { project: "fargona-bess", photos: ["cer_main", "f_hero", "f_ctrl", "f_panels", "f_elec1", "f_elec2", "f_done1", "cer_3"] },
];

export const PROCESS_HERO = "f_reb6";
