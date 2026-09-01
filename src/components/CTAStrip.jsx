import { FiArrowRight } from 'react-icons/fi';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { RevealHeading, useTextReveal } from '../hooks/useTextReveal.jsx';

const CTAStrip = () => {
  const { colors } = useTheme();
  const scrollToSection = useSmoothScroll();
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto" data-reveal-block>
        <div className="rounded-[32px] p-10 sm:p-12 text-center liquid-card">
          <RevealHeading className="mb-4 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
            Have a project in mind?
          </RevealHeading>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-[var(--muted)]" data-reveal-copy>
            Let&apos;s discuss how I can help you build it — new product, feature work, or architecture.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => scrollToSection('#contact')}
              className="flex items-center justify-center gap-2 rounded-full px-7 py-3 font-medium text-[var(--ink)]"
              style={{ backgroundColor: colors.primary }}
            >
              Let&apos;s Talk
              <FiArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('#projects')}
              className="rounded-full border border-[var(--line)] px-7 py-3 font-medium text-[var(--ink)] hover:bg-[var(--cream)]"
            >
              View My Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAStrip;
