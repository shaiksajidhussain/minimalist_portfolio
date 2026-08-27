import ScrollRail from './ScrollRail';

const reasons = [
  {
    title: '3+ Years Experience',
    description: 'Real-world SaaS & production experience with a proven track record.',
  },
  {
    title: 'Performance Focused',
    description: 'Lighthouse audits, SEO, and speed-critical development as a default.',
  },
  {
    title: 'Clean & Scalable Code',
    description: 'Maintainable architecture built for growth, not just the first launch.',
  },
  {
    title: 'Strong Communication',
    description: 'Fast response times and transparent updates throughout the project.',
  },
  {
    title: 'Advanced Features',
    description: 'Payments, real-time systems, and backends that can actually scale.',
  },
];

const WhyChooseMe = () => {
  return (
    <ScrollRail id="why-choose-me" kicker="Why me" title="Why Choose Me">
      {reasons.map((reason, index) => (
        <article
          key={reason.title}
          className="liquid-card w-[min(84vw,380px)] shrink-0 p-7 sm:p-8 min-h-[42vh] flex flex-col"
        >
          <p className="font-mono text-[11px] tracking-[0.28em] text-zinc-400 mb-6">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#1c1917] mb-4">{reason.title}</h3>
          <p className="text-zinc-600 leading-relaxed">{reason.description}</p>
        </article>
      ))}
    </ScrollRail>
  );
};

export default WhyChooseMe;
