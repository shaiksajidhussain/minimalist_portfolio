import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BlurHeading from '../components/BlurHeading';
import InterfaceSketch from '../components/InterfaceSketch';
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
    const update = () => {
      const mark = window.innerHeight * 0.42;
      let current = nodes[0];
      nodes.forEach((node) => {
        if (node.getBoundingClientRect().top <= mark) current = node;
      });
      if (current?.dataset?.step) setActive(current.dataset.step);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <Layout>
      <header className="wrap page-hero services-hero">
        <div>
          <p className="kicker">Process</p>
          <BlurHeading as="h1" className="page-title" lines={['Six steps. No mystery', 'sprint in the middle.']} />
        </div>
        <InterfaceSketch variant="process" active={active} />
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
            <section
              key={step.number}
              id={`step-${step.number}`}
              className={active === step.number ? 'step is-current' : 'step'}
              data-step={step.number}
            >
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
