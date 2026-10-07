import { useEffect, useRef, useState } from "react";
import { img } from "./Img.js";
import { useI18n } from "../i18n/index.jsx";

// Fotosuratni to‘liq ekranda ochadi. photos: [["kalit","izoh"], ...]
export default function Lightbox({ photos, index, onClose }) {
  const { t } = useI18n();
  const ref = useRef(null);
  const [i, setI] = useState(index ?? 0);

  useEffect(() => {
    if (index == null) return;
    setI(index);
    if (!ref.current.open) ref.current.showModal();
  }, [index, photos]);

  const n = photos?.length || 0;
  const move = (d) => setI((x) => (x + d + n) % n);

  if (!photos) return <dialog className="lb" ref={ref} />;
  const [key, caption] = photos[i] || photos[0];
  return (
    <dialog
      className="lb"
      ref={ref}
      aria-label={t.lightbox.label}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") move(1);
        if (e.key === "ArrowLeft") move(-1);
      }}
    >
      <img src={img(key)} alt={caption} />
      <div className="c">{caption} · {i + 1} / {n}</div>
      {n > 1 && (
        <>
          <button className="nv" style={{ left: 16 }} type="button" aria-label={t.lightbox.prev} onClick={() => move(-1)}>‹</button>
          <button className="nv" style={{ right: 16 }} type="button" aria-label={t.lightbox.next} onClick={() => move(1)}>›</button>
        </>
      )}
      <button className="xx" type="button" aria-label={t.lightbox.close} onClick={() => ref.current.close()}>×</button>
    </dialog>
  );
}

// Qulay ishlatish uchun hook
export function useLightbox() {
  const [state, setState] = useState({ photos: null, index: null });
  const open = (photos, index = 0) => setState({ photos, index });
  const close = () => setState((s) => ({ ...s, index: null }));
  const node = <Lightbox photos={state.photos} index={state.index} onClose={close} />;
  return [open, node];
}
