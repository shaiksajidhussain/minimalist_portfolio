import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { GOLD, SKILL_GROUPS } from '../../data/skills';
import { RevealHeading, useTextReveal } from '../../hooks/useTextReveal.jsx';

const LedgerPin = () => {
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  useGSAP(
    () => {
      const panels = sectionRef.current?.querySelectorAll('.ledger-panel');
      if (!panels?.length) return;

      panels.forEach((panel, index) => {
        if (index === panels.length - 1) return;
        const nextCard = sectionRef.current?.querySelectorAll('.ledger-card')[index + 1];
        if (!nextCard) return;

        gsap.to(panel, {
          scale: 0.94,
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 80%',
            end: 'top 18%',
            scrub: 0.6,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative bg-transparent">
      <div className="px-6 sm:px-10 pt-24 sm:pt-28 pb-6 max-w-5xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-zinc-500 mb-3" data-reveal-copy>
          Tech Stack
        </p>
        <RevealHeading className="font-serif text-5xl sm:text-7xl tracking-tight text-[#1c1917]">
          Stacked by craft
        </RevealHeading>
      </div>

      {SKILL_GROUPS.map((group, index) => (
        <article
          key={group.title}
          className="ledger-card sticky top-0 min-h-screen flex items-center px-5 sm:px-12 lg:px-20 py-16 sm:py-20 bg-transparent"
          style={{ zIndex: index + 1 }}
        >
          <div className="ledger-panel liquid-card w-full max-w-5xl mx-auto p-7 sm:p-11 min-h-[58vh] flex flex-col origin-center">
            <div className="flex items-baseline justify-between gap-4 mb-10">
              <div>
                <p className="font-mono text-[11px] tracking-[0.28em] mb-2" style={{ color: GOLD }}>
                  {group.kicker}
                </p>
                <h3 className="font-serif text-4xl sm:text-6xl text-[#1c1917]">{group.title}</h3>
              </div>
              <p className="font-mono text-sm text-zinc-500">{group.items.length} tools</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mt-auto">
              {group.items.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="group liquid-card rounded-[22px] px-4 py-5 hover:border-[#d4af37]/50 transition-colors"
                  >
                    <Icon
                      size={28}
                      className="mb-3 text-zinc-500 transition-colors group-hover:text-[#d4af37]"
                    />
                    <p className="text-sm font-medium text-[#1c1917]">{skill.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default LedgerPin;
