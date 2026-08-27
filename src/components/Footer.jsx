import { useRef } from 'react';
import { useTextReveal } from '../hooks/useTextReveal.jsx';

const Footer = () => {
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  return (
    <footer ref={sectionRef} className="relative border-t border-white/40 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500">
        <p data-reveal-copy>© {new Date().getFullYear()} Shaik Sajid Hussain</p>
        <p data-reveal-copy>Built for the work, not the noise.</p>
      </div>
    </footer>
  );
};

export default Footer;
