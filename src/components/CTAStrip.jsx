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
          <RevealHeading className="text-3xl sm:text-4xl font-semibold text-zinc-900 mb-4">
            Have a project in mind?
          </RevealHeading>
          <p className="text-lg text-zinc-500 mb-8 max-w-2xl mx-auto" data-reveal-copy>
            Let&apos;s discuss how I can help you build it — new product, feature work, or architecture.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-7 py-3 rounded-full font-medium text-zinc-950 flex items-center justify-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              Let&apos;s Talk
              <FiArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('#projects')}
              className="px-7 py-3 rounded-full font-medium border border-zinc-300 text-zinc-900 hover:bg-zinc-50"
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
