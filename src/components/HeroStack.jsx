import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import Hero from './Hero';
import Skills from './Skills';

const HeroStack = () => {
  const wrapRef = useRef(null);
  const pinRef = useRef(null);

  useGSAP(
    () => {
      const pin = pinRef.current;
      const skills = wrapRef.current?.querySelector('#skills');
      if (!pin || !skills) return;

      gsap.to(pin, {
        scale: 0.92,
        ease: 'none',
        transformOrigin: '50% 50%',
        scrollTrigger: {
          trigger: skills,
          start: 'top bottom',
          end: 'top 18%',
          scrub: 0.7,
        },
      });
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className="relative">
      <div ref={pinRef} className="sticky top-0 z-0">
        <Hero />
      </div>
      <Skills />
    </div>
  );
};

export default HeroStack;
