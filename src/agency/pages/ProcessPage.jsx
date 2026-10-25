import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BlurHeading from '../components/BlurHeading';
import { PROCESS } from '../content';
import { usePageMeta } from '../usePageMeta';

const ProcessPage = () => {
  const [active, setActive] = useState(PROCESS[0].number);

  usePageMeta({
    title: 'Process | Sajid',
    description: 'How a Sajid project moves from discovery through launch and agreed follow-up.',
    path: '/process',
  });

  useEffect(() => {
    const nodes = PROCESS.map((step) => document.getElementById(`step-${step.number}`)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.dataset?.step) setActive(visible.target.dataset.step);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.2, 0.5] }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <header className="wrap page-hero">
        <p className="kicker">Process</p>
        <BlurHeading as="h1" className="page-title" lines={['Six steps. No mystery', 'sprint in the middle.']} />
      </header>
      <div className="wrap process-layout" style={{ paddingBottom: '4rem' }}>
        <nav className="process-index" aria-label="Process steps">
          {PROCESS.map((step) => (
            <a key={step.number} href={`#step-${step.number}`} className={active === step.number ? 'is-active' : ''}>
              {step.number} {step.title}
            </a>
          ))}
        </nav>
        <div>
          {PROCESS.map((step) => (
            <section key={step.number} id={`step-${step.number}`} className="step" data-step={step.number}>
              <p className="kicker">{step.number}</p>
              <h2>{step.title}</h2>
              <p className="lede">{step.text}</p>
            </section>
          ))}
          <Link className="btn btn-solid" to="/contact">
            Start a Project
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProcessPage;
