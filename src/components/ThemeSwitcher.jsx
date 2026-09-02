import { useEffect, useRef, useState } from 'react';
import { FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = ({ className = '' }) => {
  const { colorTheme, changeColorTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--ink)]"
        aria-expanded={open}
        aria-label={`Theme: ${themes[colorTheme].name}`}
        title={`${themes[colorTheme].name} — pick a palette`}
      >
        <span
          className="absolute h-2 w-2 rounded-full"
          style={{ backgroundColor: themes[colorTheme].swatch, top: 5, right: 5 }}
        />
        <FiSun size={14} />
      </button>

      {open ? (
        <div className="absolute right-0 top-10 z-50 grid min-w-[220px] grid-cols-3 gap-2 rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-2.5 shadow-[0_12px_32px_rgba(28,25,23,0.12)]">
          {Object.entries(themes).map(([id, theme]) => {
            const active = id === colorTheme;
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  changeColorTheme(id);
                  setOpen(false);
                }}
                className={`flex flex-col items-center gap-1.5 rounded-xl px-1 py-1.5 ${
                  active ? 'bg-[var(--line)]' : 'hover:bg-[var(--line)]'
                }`}
                title={theme.name}
                aria-label={theme.name}
              >
                <span
                  className={`h-6 w-6 rounded-full border-2 shadow-[0_0_0_1px_rgba(255,255,255,0.45)] ${
                    active ? 'border-[var(--ink)]' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: theme.swatch }}
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink)]">
                  {theme.name}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ThemeSwitcher;
