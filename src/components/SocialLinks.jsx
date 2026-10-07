import { SOCIALS } from "../data/company.js";
import { useI18n } from "../i18n/index.jsx";

// Ijtimoiy tarmoq ikonkalari (24×24, bitta rangda — currentColor)
const ICONS = {
  telegram: (
    <path d="M21.5 4.2 2.9 11.4c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.4-1.5ZM9.7 14l9-5.7c.4-.3.8-.1.5.2l-7.4 6.7-.3 3.2L9.7 14Z" />
  ),
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.6 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 4.9a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.1-9.4a1.2 1.2 0 1 0 0 2.3 1.2 1.2 0 0 0 0-2.3Z" />
  ),
  youtube: (
    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8ZM9.7 15.5v-7l6 3.5-6 3.5Z" />
  ),
  facebook: (
    <path d="M13.5 21.9v-7.7h2.6l.4-3h-3V9.3c0-.9.3-1.5 1.5-1.5h1.6V5.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6v7.7C5.6 21.2 2 17 2 12 2 6.5 6.5 2 12 2s10 4.5 10 10c0 5-3.6 9.2-8.5 9.9Z" />
  ),
};

export function SocialIcon({ id, size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{ICONS[id]}</svg>;
}

const linkProps = (s) => ({ href: s.url, target: "_blank", rel: "noopener noreferrer" });

// Faqat ikonkalar qatori (footer, menyu)
export function SocialIcons({ className = "" }) {
  return (
    <div className={`socials ${className}`}>
      {SOCIALS.map((s) => (
        <a key={s.id} className={`soc soc-${s.id}`} {...linkProps(s)} aria-label={s.name} title={s.name}>
          <SocialIcon id={s.id} />
        </a>
      ))}
    </div>
  );
}

// Nomi va akkaunti bilan katta kartalar (Aloqa sahifasi)
export function SocialCards() {
  const { t } = useI18n();
  return (
    <div className="soc-cards">
      {SOCIALS.map((s) => (
        <a key={s.id} className={`soc-card soc-${s.id}`} {...linkProps(s)}>
          <span className="soc-ic"><SocialIcon id={s.id} size={22} /></span>
          <span className="soc-tx"><b>{s.name}</b><small>{s.handle}</small></span>
          <span className="soc-go">{t.social.open} →</span>
        </a>
      ))}
    </div>
  );
}
