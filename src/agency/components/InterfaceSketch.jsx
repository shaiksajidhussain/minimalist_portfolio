import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

const lengthOf = (node) => {
  try {
    return node.getTotalLength();
  } catch {
    return 0;
  }
};

const ORBIT = 'M150 360A250 92 0 1 1 650 360A250 92 0 1 1 150 360';

const Plane = () => (
  <g className="plane-shape">
    <path d="M0 4.2 12.2 0 8.2 11.4 6.2 7.4 2.4 6.2 0 4.2Z" />
  </g>
);

const InterfaceArt = () => (
  <>
    <path className="orbit-path" d={ORBIT} />
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
    <Plane />
  </>
);

const WorkArt = () => (
  <>
    <path className="orbit-path" d={ORBIT} />
    <g className="float-card">
      <rect className="draw sketch-line" x="430" y="64" width="214" height="150" rx="16" />
      <rect className="draw sketch-card" x="448" y="82" width="178" height="86" rx="8" />
      <line className="draw accent-stroke" x1="448" y1="186" x2="560" y2="186" />
    </g>
    <rect className="draw sketch-line" x="196" y="168" width="250" height="176" rx="16" />
    <rect className="draw sketch-card" x="214" y="186" width="214" height="104" rx="8" />
    <line className="draw sketch-faint" x1="214" y1="312" x2="360" y2="312" />
    <rect className="draw sketch-line" x="292" y="292" width="236" height="168" rx="16" />
    <line className="draw sketch-faint" x1="314" y1="332" x2="486" y2="332" />
    <line className="draw sketch-faint" x1="314" y1="358" x2="430" y2="358" />
    <line className="draw accent-stroke" x1="314" y1="420" x2="420" y2="420" />
    <circle className="node-ring sketch-line" cx="560" cy="430" r="22" />
    <path className="draw accent-stroke" d="M548 430h24M560 418v24" />
    <Plane />
  </>
);

const AboutArt = () => (
  <>
    <path className="orbit-path" d={ORBIT} />
    <circle className="draw sketch-faint" cx="390" cy="286" r="168" />
    <circle className="draw sketch-line" cx="390" cy="286" r="112" />
    <circle className="draw sketch-card" cx="390" cy="268" r="34" />
    <path className="draw sketch-faint" d="M318 352c18 46 126 46 144 0" />
    <path className="draw accent-stroke" d="M300 430h180" />
    <g className="float-card">
      <rect className="draw sketch-line" x="470" y="72" width="176" height="92" rx="16" />
      <line className="draw sketch-faint" x1="492" y1="104" x2="610" y2="104" />
      <line className="draw accent-stroke" x1="492" y1="128" x2="566" y2="128" />
    </g>
    <circle className="node-ring sketch-line" cx="214" cy="168" r="18" />
    <circle className="dot" cx="214" cy="168" r="4" />
    <circle className="dot dim" cx="560" cy="470" r="5" />
    <Plane />
  </>
);

const ContactArt = () => (
  <>
    <path className="orbit-path" d={ORBIT} />
    <rect className="draw sketch-line" x="210" y="168" width="360" height="230" rx="20" />
    <path className="draw accent-stroke" d="M210 196 L390 318 L570 196" />
    <line className="draw sketch-faint" x1="250" y1="250" x2="430" y2="250" />
    <line className="draw sketch-faint" x1="250" y1="278" x2="390" y2="278" />
    <g className="float-card">
      <rect className="draw sketch-line" x="430" y="62" width="210" height="108" rx="18" />
      <line className="draw accent-stroke" x1="454" y1="96" x2="560" y2="96" />
      <line className="draw sketch-faint" x1="454" y1="122" x2="590" y2="122" />
      <line className="draw sketch-faint" x1="454" y1="142" x2="530" y2="142" />
    </g>
    <path className="draw sketch-line connector" d="M534 170 V230" />
    <circle className="node-ring sketch-line" cx="612" cy="430" r="24" />
    <path className="draw accent-stroke" d="M600 430h24" />
    <Plane />
  </>
);

const PROCESS_NODES = [
  [230, 150],
  [470, 150],
  [470, 270],
  [230, 270],
  [230, 400],
  [470, 400],
];

const ProcessArt = ({ active = '01' }) => {
  const index = Math.max(0, Number(active) - 1);
  const [x, y] = PROCESS_NODES[index] || PROCESS_NODES[0];
  return (
    <>
      <path className="orbit-path" d={ORBIT} />
      <path className="draw sketch-line" d="M230 150 H470 V270 H230 V400 H470" />
      {PROCESS_NODES.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} className="draw sketch-line" cx={cx} cy={cy} r="16" />
      ))}
      <circle className="step-hot" cx={x} cy={y} r="7" />
      <g className="float-card">
        <rect className="draw sketch-line" x="430" y="58" width="196" height="96" rx="16" />
        <line className="draw accent-stroke" x1="454" y1="90" x2="560" y2="90" />
        <line className="draw sketch-faint" x1="454" y1="116" x2="580" y2="116" />
      </g>
      <circle className="node-ring sketch-line" cx="620" cy="470" r="18" />
      <Plane />
    </>
  );
};

const ARTS = {
  interface: InterfaceArt,
  work: WorkArt,
  about: AboutArt,
  contact: ContactArt,
  process: ProcessArt,
};

const InterfaceSketch = ({ variant = 'interface', active = '01' }) => {
  const root = useRef(null);
  const Art = ARTS[variant] || InterfaceArt;

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
        <Art active={active} />
      </svg>
    </div>
  );
};

export default InterfaceSketch;
