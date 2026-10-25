import { useEffect, useRef, useState } from 'react';
import { FONTS, useLook } from '../look';

const FontMenu = () => {
  const { font, setFont } = useLook();
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const active = FONTS.find((item) => item.id === font) || FONTS[0];

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="theme-menu font-menu" ref={root}>
      <button
        type="button"
        className="theme-trigger font-trigger"
        style={{ fontFamily: `${active.family}, ${active.fallback}` }}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
      >
        {active.name}
      </button>
      {open ? (
        <div className="theme-panel font-panel" role="dialog" aria-label="Typeface" data-lenis-prevent>
          <p>Typeface</p>
          <div className="font-options">
            {FONTS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="theme-option font-option"
                style={{ fontFamily: `${item.family}, ${item.fallback}` }}
                aria-pressed={item.id === font}
                onClick={() => setFont(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FontMenu;
