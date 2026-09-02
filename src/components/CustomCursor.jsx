import { useEffect, useRef } from 'react';

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, .hero-letter, .nav-link';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let hovering = false;
    let visible = false;
    let raf = 0;

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        root.classList.add('cursor-on');
      }
    };

    const onOver = (event) => {
      hovering = Boolean(event.target?.closest?.(HOVER_SELECTOR));
      root.classList.toggle('cursor-hover', hovering);
    };

    const onLeave = () => {
      visible = false;
      root.classList.remove('cursor-on', 'cursor-hover');
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      const scale = hovering ? 1.65 : 1;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      root.classList.remove('has-custom-cursor', 'cursor-hover', 'cursor-on');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="site-cursor site-cursor-ring" aria-hidden />
      <div ref={dotRef} className="site-cursor site-cursor-dot" aria-hidden />
    </>
  );
};

export default CustomCursor;
