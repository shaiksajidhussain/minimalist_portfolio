import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { GOLD, SERVICES } from '../../data/services';
import { RevealHeading, useTextReveal } from '../../hooks/useTextReveal.jsx';

const IndexPin = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);
  const kickerRef = useRef(null);
  const imageRefs = useRef([]);
  useTextReveal(sectionRef);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.set(imageRefs.current, { autoAlpha: 0, scale: 1.08 });
      gsap.set(imageRefs.current[0], { autoAlpha: 1, scale: 1 });

      let current = 0;
      const show = (next) => {
        if (next === current) return;
        gsap.to(imageRefs.current[current], { autoAlpha: 0, scale: 1.06, duration: 0.4, ease: 'power2.inOut' });
        gsap.fromTo(
          imageRefs.current[next],
          { autoAlpha: 0, scale: 1.08 },
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
        );
        const item = SERVICES[next];
        if (kickerRef.current) kickerRef.current.textContent = item.kicker;
        if (titleRef.current) titleRef.current.textContent = item.title;
        if (copyRef.current) copyRef.current.textContent = item.description;
        section.querySelectorAll('.svc-index-num').forEach((el, i) => {
          el.style.color = i === next ? GOLD : '#a8a29e';
        });
        current = next;
      };

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${SERVICES.length * 280}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const next = Math.min(SERVICES.length - 1, Math.floor(self.progress * SERVICES.length));
          show(next);
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="h-full max-w-6xl mx-auto px-6 sm:px-10 pt-24 pb-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
        <div className="flex flex-col justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-zinc-500 mb-3" data-reveal-copy>
              04 — Index
            </p>
            <RevealHeading className="font-serif text-5xl text-[#1c1917] tracking-tight mb-10">
              Services
            </RevealHeading>
            <ol className="space-y-2">
              {SERVICES.map((item, index) => (
                <li
                  key={item.title}
                  className="svc-index-num font-serif text-2xl sm:text-3xl"
                  style={{ color: index === 0 ? GOLD : '#a8a29e' }}
                >
                  {item.kicker} {item.title.split(' ')[0]}
                </li>
              ))}
            </ol>
          </div>
          <div className="liquid-card p-6">
            <p ref={kickerRef} className="font-mono text-[11px] mb-2" style={{ color: GOLD }}>{SERVICES[0].kicker}</p>
            <h3 ref={titleRef} className="font-serif text-3xl sm:text-4xl text-[#1c1917] mb-3">{SERVICES[0].title}</h3>
            <p ref={copyRef} className="text-zinc-600 leading-relaxed">{SERVICES[0].description}</p>
          </div>
        </div>

        <div className="relative liquid-card overflow-hidden min-h-[320px]">
          {SERVICES.map((item, index) => (
            <img
              key={item.title}
              ref={(node) => {
                imageRefs.current[index] = node;
              }}
              src={item.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndexPin;
