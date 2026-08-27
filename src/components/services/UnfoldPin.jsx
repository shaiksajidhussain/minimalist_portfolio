import { useRef } from 'react';
import { ScrollTrigger, useGSAP } from '../../lib/gsap';
import { SERVICES } from '../../data/services';
import { RevealHeading, useTextReveal } from '../../hooks/useTextReveal.jsx';

const UnfoldPin = () => {
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const items = section?.querySelectorAll('.svc-unfold-item');
      if (!section || !items?.length) return;

      items[0]?.classList.add('is-open');

      let current = 0;
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(window.innerHeight * 1.4, SERVICES.length * 280)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = Math.min(
            SERVICES.length - 1,
            Math.floor(self.progress * SERVICES.length)
          );
          if (next === current) return;
          items[current]?.classList.remove('is-open');
          items[next]?.classList.add('is-open');
          current = next;
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#f4efe6]">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-24 h-full flex flex-col">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-zinc-500 mb-3" data-reveal-copy>
          06 — Unfold
        </p>
        <RevealHeading className="font-serif text-5xl sm:text-7xl text-[#1c1917] tracking-tight mb-8">
          Services
        </RevealHeading>

        <div className="flex-1 overflow-y-auto pb-8">
          {SERVICES.map((item, index) => (
            <article
              key={item.title}
              className={`svc-unfold-item liquid-card px-5 py-4 mb-3 ${index === 0 ? 'is-open' : ''}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1c1917]">{item.title}</h3>
                <span className="svc-unfold-kicker font-mono text-[11px] shrink-0 text-stone-400">
                  {item.kicker}
                </span>
              </div>
              <div className="svc-unfold-body">
                <div className="svc-unfold-body-inner">
                  <p className="pt-3 pb-1 text-zinc-600 leading-relaxed max-w-xl">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnfoldPin;
