// Rasm kalitini fayl manziliga aylantiradi: "v_aerial" -> "/images/v-aerial.webp"
export const img = (key) => `/images/${key.replace(/_/g, "-")}.webp`;
