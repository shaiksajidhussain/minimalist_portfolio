const SnapRail = ({ children, cols = 'md:grid-cols-2 lg:grid-cols-4' }) => {
  return (
    <div
      data-lenis-prevent
      className={`liquid-rail flex gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory px-4 -mx-4 pb-3 md:mx-0 md:px-0 md:grid ${cols} md:gap-5 md:overflow-visible md:snap-none`}
    >
      {children}
    </div>
  );
};

export default SnapRail;
