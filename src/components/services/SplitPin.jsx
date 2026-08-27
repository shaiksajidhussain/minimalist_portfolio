import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { GOLD, SERVICES } from '../../data/services';
import { RevealHeading, useTextReveal } from '../../hooks/useTextReveal.jsx';

const SplitPin = () => {
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  useGSAP(
    () => {
      const rows = sectionRef.current?.querySelectorAll('.svc-split-row');
      rows?.forEach((row) => {
        const image = row.querySelector('.svc-split-image');
        const copy = row.querySelector('.svc-split-copy');
        gsap.from(image, {
          xPercent: -18,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.7,
          },
        });
        gsap.from(copy, {
          y: 48,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top 78%',
            end: 'top 32%',
            scrub: 0.6,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative pb-24">
      <div className="px-6 sm:px-10 pt-24 pb-12 max-w-6xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-zinc-500 mb-3" data-reveal-copy>
          05 — Split
        </p>
        <RevealHeading className="font-serif text-5xl sm:text-7xl text-[#1c1917] tracking-tight">
          Services
        </RevealHeading>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-16 sm:space-y-24">
        {SERVICES.map((item, index) => (
          <article
            key={item.title}
            className={`svc-split-row liquid-card grid md:grid-cols-2 gap-6 sm:gap-8 items-center p-4 sm:p-6 ${
              index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div className="overflow-hidden rounded-[24px] h-64 sm:h-80">
              <img src={item.image} alt="" className="svc-split-image w-full h-full object-cover will-change-transform" />
            </div>
            <div className="svc-split-copy px-2 sm:px-4">
              <p className="font-mono text-[11px] tracking-[0.28em] mb-3" style={{ color: GOLD }}>{item.kicker}</p>
              <h3 className="font-serif text-3xl sm:text-5xl text-[#1c1917] mb-4">{item.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SplitPin;
