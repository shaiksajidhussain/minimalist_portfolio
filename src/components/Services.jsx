import { useEffect, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';
import StyleDock, { useSectionInView } from './StyleDock';
import IndexPin from './services/IndexPin';
import SplitPin from './services/SplitPin';
import UnfoldPin from './services/UnfoldPin';

const STYLES = [
  { id: 'index', label: 'Index', Component: IndexPin },
  { id: 'split', label: 'Split', Component: SplitPin },
  { id: 'unfold', label: 'Unfold', Component: UnfoldPin },
];

const VALID = new Set(STYLES.map((style) => style.id));

const Services = () => {
  const inView = useSectionInView('services');
  const [styleId, setStyleId] = useState(() => {
    if (typeof window === 'undefined') return 'index';
    const stored = localStorage.getItem('services-style');
    return VALID.has(stored) ? stored : 'index';
  });

  useEffect(() => {
    localStorage.setItem('services-style', styleId);
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [styleId]);

  const Active = STYLES.find((style) => style.id === styleId)?.Component || IndexPin;

  return (
    <div id="services" className="relative">
      <Active />
      <StyleDock
        styles={STYLES}
        styleId={styleId}
        onChange={setStyleId}
        visible={inView}
        offset={4}
      />
    </div>
  );
};

export default Services;
