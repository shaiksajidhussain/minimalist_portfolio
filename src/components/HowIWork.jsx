import { useRef } from 'react';
import { gsap, onLayoutReady, useGSAP } from '../lib/gsap';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We clarify the problem, audience, and constraints before writing a line of code.',
    leaveWith: 'Brief · Scope · What not to build',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Structure, UI, and technical plan are agreed so the build stays focused.',
    leaveWith: 'Architecture · UI direction · Sequence',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Clean, production-ready development with regular check-ins and visible progress.',
    leaveWith: 'Working increments you can click through',
  },
  {
    number: '04',
    title: 'Ship',
    description:
      'Launch, polish, and handoff — with support so the product stays stable.',
    leaveWith: 'Live product · Handoff · Support window',
  },
];

const HowIWork = () => {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      const section = sectionRef.current;
      const rail = railRef.current;
      const track = trackRef.current;
      if (!section || !rail || !track) return;

      const boot = contextSafe(() => {
        const distance = () => Math.max(track.scrollWidth - rail.offsetWidth + 32, 0);

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(distance() * 1.2, window.innerHeight * 1.4)}`,
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
    <section
      ref={sectionRef}
      id="how-i-work"
      className="relative h-screen overflow-hidden bg-[#f4efe6]"
    >
      <div className="flex h-full flex-col lg:flex-row">
        <header className="shrink-0 px-6 pt-24 sm:px-10 lg:flex lg:w-[min(42%,28rem)] lg:flex-col lg:justify-center lg:pt-0 lg:pl-10 lg:pr-8">
          <div className="mb-6 flex max-w-md items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              05 — Process
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#d4af37]">
              Four stages
            </p>
          </div>
          <h2 className="font-serif text-[2.6rem] leading-[0.95] tracking-tight text-[#1c1917] sm:text-6xl lg:text-7xl">
            How I
            <br />
            <em>work.</em>
          </h2>
          <p className="mt-6 max-w-md text-[1.1rem] leading-[1.65] text-[#1c1917] sm:text-xl lg:mt-8">
            A short sequence from the first conversation to a live product — no
            mystery sprint in the middle.
          </p>
        </header>

        <div
          ref={railRef}
          className="flex min-h-0 flex-1 items-center overflow-hidden pb-16 pt-8 lg:pb-0 lg:pt-0"
        >
          <ol ref={trackRef} className="flex w-max gap-6 px-6 sm:px-10 lg:px-4 lg:pr-16">
            {steps.map((step) => (
              <li key={step.number} className="relative w-[min(78vw,400px)] shrink-0">
                <div
                  className="gold-plate pointer-events-none absolute inset-y-8 -right-3 left-10"
                  aria-hidden
                />
                <article className="relative flex min-h-[48vh] flex-col border-[10px] border-[#fffcf7] bg-[#fffcf7] px-7 py-8 shadow-[0_24px_60px_rgba(28,25,23,0.10)] sm:min-h-[52vh] sm:px-8 sm:py-10">
                  <p className="font-serif text-4xl tracking-tight text-[#d4af37] sm:text-5xl">
                    {step.number}
                  </p>
                  <h3 className="mt-6 font-serif text-3xl tracking-tight text-[#1c1917] sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-sm flex-1 text-[1.05rem] leading-relaxed text-[#1c1917]/80">
                    {step.description}
                  </p>
                  <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    {step.leaveWith}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
