import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { CLIENTS } from '../../data/clients';
import { RevealHeading, useTextReveal } from '../../hooks/useTextReveal.jsx';

const WhoSplit = () => {
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  useGSAP(
    () => {
      const panels = sectionRef.current?.querySelectorAll('.who-panel');
      if (!panels?.length) return;

      panels.forEach((panel, index) => {
        if (index === panels.length - 1) return;
        const nextCard = sectionRef.current?.querySelectorAll('.who-card')[index + 1];
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
    <section ref={sectionRef} className="relative bg-[var(--cream)]">
      <div className="mx-auto max-w-5xl px-6 pb-6 pt-24 sm:px-10 sm:pt-28">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500" data-reveal-copy>
          Clients
        </p>
        <RevealHeading className="font-serif text-5xl tracking-tight text-[var(--ink)] sm:text-7xl">
          Who I work with
        </RevealHeading>
      </div>

      {CLIENTS.map((item, index) => (
        <article
          key={item.title}
          className="who-card sticky top-0 flex min-h-screen items-center bg-[var(--cream)] px-5 py-16 sm:px-12 sm:py-20 lg:px-20"
          style={{ zIndex: index + 1 }}
        >
          <div className="who-panel liquid-card mx-auto flex min-h-[58vh] w-full max-w-5xl origin-center flex-col justify-center p-7 sm:p-11">
            <div className="mb-8 flex items-baseline justify-between gap-4">
              <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--gold)]">
                {item.kicker}
              </p>
              <p className="font-mono text-sm text-zinc-500">
                {String(index + 1).padStart(2, '0')} / {String(CLIENTS.length).padStart(2, '0')}
              </p>
            </div>
            <h3 className="font-serif text-4xl tracking-tight text-[var(--ink)] sm:text-6xl">
              {item.title}
            </h3>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
              {item.description}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default WhoSplit;
