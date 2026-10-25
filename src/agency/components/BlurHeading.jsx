import { useEffect, useRef, useState } from 'react';

const BlurHeading = ({ as: Tag = 'h2', className, id, text, lines, style }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const rows = lines?.length ? lines : [text || ''];
  const label = rows.join(' ');
  let index = 0;

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.4, rootMargin: '0px 0px -12% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={['blur-heading', shown ? 'is-in' : '', className].filter(Boolean).join(' ')}
      style={style}
      aria-label={label}
    >
      <span aria-hidden="true">
        {rows.map((line, lineIndex) => (
          <span className="hero-line" key={`${line}-${lineIndex}`}>
            {line.split(' ').map((word, wordIndex) => {
              const chars = Array.from(word).map((char) => {
                const delay = index * 0.034;
                index += 1;
                return (
                  <span className="char" style={{ animationDelay: `${delay}s` }} key={`${lineIndex}-${wordIndex}-${char}-${delay}`}>
                    {char}
                  </span>
                );
              });
              return (
                <span key={`${lineIndex}-${word}`}>
                  {wordIndex > 0 ? ' ' : null}
                  <span className="word">{chars}</span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </Tag>
  );
};

export default BlurHeading;
