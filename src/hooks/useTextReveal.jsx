import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

export const RevealHeading = ({ as: Tag = 'h2', children, className = '' }) => {
  const words = String(children).trim().split(/\s+/);

  return (
    <Tag className={className} data-reveal>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="reveal-word">
          <span className="reveal-word-inner">{word}</span>
          {index < words.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </Tag>
  );
};

export const useTextReveal = (scopeRef) => {
  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return;

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const headings = root.querySelectorAll('[data-reveal] .reveal-word-inner');
      const copies = root.querySelectorAll('[data-reveal-copy]');
      const blocks = root.querySelectorAll('[data-reveal-block]');

      if (reduce) {
        gsap.set([headings, copies, blocks], { clearProps: 'all', autoAlpha: 1, y: 0, yPercent: 0 });
        return;
      }

      root.querySelectorAll('[data-reveal]').forEach((heading) => {
        const words = heading.querySelectorAll('.reveal-word-inner');
        gsap.from(words, {
          yPercent: 110,
          stagger: 0.04,
          duration: 0.55,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      });

      copies.forEach((el) => {
        gsap.from(el, {
          y: 14,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      });

      if (blocks.length) {
        gsap.set(blocks, { y: 24, autoAlpha: 0 });
        ScrollTrigger.batch(blocks, {
          start: 'top 92%',
          once: true,
          onEnter: (els) => {
            gsap.to(els, {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              stagger: 0.04,
              ease: 'power3.out',
              overwrite: true,
            });
          },
        });
      }
    },
    { scope: scopeRef }
  );
};
