import gsap from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(CSSPlugin, ScrollTrigger, MotionPathPlugin, useGSAP);

gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
});

ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
});

export const nodes = (...vals) =>
  vals.flatMap((value) => gsap.utils.toArray(value)).filter((el) => el && el.nodeType === 1);

export const onLayoutReady = (fn) => {
  let cancelled = false;
  let done = false;
  let raf1 = 0;
  let raf2 = 0;

  const run = () => {
    if (cancelled || done) return;
    done = true;
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        if (!cancelled) fn();
      });
    });
  };

  const start = () => {
    const fonts = document.fonts?.ready ?? Promise.resolve();
    fonts.finally(() => {
      if (document.readyState === 'complete') run();
      else window.addEventListener('load', run, { once: true });
    });
  };

  start();
  const fallback = window.setTimeout(run, 1500);

  return () => {
    cancelled = true;
    window.removeEventListener('load', run);
    window.cancelAnimationFrame(raf1);
    window.cancelAnimationFrame(raf2);
    window.clearTimeout(fallback);
  };
};

export { gsap, ScrollTrigger, MotionPathPlugin, useGSAP };
