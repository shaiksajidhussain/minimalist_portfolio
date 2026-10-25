import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BlurHeading from '../components/BlurHeading';
import { useProjects } from '../projects';
import { usePageMeta } from '../usePageMeta';

const WorkPage = () => {
  const { projects, status } = useProjects();
  const [filter, setFilter] = useState('All');
  const categories = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.categoryLabel))],
    [projects]
  );
  const visible = filter === 'All' ? projects : projects.filter((project) => project.categoryLabel === filter);

  usePageMeta({
    title: 'Work | Sajid',
    description: 'Selected websites, applications, and personal builds from Sajid.',
    path: '/work',
  });

  return (
    <Layout>
      <header className="wrap page-hero">
        <p className="kicker">Work</p>
        <BlurHeading as="h1" className="page-title" text="Case studies and live products." />
        <p className="lede reveal-after">
          Commissioned work is marked as a client project. Personal builds stay labeled as personal projects.
        </p>
        {categories.length > 2 ? (
          <div className="filters reveal-after" role="toolbar" aria-label="Filter projects">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        ) : null}
      </header>
      <div className="wrap" style={{ paddingBottom: '5rem' }}>
        {status === 'loading' ? <p className="prose">Loading projects…</p> : null}
        {status === 'error' ? <p className="prose">The project list could not be loaded. Refresh the page to try again.</p> : null}
        {status === 'empty' ? <p className="prose">No published projects yet.</p> : null}
        <div className="work-grid">
          {visible.map((project) => (
            <article key={project.slug} className="work-card">
              <Link to={`/work/${project.slug}`}>
                <div className="frame">
                  {project.images[0] ? <img src={project.images[0]} alt="" /> : null}
                </div>
                <div className="meta">
                  <span>{project.categoryLabel}</span>
                  <span>{project.kind}</span>
                </div>
                <h3>{project.name}</h3>
                <p className="prose">{project.summary}</p>
                <span className="btn btn-ghost card-btn">
                  <span className="label-idle">View project</span>
                  <span className="label-hover">Open case study</span>
                </span>
              </Link>
              {project.stack.length ? (
                <p className="meta">
                  <span>{project.stack.slice(0, 3).join(' · ')}</span>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WorkPage;
