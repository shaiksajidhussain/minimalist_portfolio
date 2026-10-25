import { useId, useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

const lengthOf = (node) => {
  try {
    return node.getTotalLength();
  } catch {
    return 0;
  }
};

const InterfaceSketch = () => {
  const root = useRef(null);
  const uid = useId().replace(/:/g, '');
  const orbitId = `orbit-${uid}`;

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce || !root.current) return undefined;

      gsap.utils.toArray('.draw', root.current).forEach((node, index) => {
        const length = lengthOf(node);
        if (!length) return;
        gsap.set(node, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(node, {
          strokeDashoffset: 0,
          duration: 2.6,
          delay: 0.15 + index * 0.16,
          ease: 'power2.inOut',
        });
      });

      gsap.to('.float-card', {
        y: -10,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.node-ring', {
        scale: 1.08,
        transformOrigin: '50% 50%',
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      const orbit = root.current.querySelector('.orbit-path');
      const plane = root.current.querySelector('.plane-shape');
      const orbitData = orbit?.getAttribute('d');
      if (orbit && orbitData) {
        gsap.to(orbit, {
          strokeDashoffset: -640,
          duration: 22,
          repeat: -1,
          ease: 'none',
        });
      }
      if (orbitData && plane) {
        gsap.to(plane, {
          motionPath: {
            path: orbitData,
            align: orbit,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 22,
          repeat: -1,
          ease: 'none',
        });
      }

      return undefined;
    },
    { scope: root }
  );

  return (
    <div className="interface-sketch" ref={root} aria-hidden="true">
      <svg className="hero-svg" viewBox="150 30 600 560" fill="none">
        <path className="orbit-path" id={orbitId} d="M150 360A250 92 0 1 1 650 360A250 92 0 1 1 150 360" />
        <g className="float-card">
          <rect className="draw sketch-line" x="438" y="58" width="228" height="108" rx="18" />
          <line className="draw accent-stroke" x1="462" y1="88" x2="560" y2="88" />
          <line className="draw sketch-faint" x1="462" y1="112" x2="610" y2="112" />
          <line className="draw sketch-faint" x1="462" y1="132" x2="548" y2="132" />
        </g>
        <path className="draw sketch-line connector" d="M552 166 V248 H646" />
        <circle className="node-ring sketch-line" cx="646" cy="292" r="28" />
        <path className="draw accent-stroke" d="M646 278 v18" />
        <rect className="draw sketch-line" x="210" y="168" width="400" height="286" rx="22" />
        <circle className="dot" cx="242" cy="200" r="4.5" />
        <circle className="dot dim" cx="260" cy="200" r="4.5" />
        <circle className="dot dim" cx="278" cy="200" r="4.5" />
        <rect className="draw sketch-faint" x="306" y="190" width="180" height="20" rx="10" />
        <line className="draw sketch-faint" x1="242" y1="244" x2="430" y2="244" />
        <line className="draw sketch-faint" x1="242" y1="268" x2="360" y2="268" />
        <rect className="draw sketch-card" x="238" y="300" width="160" height="116" rx="16" />
        <line className="draw sketch-faint" x1="258" y1="332" x2="360" y2="332" />
        <line className="draw sketch-faint" x1="258" y1="356" x2="330" y2="356" />
        <rect className="draw sketch-card" x="418" y="300" width="164" height="116" rx="16" />
        <line className="draw accent-stroke" x1="438" y1="332" x2="546" y2="332" />
        <line className="draw sketch-faint" x1="438" y1="356" x2="510" y2="356" />
        <g className="plane-shape">
          <path d="M0 4.2 12.2 0 8.2 11.4 6.2 7.4 2.4 6.2 0 4.2Z" />
        </g>
      </svg>
    </div>
  );
};

export default InterfaceSketch;
