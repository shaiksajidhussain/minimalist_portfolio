const LiquidField = () => {
  return (
    <div className="liquid-field" aria-hidden>
      <div className="ink-glow">
        <div className="ink-glow-beam" />
        <div className="ink-glow-base" />
        <div className="ink-glow-grain" />
      </div>
      <div className="liquid-blob liquid-blob-a" />
      <div className="liquid-blob liquid-blob-b" />
      <div className="liquid-blob liquid-blob-c" />

      <svg className="glass-cut-defs" width="0" height="0" aria-hidden>
        <defs>
          <clipPath id="glass-cut-sheet" clipPathUnits="objectBoundingBox">
            <path d="M0.055 0 H0.72 C0.78 0 0.8 0.018 0.8 0.055 V0.12 C0.8 0.155 0.822 0.175 0.86 0.175 H0.945 C0.985 0.175 1 0.2 1 0.245 V0.945 C1 0.985 0.97 1 0.93 1 H0.055 C0.018 1 0 0.975 0 0.94 V0.055 C0 0.018 0.02 0 0.055 0 Z" />
          </clipPath>
          <clipPath id="glass-cut-card" clipPathUnits="objectBoundingBox">
            <path d="M0.07 0 H0.93 C0.98 0 1 0.04 1 0.09 V0.78 C1 0.82 0.97 0.86 0.9 0.86 H0.78 C0.73 0.86 0.7 0.89 0.7 0.94 V0.97 C0.7 1 0.67 1 0.62 1 H0.07 C0.02 1 0 0.96 0 0.91 V0.09 C0 0.04 0.02 0 0.07 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <svg className="glass-cut-frame" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect className="glass-cut-outer" x="1.1" y="1.2" width="97.8" height="97.6" rx="3.8" />
        <path
          className="glass-cut-inner"
          d="M4.2 5.4 H78.5 C82.2 5.4 83.4 7.1 83.4 9.6 V16.2 C83.4 18.6 85.2 20.2 88.4 20.2 H95.4 C97.6 20.2 98.6 21.8 98.6 24.4 V93.2 C98.6 96.2 96.4 98 93.2 98 H6.8 C4.2 98 3.2 96 3.2 93.4 V8.8 C3.2 6.4 3.8 5.4 4.2 5.4 Z"
        />
      </svg>
    </div>
  );
};

export default LiquidField;
