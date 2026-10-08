import { img } from "./Img.js";

// Stansiya turi belgisi (rasm yo‘q bo‘lganda muqovada chiqadi)
function TypeIcon({ type }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "sol")
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" {...p}>
        <circle cx="24" cy="15" r="5" />
        <path d="M24 5v2M24 23v2M14 15h2M32 15h2M17 8l1.4 1.4M29.6 20.6 31 22M17 22l1.4-1.4M29.6 9.4 31 8" />
        <path d="M8 43l5-14h22l5 14z" /><path d="M10.5 36h27M20 29l-2 14M28 29l2 14" />
      </svg>
    );
  if (type === "bess")
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" {...p}>
        <rect x="8" y="14" width="30" height="22" rx="3" /><path d="M38 21h3v8h-3" />
        <path d="M24.5 18.5 19 26h6l-1.5 6 5.5-7.5h-6z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...p}>
      <path d="M6 42h36M9 42V26l9 5v-5l9 5v-5l9 5V14h5v28" /><path d="M36 14l1-8h3l1 8" />
      <path d="M38.5 4c1.5-1.5 3.5-1.5 5 0" />
    </svg>
  );
}

// Fon rasmi bor bo‘lsa — rasm, yo‘q bo‘lsa — brend uslubidagi muqova (tur rangi + nuqtalar + belgi)
export default function Cover({ k, type, className = "", style, children }) {
  if (k) return <div className={className} style={{ ...style, backgroundImage: `url(${img(k)})` }}>{children}</div>;
  return (
    <div className={`${className} nophoto t-${type}`} style={style}>
      <span className="np-ic"><TypeIcon type={type} /></span>
      {children}
    </div>
  );
}
