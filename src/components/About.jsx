import { useRef } from 'react';
import { gsap, onLayoutReady, useGSAP } from '../lib/gsap';

const PATH =
  'M110 95 C 310 360, 700 55, 1040 270 C 1220 390, 880 470, 720 510';

const About = () => {
  const rootRef = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;

      let mm;

      const boot = contextSafe(() => {
        mm = gsap.matchMedia();

        const setup = (reduceMotion, isMobile) => {
          const svg = root.querySelector('.about-path-svg');
          const path = root.querySelector('#about-plane-guide');
          const plane = root.querySelector('.about-plane');
          const draw = root.querySelector('.about-path-draw');
          const dot = root.querySelector('.about-dot');
          const kicker = root.querySelector('.about-kicker');
          const copy = root.querySelector('.about-copy-inner');
          const note = root.querySelector('.about-note');

          svg?.setAttribute('preserveAspectRatio', isMobile ? 'none' : 'xMidYMid slice');

          const parkPlane = (end) => {
            if (!path || !plane) return;
            gsap.set(plane, {
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: end || 0.001,
              },
            });
          };

          if (reduceMotion) {
            parkPlane(1);
            gsap.set([plane, kicker, note, copy, dot], { autoAlpha: 1, y: 0, scale: 1 });
            if (draw) {
              const len = draw.getTotalLength();
              gsap.set(draw, { strokeDasharray: len, strokeDashoffset: 0 });
            }
            return;
          }

          parkPlane(0);
          gsap.set(plane, { autoAlpha: 0 });
          gsap.set(dot, { scale: 0, transformOrigin: '50% 50%' });

          if (draw) {
            const len = draw.getTotalLength();
            gsap.set(draw, { strokeDasharray: len, strokeDashoffset: len });
          }

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: () => `+=${Math.round(window.innerHeight * (isMobile ? 0.95 : 1.2))}`,
              pin: true,
              pinSpacing: true,
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(plane, { autoAlpha: 1, duration: 0.06 }, 0);

          if (draw) {
            tl.to(draw, { strokeDashoffset: 0, duration: 0.62 }, 0);
          }

          tl.to(
            plane,
            {
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1,
              },
              duration: 0.7,
            },
            0.02
          );

          tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.1, ease: 'back.out(2)' }, 0.58);
          tl.fromTo(kicker, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.6);
          tl.fromTo(copy, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.22, ease: 'power3.out' }, 0.64);
          tl.fromTo(note, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.16, ease: 'power2.out' }, 0.82);
        };

        mm.add('(prefers-reduced-motion: reduce)', () => setup(true, false));
        mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () =>
          setup(false, false)
        );
        mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () =>
          setup(false, true)
        );
      });

      const stop = onLayoutReady(boot);
      return () => {
        stop();
        mm?.revert();
      };
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="about" className="relative min-h-screen overflow-hidden bg-[#f4efe6]">
      <div className="relative min-h-screen flex flex-col">
        <div className="pointer-events-none relative h-[32vh] min-h-[150px] lg:h-[36vh] shrink-0 z-[1]">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #6eb0e2 0%, #97ccea 55%, #d5eaf8 100%)',
            }}
          />
          <div className="hero-grain" />
          <div
            className="about-sun absolute top-6 right-[8%] sm:top-8 sm:right-[11%] w-[4.5rem] h-[4.5rem] sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full"
            style={{
              background: 'repeating-linear-gradient(-32deg, #f0c93a 0 11px, #fff4c4 11px 15px)',
            }}
            aria-hidden
          />
          <svg
            className="absolute bottom-[-1px] left-0 w-full h-[72%] text-[#f4efe6]"
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              fill="currentColor"
              d="M0 180V92c120-70 210 28 340-28 140-60 210 48 360-10 150-58 230 40 370-16 120-48 180 36 370 8v134H0Z"
            />
          </svg>
        </div>

        <svg
          className="about-path-svg pointer-events-none absolute inset-0 w-full h-full z-[2]"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden
        >
          <defs>
            <mask id="about-path-mask">
              <path
                className="about-path-draw"
                d={PATH}
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </mask>
          </defs>
          <path
            d={PATH}
            stroke="#1c1917"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            opacity="0.4"
            mask="url(#about-path-mask)"
          />
          <path id="about-plane-guide" d={PATH} stroke="transparent" strokeWidth="2" />
          <circle className="about-dot" cx="720" cy="510" r="5.5" fill="#1c1917" />
        </svg>

        <div
          className="about-plane absolute z-[3] w-8 h-8 lg:w-9 lg:h-9 text-[#e7b8a4] opacity-0"
          aria-hidden
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.5 11.4 21 3.2l-6.2 18.2-4.1-6.3-6.2-3.7Z" />
          </svg>
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-end px-6 pb-12 sm:pb-14 lg:pb-16">
          <h2 className="sr-only">About</h2>
          <div className="w-full max-w-[44rem] text-center liquid-card px-6 py-8 sm:px-10 sm:py-10">
            <p className="about-kicker font-mono text-[11px] tracking-[0.16em] uppercase text-zinc-500 mb-5">
              Hello, I&apos;m Shaik Sajid Hussain. A —
            </p>
            <p className="about-copy text-[1.25rem] sm:text-[1.7rem] lg:text-[1.9rem] leading-[1.55] tracking-[-0.01em] text-[#1c1917]">
              <span className="about-copy-inner block">
                Three years across product and engineering, building what&apos;s next — from SaaS
                platforms and learning systems to shipping React Native apps.
              </span>
            </p>
            <p className="about-note mt-7 sm:mt-8 text-sm sm:text-base text-zinc-500 leading-relaxed max-w-lg mx-auto">
              React, React Native, and Node.js — performance, clean UI, and architecture that scales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
