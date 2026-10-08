import { useState } from "react";
import { img } from "./Img.js";
import { useI18n } from "../i18n/index.jsx";

// "Oldin va keyin" — chiziqni surib solishtirish
export default function BeforeAfter() {
  const { t } = useI18n();
  const [x, setX] = useState(50);
  return (
    <div className="cmp" style={{ "--x": `${x}%` }}>
      <div className="a" style={{ backgroundImage: `url(${img("v_start")})` }} />
      <div className="b" style={{ backgroundImage: `url(${img("f_hero")})` }} />
      <span className="lab" style={{ left: 14 }}>{t.feat.before}</span>
      <span className="lab" style={{ right: 14 }}>{t.feat.after}</span>
      <div className="h" />
      <input type="range" min="0" max="100" value={x} onChange={(e) => setX(e.target.value)} aria-label={t.feat.aria} />
    </div>
  );
}

