import { useEffect, useRef, useState } from 'react';
import { MARKS, THEMES, useLook } from '../look';

const ThemeMenu = () => {
  const { theme, mark, setTheme, setMark } = useLook();
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const active = THEMES.find((item) => item.id === theme) || THEMES[0];

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
    <div className="theme-menu" ref={root}>
      <button
        type="button"
        className="theme-trigger"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
      >
        <i style={{ background: active.swatch }} />
        Theme
      </button>
      {open ? (
        <div className="theme-panel" role="dialog" aria-label="Theme and graphic" data-lenis-prevent>
          <p>Colour</p>
          <div className="theme-options">
            {THEMES.filter((item) => item.kind !== 'gradient').map((item) => (
              <button
                key={item.id}
                type="button"
                className="theme-option"
                aria-pressed={item.id === theme}
                onClick={() => setTheme(item.id)}
              >
                <i style={{ background: item.swatch }} />
                {item.name}
              </button>
            ))}
          </div>
          <p>Gradient</p>
          <div className="theme-options">
            {THEMES.filter((item) => item.kind === 'gradient').map((item) => (
              <button
                key={item.id}
                type="button"
                className="theme-option"
                aria-pressed={item.id === theme}
                onClick={() => setTheme(item.id)}
              >
                <i style={{ background: item.swatch }} />
                {item.name}
              </button>
            ))}
          </div>
          <p>Graphic</p>
          <div className="theme-options">
            {MARKS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="theme-option"
                aria-pressed={item.id === mark}
                onClick={() => setMark(item.id)}
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

export default ThemeMenu;
