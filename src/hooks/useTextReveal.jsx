import { gsap, nodes, ScrollTrigger, useGSAP } from '../lib/gsap';

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

export const useTextReveal = (scopeRef, deps = []) => {
  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return;

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const headingEls = nodes(root.querySelectorAll('[data-reveal] .reveal-word-inner'));
      const copyEls = nodes(root.querySelectorAll('[data-reveal-copy]'));
      const blockEls = nodes(root.querySelectorAll('[data-reveal-block]'));

      if (reduce) return;

      root.querySelectorAll('[data-reveal]').forEach((heading) => {
        const words = nodes(heading.querySelectorAll('.reveal-word-inner'));
        if (!words.length) return;
        gsap.from(words, {
          yPercent: 110,
          stagger: 0.04,
          duration: 0.55,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      });

      copyEls.forEach((el) => {
        gsap.from(el, {
          y: 14,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      });

      if (blockEls.length) {
        ScrollTrigger.batch(blockEls, {
          start: 'top 92%',
          once: true,
          onEnter: (els) => {
            gsap.fromTo(
              els,
              { y: 16, autoAlpha: 0.001 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.5,
                stagger: 0.04,
                ease: 'power3.out',
                overwrite: true,
              }
            );
          },
        });
      }
    },
    { scope: scopeRef, dependencies: deps }
  );
};
