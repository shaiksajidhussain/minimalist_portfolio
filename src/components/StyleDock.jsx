import { useEffect, useState } from 'react';

export const useSectionInView = (id, threshold = 0.18) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [id, threshold]);

  return visible;
};

const StyleDock = ({ styles, styleId, onChange, visible, offset = 1 }) => {
  if (!visible) return null;

  return (
    <div
      className={`pointer-events-none fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] ${
        styles.length > 4 ? 'w-[min(96vw,740px)]' : 'w-[min(92vw,520px)]'
      }`}
    >
      <div className="pointer-events-auto rounded-full bg-zinc-950/92 text-white p-1.5 flex items-center gap-1 shadow-[0_16px_40px_rgba(28,25,23,0.28)]">
        {styles.map((style, index) => {
          const active = style.id === styleId;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onChange(style.id)}
              className={`flex-1 rounded-full px-2 sm:px-3 py-2 text-[10px] sm:text-xs tracking-wide transition-colors ${
                active ? 'bg-[#d4af37] text-zinc-950' : 'text-zinc-300 hover:text-white'
              }`}
            >
              <span className="font-mono mr-1">{String(index + offset).padStart(2, '0')}</span>
              <span className="hidden sm:inline">{style.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StyleDock;
