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

      const fonts = document.fonts?.ready ?? Promise.resolve();
      fonts.finally(() => {
        if (document.readyState === 'complete') refresh();
        else window.addEventListener('load', refresh, { once: true });
        window.setTimeout(refresh, 200);
      });

      const later = window.setTimeout(refresh, 1500);

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
