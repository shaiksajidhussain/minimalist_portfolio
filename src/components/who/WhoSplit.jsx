import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { GOLD } from '../../data/skills';
import { CLIENTS } from '../../data/clients';
import { RevealHeading, useTextReveal } from '../../hooks/useTextReveal.jsx';

const WhoSplit = () => {
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  useGSAP(
    () => {
      const rows = sectionRef.current?.querySelectorAll('.who-split-row');
      rows?.forEach((row) => {
        const mark = row.querySelector('.who-split-mark');
        const copy = row.querySelector('.who-split-copy');
        gsap.from(mark, {
          x: -40,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: row, start: 'top 80%', end: 'top 30%', scrub: 0.6 },
        });
        gsap.from(copy, {
          y: 40,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: row, start: 'top 78%', end: 'top 32%', scrub: 0.6 },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative pb-24">
      <div className="px-6 sm:px-10 pt-24 pb-12 max-w-6xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-zinc-500 mb-3" data-reveal-copy>
          Clients
        </p>
        <RevealHeading className="font-serif text-5xl sm:text-7xl text-[#1c1917] tracking-tight">
          Who I work with
        </RevealHeading>
      </div>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 space-y-6">
        {CLIENTS.map((item) => (
          <article key={item.title} className="who-split-row liquid-card grid md:grid-cols-[120px_1fr] gap-6 items-start p-8">
            <p className="who-split-mark font-serif text-5xl" style={{ color: GOLD }}>{item.kicker}</p>
            <div className="who-split-copy">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1c1917] mb-3">{item.title}</h3>
              <p className="text-zinc-600 text-lg leading-relaxed max-w-2xl">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WhoSplit;
