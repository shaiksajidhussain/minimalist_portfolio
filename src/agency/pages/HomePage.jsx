import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../../lib/gsap';
import Layout from '../components/Layout';
import HeroStage from '../components/HeroStage';
import BlurHeading from '../components/BlurHeading';
import WorkRail from '../components/WorkRail';
import ServiceMark, { Arrow } from '../components/ServiceMark';
import { BRAND, CLIENTS, EXPERIENCE, HOW, SERVICES, SKILL_GROUPS, WHY } from '../content';
import { useProjects } from '../projects';
import { usePageMeta } from '../usePageMeta';

const HomePage = () => {
  const pageRef = useRef(null);
  const featuredSlug = useRef(null);
  const { projects, status } = useProjects();
  if (projects.length && featuredSlug.current == null) {
    featuredSlug.current = projects[Math.floor(Math.random() * projects.length)].slug;
  }
  const featured = projects.find((project) => project.slug === featuredSlug.current);
  const selected = projects.slice(0, 6);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return undefined;

      gsap.set('.service-row, .reason-list li, .process-list li, .record-list > li, .card-grid article, .skill-grid article', {
        autoAlpha: 1,
        clearProps: 'opacity,visibility',
      });

      gsap.utils.toArray('.service-row, .reason-list li, .process-list li, .record-list > li, .card-grid article, .skill-grid article').forEach((row) => {
        gsap.fromTo(
          row,
          { y: 18 },
          {
            y: 0,
            duration: 1.15,
            ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 90%' },
          }
        );
      });

      return undefined;
    },
    { scope: pageRef }
  );

  usePageMeta({
    title: `${BRAND.name} | Websites, apps, and growth`,
    description:
      'Sajid designs and builds websites, web and mobile applications, and the marketing that brings the right clients to them.',
    path: '/',
  });

  return (
    <Layout>
      <div ref={pageRef}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="status">
            <i />
            Studio open for new projects
          </p>
          <p className="kicker">{BRAND.label}</p>
          <BlurHeading
            as="h1"
            id="hero-title"
            className="display"
            lines={['Build sharper', 'digital', 'products.']}
          />
          <p className="lede reveal-after">
            Sajid designs and builds websites, web and mobile applications, and the marketing
            around them for founders and growing companies.
          </p>
          <div className="actions reveal-after">
            <Link className="btn btn-ghost" to="/work">
              Explore Our Work
            </Link>
            <Link className="btn btn-solid" to="/contact">
              Start a Project
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <HeroStage />
      </section>

      <section className="section">
        <div className="wrap split reveal">
          <div>
            <p className="kicker">Studio</p>
            <BlurHeading as="h2" text="The work has to survive contact with a real business." />
          </div>
          <div className="prose">
            <p>
              Sajid is an independent practice for companies that need a site, a product, or a
              clearer path from attention to enquiry. Design and build stay in one conversation.
            </p>
            <p>
              If you are launching, replacing a site that no longer fits, or turning an internal
              process into software, start with the job the project has to do.
            </p>
          </div>
        </div>
      </section>

      <section className="work-rail">
        <div className="wrap work-head">
          <div>
            <p className="kicker">Selected work</p>
            <BlurHeading as="h2" text="Projects with a live record." />
          </div>
          <div>
            <p className="prose">
              Client projects and studio demonstrations stay labeled apart.
            </p>
            <div className="actions">
              <Link className="btn btn-ghost" to="/work">
                Explore Our Work
              </Link>
              <Link className="btn btn-solid" to="/contact">
                Start a Project
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        {status === 'loading' ? <p className="wrap prose">Loading projects…</p> : null}
        {status === 'error' ? (
          <p className="wrap prose">Project records are unavailable right now.</p>
        ) : null}
        <WorkRail projects={selected} />
      </section>

      <section className="section">
        <div className="wrap">
          <p className="kicker">Services</p>
          <BlurHeading as="h2" text="Four ways we take on a project." />
          <div style={{ marginTop: '2.5rem' }}>
            {SERVICES.map((service) => (
              <Link key={service.id} to={`/services#${service.id}`} className="service-row">
                <span className="service-lead">
                  <ServiceMark id={service.id} />
                  <span className="num">{service.number}</span>
                </span>
                <strong>{service.title}</strong>
                <p>{service.summary}</p>
                <span className="read">
                  <span className="read-idle">
                    Read
                    <Arrow />
                  </span>
                  <span className="read-hover">
                    Open
                    <Arrow />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="wrap split pin-split roles">
          <div className="pin-copy">
            <p className="kicker">Experience · 2022 — now</p>
            <BlurHeading as="h2" lines={["Roles", "I've held."]} />
            <p className="lede">
              From internships to leading a team of seven — the work, not the titles.
            </p>
          </div>
          <ol className="role-list">
            <span className="role-line-draw" aria-hidden="true" />
            {EXPERIENCE.map((item) => (
              <li key={item.company}>
                <div className="role-rail">
                  <span className="num">{item.number}</span>
                  <p className="role-when">{item.duration}</p>
                </div>
                <article className="role-card">
                  <h3>{item.company}</h3>
                  <p className="role-title">{item.role}</p>
                  <ul className="point-list">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="chips">
                    {item.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="wrap">
          <p className="kicker">Tech stack</p>
          <BlurHeading as="h2" text="Stacked by craft." />
          <div className="skill-grid">
            {SKILL_GROUPS.map((group) => (
              <article key={group.title}>
                <p className="num">{group.number}</p>
                <h3>{group.title}</h3>
                <div className="chips">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="clients">
        <div className="wrap">
          <p className="kicker">Clients</p>
          <BlurHeading as="h2" text="Who I work with." />
          <div className="card-grid">
            {CLIENTS.map((item) => (
              <article key={item.number}>
                <p className="num">
                  {item.number}
                  <span> / 06</span>
                </p>
                <h3>{item.title}</h3>
                <p className="prose">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="why">
        <div className="wrap split pin-split">
          <div className="pin-copy">
            <p className="kicker">Why me · The short list</p>
            <BlurHeading as="h2" lines={['Why choose', 'me.']} />
            <p className="lede">Not a pitch deck. The reasons people actually hire me to build.</p>
          </div>
          <ol className="record-list">
            {WHY.map((item) => (
              <li key={item.number}>
                <span className="num">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="prose">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="how">
        <div className="wrap split pin-split">
          <div className="pin-copy">
            <p className="kicker">Process · Four stages</p>
            <BlurHeading as="h2" lines={['How I', 'work.']} />
            <p className="lede">
              A short sequence from the first conversation to a live product — no mystery sprint in the middle.
            </p>
            <Link className="btn btn-ghost" to="/process">
              See the full process
            </Link>
          </div>
          <ol className="reason-list">
            {HOW.map((item) => (
              <li key={item.number}>
                <span className="num">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="prose">{item.text}</p>
                  <p className="note">{item.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {featured ? (
        <section className="section">
          <div className="wrap feature">
            <Link to={`/work/${featured.slug}`} className="frame" style={{ minHeight: 420 }}>
              {featured.images[0] ? <img src={featured.images[0]} alt="" /> : null}
            </Link>
            <div>
              <p className="kicker">Featured case study</p>
              <BlurHeading as="h2" text={featured.name} />
              <p className="lede">{featured.summary}</p>
              <div className="meta">
                <span>{featured.categoryLabel}</span>
                <span>{featured.kind}</span>
              </div>
              <div className="actions">
                <Link className="btn btn-solid" to={`/work/${featured.slug}`}>
                  Read the case study
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="wrap">
          <p className="kicker">Contact</p>
          <BlurHeading
            as="h2"
            className="display"
            style={{ fontSize: 'clamp(2.3rem, 4.6vw, 4rem)' }}
            text="Tell us what the project has to do."
          />
          <div className="actions">
            <Link className="btn btn-solid" to="/contact">
              Start a Project
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </Layout>
  );
};

export default HomePage;
