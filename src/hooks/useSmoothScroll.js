import { useLenis } from 'lenis/react';

export const useSmoothScroll = () => {
  const lenis = useLenis();

  return (target, options = {}) => {
    if (!target) return;

    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    if (lenis) {
      lenis.scrollTo(element, { offset: -72, duration: 0.9, ...options });
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
};
