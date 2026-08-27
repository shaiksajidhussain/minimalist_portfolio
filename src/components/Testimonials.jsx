import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { GOLD } from '../data/skills';
import { RevealHeading, useTextReveal } from '../hooks/useTextReveal.jsx';

const testimonials = [
  {
    quote:
      'Excellent work! Delivered exactly what we needed on time. The application is fast, scalable, and user-friendly.',
    name: 'Priya Sharma',
    designation: 'CEO, TechFlow',
  },
  {
    quote:
      'Professional developer who understands business needs. Great communication and technical expertise.',
    name: 'Rajesh Patel',
    designation: 'Founder, InnovateSphere',
  },
  {
    quote:
      'The LMS platform exceeded our expectations. Students love the interface and it improved our operations.',
    name: 'Anjali Verma',
    designation: 'Director, Educational Institution',
  },
];

const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

const Testimonials = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  useTextReveal(sectionRef);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      const cards = gsap.utils.toArray('.testimonial-card');
      if (!section || !stage || cards.length < 2) return;

      const mid = (cards.length - 1) / 2;
      const mm = gsap.matchMedia();

      const slot = () => cards[0]?.offsetWidth || 300;

      const stackedVars = (index) => {
        const offset = index - mid;
        return {
          x: 0,
          y: Math.abs(offset) * 6,
          rotate: offset * 1.2,
          scale: 1 - Math.abs(offset) * 0.02,
          zIndex: 10 - Math.abs(offset),
        };
      };

      const openVars = (index) => {
        const offset = index - mid;
        const isMobile = window.innerWidth < 768;
        const width = slot();

        if (isMobile) {
          return {
            x: offset * 18,
            y: offset * (width * 0.72),
            rotate: offset * 3,
            scale: 1,
            zIndex: 10 + index,
          };
        }

        return {
          x: offset * width * 0.96,
          y: Math.abs(offset) * 16,
          rotate: offset * 4,
          scale: 1 - Math.abs(offset) * 0.03,
          zIndex: 10 - Math.abs(offset),
        };
      };

      mm.add('(prefers-reduced-motion: reduce)', () => {
        cards.forEach((card, index) => gsap.set(card, openVars(index)));
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        cards.forEach((card, index) => gsap.set(card, stackedVars(index)));

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, index) => {
          tl.to(
            card,
            {
              x: () => openVars(index).x,
              y: () => openVars(index).y,
              rotate: () => openVars(index).rotate,
              scale: () => openVars(index).scale,
              duration: 1,
            },
            0
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="testimonials" className="relative h-screen">
      <div className="px-6 sm:px-10 pt-24 sm:pt-28 pb-4 max-w-6xl mx-auto text-center">
        <p
          className="font-mono text-[11px] tracking-[0.28em] uppercase text-zinc-500 mb-3"
          data-reveal-copy
        >
          Testimonials
        </p>
        <RevealHeading className="font-serif text-5xl sm:text-7xl tracking-tight text-[#1c1917]">
          In their words
        </RevealHeading>
      </div>

      <div ref={stageRef} className="testimonial-stage relative mx-auto">
        <div className="testimonial-home">
          {testimonials.map((item, index) => {
            const featured = index === 1;
            return (
              <article
                key={item.name}
                className="testimonial-card liquid-card p-6 sm:p-8 flex flex-col"
              >
              {featured && (
                <span
                  className="absolute left-1/2 -top-2.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
                  style={{ background: GOLD }}
                  aria-hidden
                />
              )}

              <p
                className="font-serif text-5xl leading-none mb-4"
                style={{ color: GOLD }}
                aria-hidden
              >
                “
              </p>
              <p className="text-[#1c1917] leading-relaxed text-[15px] sm:text-base flex-1">
                {item.quote}
              </p>

              <div className="mt-6 pt-5 border-t border-zinc-200/80 flex items-center gap-3">
                <span
                  className="h-10 w-10 rounded-full shrink-0 flex items-center justify-center text-[11px] font-medium text-[#1c1917]"
                  style={{ background: featured ? GOLD : '#ead7a0' }}
                >
                  {initials(item.name)}
                </span>
                <footer>
                  <p className="text-sm font-semibold text-[#1c1917]">{item.name}</p>
                  <p className="text-xs text-zinc-500">{item.designation}</p>
                </footer>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
