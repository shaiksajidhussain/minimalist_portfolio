import { useRef } from 'react';
import { useTextReveal } from '../hooks/useTextReveal.jsx';

const Footer = () => {
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  return (
    <footer ref={sectionRef} className="relative border-t border-white/40 py-10 px-4">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-[var(--muted)] sm:flex-row">
        <p data-reveal-copy>© {new Date().getFullYear()} Shaik Sajid Hussain</p>
        <p data-reveal-copy>Built for the work, not the noise.</p>
      </div>
    </footer>
  );
};

export default Footer;
