import { gsap, useGSAP } from '../lib/gsap';

export const useLetterPop = (scopeRef) => {
  useGSAP(
    (_, contextSafe) => {
      const letters = scopeRef.current?.querySelectorAll('[data-letter]');
      if (!letters?.length) return;

      const cleanups = [];

      letters.forEach((letter) => {
        gsap.set(letter, { transformOrigin: '50% 85%' });

        const letterIn = contextSafe(() => {
          gsap.to(letter, {
            y: -12,
            scale: 1.14,
            zIndex: 8,
            duration: 0.3,
            ease: 'back.out(1.6)',
            overwrite: 'auto',
          });
        });

        const letterOut = contextSafe(() => {
          gsap.to(letter, {
            y: 0,
            scale: 1,
            zIndex: 1,
            duration: 0.24,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });

        letter.addEventListener('pointerenter', letterIn);
        letter.addEventListener('pointerleave', letterOut);
        cleanups.push(() => {
          letter.removeEventListener('pointerenter', letterIn);
          letter.removeEventListener('pointerleave', letterOut);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: scopeRef }
  );
};
