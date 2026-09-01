import { useRef } from 'react';
import { gsap, onLayoutReady, useGSAP } from '../lib/gsap';

const ScrollRail = ({ id, kicker, title, children }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const boot = contextSafe(() => {
        const distance = () => Math.max(track.scrollWidth - section.offsetWidth + 64, 0);

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(distance() * 1.15, window.innerHeight * 1.2)}`,
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
    <section ref={sectionRef} id={id} className="relative h-screen overflow-hidden bg-[var(--cream)]">
      <div className="px-6 sm:px-10 pt-24 pb-6 max-w-6xl">
        {kicker ? (
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-zinc-500 mb-3">
            {kicker}
          </p>
        ) : null}
        <h2 className="font-serif text-5xl sm:text-7xl text-[var(--ink)] tracking-tight">{title}</h2>
      </div>

      <div className="overflow-hidden pb-24">
        <div ref={trackRef} className="flex gap-6 px-6 sm:px-10 w-max">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ScrollRail;
