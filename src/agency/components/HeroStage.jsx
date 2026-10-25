import { useRef } from 'react';
import { MARKS, useLook } from '../look';
import HeroMark from './HeroMark';
import HeroScene from './HeroScene';

const PHOTO =
  'https://res.cloudinary.com/dgus6y6lm/image/upload/v1766677763/Sajid_Professional_vncuym.png';

const HeroStage = () => {
  const { mark, palette, setMark } = useLook();
  const frame = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const active = MARKS.find((item) => item.id === mark) || MARKS[0];

  const onMove = (event) => {
    const bounds = frame.current?.getBoundingClientRect();
    if (!bounds) return;
    pointer.current.x = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointer.current.y = (event.clientY - bounds.top) / bounds.height - 0.5;
  };

  const onLeave = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  const cycleMark = () => {
    const index = MARKS.findIndex((item) => item.id === mark);
    const next = MARKS[(index + 1) % MARKS.length];
    setMark(next.id);
  };

  return (
    <div className="hero-visual" ref={frame} onPointerMove={onMove} onPointerLeave={onLeave}>
      <p className="visual-label hero-arrive hero-arrive-label">Websites, apps, and marketing</p>
      <button
        type="button"
        className="hero-arrive hero-arrive-mark mark-switch"
        onClick={cycleMark}
        aria-label={`Graphic is ${active.name}. Click to change it.`}
      >
        {mark === 'glass' ? (
          <HeroScene pointer={pointer} active palette={palette} />
        ) : (
          <HeroMark id={mark} pointer={pointer} />
        )}
        <span className="mark-hint">Change</span>
      </button>
      <figure className="portrait-frame hero-arrive hero-arrive-photo">
        <img src={PHOTO} alt="Shaik Sajid Hussain" />
      </figure>
    </div>
  );
};

export default HeroStage;
