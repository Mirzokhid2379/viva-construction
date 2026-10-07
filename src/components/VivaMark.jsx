// VIVA logotipi: nuqtali X. Nuqtalar markazdan chetga qarab kichrayadi.
// Logo vektor qilib chizilgan, shuning uchun har qanday o‘lchamda tiniq.

export function dotPositions(cx = 50, cy = 50, step = 7.2) {
  const dots = [];
  for (let i = -6; i <= 6; i++) {
    for (let j = -6; j <= 6; j++) {
      if ((i + j) % 2) continue;
      if (Math.min(Math.abs(i - j), Math.abs(i + j)) > 2) continue;
      const d = Math.hypot(i, j);
      const r = step * (0.86 - 0.105 * d);
      if (r < step * 0.2) continue;
      dots.push({ x: cx + i * step, y: cy + j * step, r, d });
    }
  }
  return dots;
}

const DOTS = dotPositions();

export default function VivaMark({ size = 34, background = "#132E49" }) {
  return (
    <svg className="vmark" width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      {background && <rect width="100" height="100" rx="16" fill={background} />}
      <g fill="#DDE4EC">
        {DOTS.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} />
        ))}
      </g>
    </svg>
  );
}

// Fon uchun katta nuqtali X (saytning "ko‘ylagi"). Nuqtalar markazdan tashqariga qarab paydo bo‘ladi.
export function Watermark() {
  return (
    <div className="xw" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <g fill="#DDE4EC">
          {DOTS.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={p.r} style={{ animationDelay: `${p.d * 7.2 * 14}ms` }} />
          ))}
        </g>
      </svg>
    </div>
  );
}
