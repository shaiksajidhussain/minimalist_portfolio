import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { GOLD } from '../../data/skills';
import { EXPERTISE } from '../../data/expertise';
import { RevealHeading, useTextReveal } from '../../hooks/useTextReveal.jsx';

const ExpSplit = () => {
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  useGSAP(
    () => {
      const rows = sectionRef.current?.querySelectorAll('.exp-split-row');
      rows?.forEach((row) => {
        gsap.from(row.querySelector('.exp-split-copy'), {
          y: 48,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: row, start: 'top 80%', end: 'top 32%', scrub: 0.65 },
        });
        gsap.from(row.querySelector('.exp-split-mark'), {
          x: -30,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: row, start: 'top 82%', end: 'top 36%', scrub: 0.65 },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative pb-24">
      <div className="px-6 sm:px-10 pt-24 pb-12 max-w-6xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-zinc-500 mb-3" data-reveal-copy>
          Focus
        </p>
        <RevealHeading className="font-serif text-5xl sm:text-7xl text-[#1c1917] tracking-tight">
          My expertise
        </RevealHeading>
      </div>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 space-y-6">
        {EXPERTISE.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="exp-split-row liquid-card grid md:grid-cols-[140px_1fr] gap-8 p-8 sm:p-10">
              <div className="exp-split-mark">
                <p className="font-serif text-5xl mb-4" style={{ color: GOLD }}>{item.kicker}</p>
                <Icon size={32} color={GOLD} />
              </div>
              <div className="exp-split-copy">
                <p className="font-mono text-sm text-zinc-500 mb-2">{item.subtitle}</p>
                <h3 className="font-serif text-3xl sm:text-5xl text-[#1c1917] mb-4">{item.title}</h3>
                <p className="text-zinc-600 text-lg leading-relaxed max-w-2xl">{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ExpSplit;
