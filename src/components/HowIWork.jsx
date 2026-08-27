import ScrollRail from './ScrollRail';

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
  return (
    <ScrollRail id="how-i-work" kicker="Process" title="How I Work">
      {steps.map((step) => (
        <article
          key={step.number}
          className="liquid-card w-[min(84vw,380px)] shrink-0 p-7 sm:p-8 min-h-[42vh] flex flex-col"
        >
          <p className="font-mono text-[11px] tracking-[0.28em] text-zinc-400 mb-6">{step.number}</p>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#1c1917] mb-4">{step.title}</h3>
          <p className="text-zinc-600 leading-relaxed">{step.description}</p>
        </article>
      ))}
    </ScrollRail>
  );
};

export default HowIWork;
