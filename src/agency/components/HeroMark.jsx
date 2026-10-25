import { useEffect, useRef } from 'react';

const Orbit = () => (
  <>
    <ellipse className="stroke-soft" cx="430" cy="330" rx="248" ry="92" transform="rotate(-18 430 330)" />
    <circle className="stroke" cx="458" cy="292" r="148" />
    <circle className="fill" cx="392" cy="246" r="84" />
    <rect className="beam-bar" x="206" y="148" width="14" height="246" rx="7" />
    <circle className="solid" cx="598" cy="198" r="7" />
    <circle className="solid" cx="292" cy="438" r="5" />
    <path className="stroke" d="M236 164h92" />
    <path className="stroke-soft" d="M508 438c48 28 104 30 156 4" />
  </>
);

const Signal = () => (
  <>
    <path className="stroke-soft" d="M128 548C214 236 452 78 682 128" />
    <path className="stroke" d="M164 508C228 246 430 124 646 156" />
    <path className="stroke" d="M206 456C258 286 404 198 568 214" />
    <circle className="fill" cx="430" cy="312" r="78" />
    <circle className="solid" cx="430" cy="312" r="9" />
    <path className="beam" d="M430 214v50M430 360v50" />
    <path className="stroke" d="M248 312h72M540 312h78" />
    <circle className="solid" cx="620" cy="168" r="5" />
  </>
);

const Lattice = () => (
  <>
    <rect className="stroke" x="168" y="108" width="292" height="392" />
    <rect className="fill" x="286" y="188" width="292" height="392" />
    <circle className="stroke" cx="508" cy="268" r="86" />
    <path className="beam" d="M322 84v520" />
    <path className="stroke-soft" d="M112 348h548" />
    <path className="stroke" d="M168 108l118 80" />
    <circle className="solid" cx="508" cy="268" r="6" />
  </>
);

const Planes = () => (
  <>
    <g transform="rotate(9 300 280)">
      <rect className="fill" x="148" y="78" width="268" height="404" />
    </g>
    <g transform="rotate(-6 470 330)">
      <rect className="fill" x="312" y="128" width="286" height="418" />
    </g>
    <ellipse className="stroke" cx="438" cy="342" rx="228" ry="70" />
    <rect className="beam-bar" x="228" y="168" width="10" height="228" />
    <circle className="solid dim" cx="478" cy="286" r="68" />
  </>
);

const MARKS = {
  orbit: Orbit,
  signal: Signal,
  lattice: Lattice,
  planes: Planes,
};

const HeroMark = ({ id, pointer }) => {
  const node = useRef(null);
  const Mark = MARKS[id] || Orbit;

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const loop = (time) => {
      const x = pointer.current?.x || 0;
      const y = pointer.current?.y || 0;
      const bob = reduce ? 0 : Math.sin(time / 900) * 8;
      if (node.current) {
        node.current.style.transform = `translate3d(${x * 22}px, ${y * 14 + bob}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [pointer]);

  return (
    <div className="hero-mark" ref={node} aria-hidden="true">
      <svg className="hero-svg mark-svg" viewBox="0 0 760 700">
        <Mark />
      </svg>
    </div>
  );
};

export default HeroMark;
