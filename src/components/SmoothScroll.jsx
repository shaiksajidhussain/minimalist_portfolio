import { ReactLenis, useLenis } from 'lenis/react';
import { gsap, onScrollLayout, ScrollTrigger, useGSAP } from '../lib/gsap';

const LenisGsapBridge = () => {
  const lenis = useLenis();

  useGSAP(
    () => {
      if (!lenis) return;

      lenis.on('scroll', ScrollTrigger.update);

      const onTick = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(onTick, false, true);
      gsap.ticker.lagSmoothing(0);

      let locked = false;
      let missed = false;
      let timer = 0;
      let lastHeight = -1;

      const refresh = () => {
        if (locked) {
          missed = true;
          return;
        }

        locked = true;
        missed = false;
        lenis.resize();
        ScrollTrigger.refresh();
        lastHeight = document.documentElement.scrollHeight;

        window.requestAnimationFrame(() => {
          locked = false;
          if (!missed) return;
          missed = false;
          schedule();
        });
      };

      const schedule = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(refresh, 120);
      };

      const seenImages = new WeakSet();

      const bindImage = (img) => {
        if (!(img instanceof HTMLImageElement) || seenImages.has(img)) return;
        seenImages.add(img);
        if (img.complete) return;
        img.addEventListener('load', schedule, { once: true });
        img.addEventListener('error', schedule, { once: true });
      };

      const scanImages = (node) => {
        if (!(node instanceof Element)) return;
        if (node instanceof HTMLImageElement) bindImage(node);
        node.querySelectorAll('img').forEach(bindImage);
      };

      document.querySelectorAll('img').forEach(bindImage);

      const imageObserver = new MutationObserver((records) => {
        records.forEach((record) => {
          record.addedNodes.forEach((node) => scanImages(node));
        });
      });
      imageObserver.observe(document.body, { childList: true, subtree: true });

      const resizeObserver = new ResizeObserver(() => {
        if (locked) {
          missed = true;
          return;
        }
        const next = document.documentElement.scrollHeight;
        if (Math.abs(next - lastHeight) < 2) return;
        schedule();
      });
      resizeObserver.observe(document.body);

      const stopLayoutWatch = onScrollLayout(schedule);
      document.fonts?.ready?.then(schedule).catch(() => {});
      document.fonts?.addEventListener('loadingdone', schedule);

      const delays = [80, 400, 1200, 2500, 5000].map((ms) => window.setTimeout(schedule, ms));

      const onLoad = () => schedule();
      if (document.readyState !== 'complete') {
        window.addEventListener('load', onLoad, { once: true });
      }

      window.addEventListener('resize', schedule);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(refresh);
      });

      return () => {
        lenis.off('scroll', ScrollTrigger.update);
        gsap.ticker.remove(onTick);
        gsap.ticker.lagSmoothing(500, 33);
        window.clearTimeout(timer);
        delays.forEach((id) => window.clearTimeout(id));
        window.removeEventListener('load', onLoad);
        window.removeEventListener('resize', schedule);
        document.fonts?.removeEventListener('loadingdone', schedule);
        imageObserver.disconnect();
        resizeObserver.disconnect();
        stopLayoutWatch();
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
        lerp: 0.065,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.05,
        syncTouch: false,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
