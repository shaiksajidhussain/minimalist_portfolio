import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import BlurHeading from '../components/BlurHeading';
import { paragraphs, useProjects } from '../projects';
import { usePageMeta } from '../usePageMeta';

const CaseStudyPage = () => {
  const { slug } = useParams();
  const { projects, status } = useProjects();
  const project = projects.find((item) => item.slug === slug);
  const related = projects.filter((item) => item.slug !== slug).slice(0, 2);
  const copy = project ? paragraphs(project.description) : [];

  usePageMeta({
    title: project ? `${project.name} | Sajid` : 'Case study | Sajid',
    description: project?.summary || 'A Sajid project case study.',
    path: `/work/${slug || ''}`,
  });

  return (
    <Layout>
      <article className="wrap page-hero">
        {status === 'loading' ? <p className="prose">Loading project…</p> : null}
        {status !== 'loading' && !project ? (
          <div>
            <p className="kicker">Work</p>
            <BlurHeading as="h1" className="page-title" text="This project is not on the record." />
            <div className="actions">
              <Link className="btn btn-solid" to="/work">
                Back to work
              </Link>
            </div>
          </div>
        ) : null}
        {project ? (
          <>
            <p className="kicker">{project.kind}</p>
            <BlurHeading as="h1" className="page-title" text={project.name} />
            <p className="lede">{project.summary}</p>
            <div className="cover frame">
              {project.images[0] ? (
                <img src={project.images[0]} alt={`${project.name} cover`} />
              ) : null}
            </div>
            <div className="case-layout" style={{ marginTop: '3rem' }}>
              <div className="prose">
                {copy.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
                {project.images.length > 1 ? (
                  <div className="gallery">
                    {project.images.slice(1).map((src) => (
                      <figure key={src}>
                        <img src={src} alt="" />
                      </figure>
                    ))}
                  </div>
                ) : null}
              </div>
              <aside className="side-card">
                <p className="kicker">Record</p>
                <p>{project.categoryLabel}</p>
                {project.clientName ? <p>Client: {project.clientName}</p> : <p>Client name not published.</p>}
                {project.stack.length ? (
                  <div className="chips">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                ) : null}
                {project.live ? (
                  <a className="btn btn-solid" href={project.live} target="_blank" rel="noreferrer">
                    Visit live site
                  </a>
                ) : null}
                {project.repo ? (
                  <a className="btn btn-ghost" href={project.repo} target="_blank" rel="noreferrer">
                    Repository
                  </a>
                ) : null}
                <p>No performance figures are shown unless a future record includes a source for them.</p>
              </aside>
            </div>
            {related.length ? (
              <div style={{ marginTop: '4rem' }}>
                <p className="kicker">Related</p>
                <div className="work-grid">
                  {related.map((item) => (
                    <Link key={item.slug} to={`/work/${item.slug}`} className="work-card">
                      <div className="frame">
                        {item.images[0] ? <img src={item.images[0]} alt="" /> : null}
                      </div>
                      <h3>{item.name}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="actions">
              <Link className="btn btn-ghost" to="/contact">
                Discuss a similar project
              </Link>
            </div>
          </>
        ) : null}
      </article>
    </Layout>
  );
};

export default CaseStudyPage;
