import { ReactLenis, useLenis } from 'lenis/react';
import { ScrollTrigger, useGSAP } from '../lib/gsap';

const LenisGsapBridge = () => {
  const lenis = useLenis();

  useGSAP(
    () => {
      if (!lenis) return;

      lenis.on('scroll', ScrollTrigger.update);

      const refresh = () => {
        lenis.resize();
        ScrollTrigger.refresh();
      };

      const onResize = () => refresh();
      window.addEventListener('resize', onResize);

      if (document.readyState === 'complete') {
        refresh();
        window.requestAnimationFrame(refresh);
      } else {
        window.addEventListener('load', refresh, { once: true });
      }

      document.fonts?.ready?.then(refresh);
      const later = window.setTimeout(refresh, 500);

      return () => {
        lenis.off('scroll', ScrollTrigger.update);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('load', refresh);
        window.clearTimeout(later);
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
        autoRaf: true,
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
