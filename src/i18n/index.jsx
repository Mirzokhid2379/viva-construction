import { createContext, useContext, useEffect, useMemo, useState } from "react";
import uz from "./uz.js";
import ru from "./ru.js";
import en from "./en.js";
import { getProject, PROJECTS } from "../data/projects.js";

export const LANGS = { uz, ru, en };
export const LANG_CODES = ["uz", "ru", "en"];
const KEY = "viva-lang";

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && LANGS[saved]) return saved;
  } catch { /* localStorage yopiq bo‘lishi mumkin */ }
  const nav = (navigator.language || "uz").slice(0, 2);
  return nav === "ru" ? "ru" : nav === "en" ? "en" : "uz";
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  const t = LANGS[lang];

  useEffect(() => {
    try { localStorage.setItem(KEY, lang); } catch { /* e’tiborsiz */ }
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

// Loyiha ma’lumotini joriy tildagi matnlar bilan birlashtiradi
export function localize(p, t) {
  const c = t.projects[p.id];
  return {
    ...p,
    ...c,
    regName: t.regions[p.reg],
    roleName: t.roles[c.role],
    capUnit: t.unit.mw,
    photos: p.gal.map((k, i) => [k, c.gal[i]]),
    planPhotos: p.plans ? p.plans.map((k, i) => [k, c.plans[i]]) : null,
  };
}

export function useProjects() {
  const { t } = useI18n();
  return useMemo(() => PROJECTS.map((p) => localize(p, t)), [t]);
}

export function useProject(id) {
  const { t } = useI18n();
  const p = getProject(id);
  return useMemo(() => (p ? localize(p, t) : null), [p, t]);
}

// Til almashtirgich: UZ · RU · EN
export function LangSwitch({ className = "" }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`langs ${className}`} role="group" aria-label={t.nav.lang}>
      {LANG_CODES.map((c) => (
        // Telefonda faqat faol til ko‘rinadi; uni bosish keyingi tilga o‘tkazadi
        <button key={c} type="button" lang={c} aria-pressed={lang === c}
          onClick={() => setLang(lang === c && matchMedia("(max-width: 440px)").matches ? LANG_CODES[(LANG_CODES.indexOf(c) + 1) % LANG_CODES.length] : c)}>
          {c.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
