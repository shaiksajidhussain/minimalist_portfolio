import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const clamp = (value, max) => Math.min(Math.max(0, value), max);

const WorkRail = ({ projects }) => {
  const viewport = useRef(null);
  const target = useRef(0);
  const current = useRef(0);
  const drag = useRef(null);
  const moved = useRef(false);
  const holdUntil = useRef(0);
  const [canScroll, setCanScroll] = useState(false);

  const nudge = (direction) => {
    const el = viewport.current;
    if (!el) return;
    const card = el.querySelector('.work-card');
    const step = (card?.getBoundingClientRect().width || 420) + 16;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    target.current = clamp(target.current + direction * step, max);
    holdUntil.current = performance.now() + 900;
  };

  useEffect(() => {
    const el = viewport.current;
    if (!el) return undefined;

    const measure = () => {
      setCanScroll(el.scrollWidth - el.clientWidth > 8);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    const track = el.querySelector('.work-track');
    if (track) observer.observe(track);

    let frame = 0;
    const tick = () => {
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      target.current = clamp(target.current, max);
      current.current += (target.current - current.current) * 0.16;
      if (Math.abs(target.current - current.current) < 0.4) current.current = target.current;
      el.scrollLeft = current.current;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [projects]);

  const onPointerMove = (event) => {
    const el = viewport.current;
    if (!el || window.matchMedia('(max-width: 960px)').matches) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 8) return;

    if (drag.current) {
      const dx = event.clientX - drag.current.x;
      if (Math.abs(dx) > 6) moved.current = true;
      target.current = clamp(drag.current.scroll - dx, max);
      return;
    }

    if (event.pointerType === 'touch') return;
    if (performance.now() < holdUntil.current) return;
    const rect = el.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    target.current = clamp(ratio, 1) * max;
  };

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse') return;
    drag.current = { x: event.clientX, scroll: target.current };
    moved.current = false;
    viewport.current?.setPointerCapture?.(event.pointerId);
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  const onClickCapture = (event) => {
    if (!moved.current) return;
    event.preventDefault();
    event.stopPropagation();
    moved.current = false;
  };

  return (
    <div className="work-scroller">
      {canScroll ? (
        <button type="button" className="rail-btn prev" aria-label="Scroll work back" onClick={() => nudge(-1)}>
          <span aria-hidden="true">←</span>
        </button>
      ) : null}
      <div
        className="work-viewport"
        ref={viewport}
        data-lenis-prevent
        role="region"
        aria-label="Selected work. Move the cursor across the row to scroll."
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
      >
        <div className="work-track">
          {projects.map((project) => (
            <Link key={project.slug} to={`/work/${project.slug}`} className="work-card">
              <div className="frame">
                {project.images[0] ? <img src={project.images[0]} alt="" /> : null}
              </div>
              <div className="meta">
                <span>{project.categoryLabel}</span>
                <span>{project.kind}</span>
              </div>
              <h3>{project.name}</h3>
              <span className="btn btn-ghost card-btn">
                <span className="label-idle">View project</span>
                <span className="label-hover">Open case study</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      {canScroll ? (
        <button type="button" className="rail-btn next" aria-label="Scroll work forward" onClick={() => nudge(1)}>
          <span aria-hidden="true">→</span>
        </button>
      ) : null}
    </div>
  );
};

export default WorkRail;
