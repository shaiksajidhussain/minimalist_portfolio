const Arrow = () => (
  <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const marks = {
  websites: (
    <>
      <rect className="mark-line" x="8" y="16" width="56" height="40" rx="6" />
      <path className="mark-line" d="M8 28h56" />
      <path className="mark-draw" d="M18 40h22M18 48h14" />
    </>
  ),
  'web-apps': (
    <>
      <rect className="mark-line" x="10" y="12" width="24" height="48" rx="4" />
      <rect className="mark-line" x="38" y="12" width="24" height="22" rx="4" />
      <rect className="mark-draw" x="38" y="38" width="24" height="22" rx="4" />
    </>
  ),
  mobile: (
    <>
      <rect className="mark-line" x="22" y="8" width="28" height="56" rx="6" />
      <path className="mark-line" d="M30 16h12" />
      <circle className="mark-dot" cx="36" cy="56" r="2" />
    </>
  ),
  growth: (
    <>
      <circle className="mark-dot" cx="18" cy="44" r="4" />
      <circle className="mark-dot" cx="36" cy="22" r="4" />
      <circle className="mark-dot" cx="54" cy="46" r="4" />
      <path className="mark-draw" d="M18 44 L36 22 L54 46" />
    </>
  ),
};

const ServiceMark = ({ id }) => (
  <svg className="service-mark" viewBox="0 0 72 72" aria-hidden="true">
    {marks[id] || marks.websites}
  </svg>
);

export { Arrow };
export default ServiceMark;
