import { useRef } from 'react';
import { RevealHeading, useTextReveal } from '../hooks/useTextReveal.jsx';
import SnapRail from './SnapRail';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We clarify the problem, audience, and constraints before writing a line of code.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Structure, UI, and technical plan are agreed so the build stays focused.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Clean, production-ready development with regular check-ins and visible progress.',
  },
  {
    number: '04',
    title: 'Ship',
    description: 'Launch, polish, and handoff — with support so the product stays stable.',
  },
];

const HowIWork = () => {
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  return (
    <section ref={sectionRef} id="how-i-work" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <RevealHeading className="text-4xl sm:text-5xl font-semibold text-zinc-900 mb-4">
            How I Work
          </RevealHeading>
          <p className="text-lg text-zinc-500" data-reveal-copy>
            A clear, transparent process tailored to your project needs
          </p>
        </div>

        <SnapRail cols="four">
          {steps.map((step) => (
            <article
              key={step.number}
              className="liquid-card snap-center shrink-0 w-[min(82vw,340px)] min-h-[230px] p-6 md:w-full md:min-w-0 md:shrink md:h-auto"
            >
              <p className="text-xs tracking-[0.2em] text-zinc-500 mb-4">{step.number}</p>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
            </article>
          ))}
        </SnapRail>
      </div>
    </section>
  );
};

export default HowIWork;
