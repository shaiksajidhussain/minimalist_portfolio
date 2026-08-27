import { ReactLenis, useLenis } from 'lenis/react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

const LenisGsapBridge = () => {
  const lenis = useLenis();

  useGSAP(
    () => {
      if (!lenis) return;

      lenis.on('scroll', ScrollTrigger.update);

      const onTick = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(onTick);

      return () => {
        gsap.ticker.remove(onTick);
        lenis.off('scroll', ScrollTrigger.update);
      };
    },
    { dependencies: [lenis] }
  );

  return null;
};

const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        duration: 0.9,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.1,
        syncTouch: false,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
