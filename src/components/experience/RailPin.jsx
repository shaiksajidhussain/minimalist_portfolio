import { useRef } from 'react';
import { gsap, onLayoutReady, useGSAP } from '../../lib/gsap';
import { EXPERIENCE } from '../../data/experience';
import { RevealHeading, useTextReveal } from '../../hooks/useTextReveal.jsx';

const RailPin = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  useTextReveal(sectionRef);

  useGSAP(
    (_, contextSafe) => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const boot = contextSafe(() => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - section.offsetWidth + 48),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(track.scrollWidth, window.innerHeight * 1.8)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return onLayoutReady(boot);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[var(--cream)]">
      <div className="px-6 sm:px-10 pt-24 pb-6 max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-zinc-500 mb-3" data-reveal-copy>
          Experience
        </p>
        <RevealHeading className="font-serif text-5xl sm:text-7xl text-[var(--ink)] tracking-tight">
          Work
        </RevealHeading>
      </div>

      <div className="overflow-hidden pb-28">
        <div ref={trackRef} className="flex gap-6 px-6 sm:px-10 w-max will-change-transform">
          {EXPERIENCE.map((item) => (
            <article
              key={item.company}
              className="liquid-card w-[min(84vw,420px)] shrink-0 p-7 sm:p-8 min-h-[52vh]"
              data-reveal-block
            >
              <p className="mb-4 font-mono text-[11px] tracking-[0.28em] text-[var(--gold)]">
                {item.kicker}
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl text-[var(--ink)] mb-2">{item.company}</h3>
              <p className="text-zinc-500 mb-1">{item.role}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400 mb-6">
                {item.duration}
              </p>
              <ul className="space-y-2 text-sm text-zinc-600 leading-relaxed">
                {item.points.slice(0, 3).map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-[var(--gold)]">–</span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RailPin;
