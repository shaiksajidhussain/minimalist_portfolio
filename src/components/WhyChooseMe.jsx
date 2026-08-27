import { useRef } from 'react';
import { RevealHeading, useTextReveal } from '../hooks/useTextReveal.jsx';
import SnapRail from './SnapRail';

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
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  return (
    <section ref={sectionRef} id="why-choose-me" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <RevealHeading className="text-4xl sm:text-5xl font-semibold text-zinc-900 mb-4">
            Why Choose Me
          </RevealHeading>
          <p className="text-lg text-zinc-500" data-reveal-copy>
            What sets me apart in the market
          </p>
        </div>

        <SnapRail cols="md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="liquid-card snap-center shrink-0 w-[min(82vw,340px)] min-h-[200px] p-6 md:w-auto md:min-w-0"
              data-reveal-block
            >
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">{reason.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{reason.description}</p>
            </article>
          ))}
        </SnapRail>
      </div>
    </section>
  );
};

export default WhyChooseMe;
