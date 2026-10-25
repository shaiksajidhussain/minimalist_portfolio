import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BlurHeading from '../components/BlurHeading';
import InterfaceSketch from '../components/InterfaceSketch';
import { BRAND, SERVICES } from '../content';
import { usePageMeta } from '../usePageMeta';

const ServicesPage = () => {
  usePageMeta({
    title: `Services | ${BRAND.name}`,
    description:
      'Website design and development, web applications, mobile apps, and digital marketing from Sajid.',
    path: '/services',
  });

  return (
    <Layout>
      <header className="wrap page-hero services-hero">
        <div>
          <p className="kicker">Services</p>
          <BlurHeading
            as="h1"
            className="page-title"
            lines={['Services shaped', 'around the work.']}
          />
          <p className="lede reveal-after">
            Four offers. Each one starts with the problem in the business, not a package of pages.
          </p>
        </div>
        <InterfaceSketch />
      </header>
      {SERVICES.map((service) => (
        <article key={service.id} id={service.id} className="wrap service-block">
          <div className="service-copy">
            <p className="kicker">{service.number}</p>
            <BlurHeading as="h2" text={service.title} />
            <p className="prose">{service.summary}</p>
            <div className="chips">
              {service.capabilities.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="actions">
              <Link className="btn btn-solid" to="/contact">
                Discuss this service
              </Link>
            </div>
          </div>
          <dl className="spec">
            <span className="spec-line" aria-hidden="true" />
            <div>
              <dt>The problem</dt>
              <dd className="prose">{service.problem}</dd>
            </div>
            <div>
              <dt>What we deliver</dt>
              <dd className="prose">{service.deliver}</dd>
            </div>
            <div>
              <dt>Approach</dt>
              <dd className="prose">{service.approach}</dd>
            </div>
            <div>
              <dt>Business value</dt>
              <dd className="prose">{service.value}</dd>
            </div>
          </dl>
        </article>
      ))}
    </Layout>
  );
};

export default ServicesPage;
