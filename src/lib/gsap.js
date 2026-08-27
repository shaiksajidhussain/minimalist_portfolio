import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
});

ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
});

export const onLayoutReady = (fn) => {
  let called = false;
  let raf1 = 0;
  let raf2 = 0;
  let timeout = 0;

  const run = () => {
    if (called) return;
    called = true;
    fn();
  };

  if (document.readyState === 'complete') {
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(run);
    });
  } else {
    window.addEventListener('load', run, { once: true });
  }

  timeout = window.setTimeout(run, 400);
  document.fonts?.ready?.then(run);

  return () => {
    called = true;
    window.removeEventListener('load', run);
    window.cancelAnimationFrame(raf1);
    window.cancelAnimationFrame(raf2);
    window.clearTimeout(timeout);
  };
};

export { gsap, ScrollTrigger, MotionPathPlugin, useGSAP };
