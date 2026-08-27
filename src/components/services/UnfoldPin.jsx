import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { GOLD, SERVICES } from '../../data/services';
import { RevealHeading, useTextReveal } from '../../hooks/useTextReveal.jsx';

const UnfoldPin = () => {
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const bodies = section?.querySelectorAll('.svc-unfold-body');
      if (!section || !bodies?.length) return;

      gsap.set(bodies, { height: 0, autoAlpha: 0 });
      gsap.set(bodies[0], { height: 'auto', autoAlpha: 1 });

      let current = 0;
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${SERVICES.length * 240}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const next = Math.min(SERVICES.length - 1, Math.floor(self.progress * SERVICES.length));
          if (next === current) return;
          gsap.to(bodies[current], { height: 0, autoAlpha: 0, duration: 0.28, overwrite: 'auto' });
          gsap.to(bodies[next], { height: 'auto', autoAlpha: 1, duration: 0.32, overwrite: 'auto' });
          current = next;
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-24 h-full flex flex-col">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-zinc-500 mb-3" data-reveal-copy>
          06 — Unfold
        </p>
        <RevealHeading className="font-serif text-5xl sm:text-7xl text-[#1c1917] tracking-tight mb-8">
          Services
        </RevealHeading>

        <div>
          {SERVICES.map((item) => (
            <article key={item.title} className="liquid-card px-5 py-4 mb-3">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1c1917]">{item.title}</h3>
                <span className="font-mono text-[11px]" style={{ color: GOLD }}>{item.kicker}</span>
              </div>
              <div className="svc-unfold-body overflow-hidden">
                <p className="pt-3 pb-2 text-zinc-600 leading-relaxed max-w-xl">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnfoldPin;
