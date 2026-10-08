// Rasm kalitini fayl manziliga aylantiradi: "f_hero" -> "/images/f-hero.webp"
export const img = (key) => `/images/${key.replace(/_/g, "-")}.webp`;
