import { useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiGithub, FiMaximize2, FiX } from 'react-icons/fi';
import config from '../config/api';

const formatCopy = (value) => {
  if (!value) return '';
  return String(value)
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const techList = (project) => {
  if (Array.isArray(project.tech)) return project.tech;
  if (typeof project.tech === 'string') {
    return project.tech.split(',').map((item) => item.trim()).filter(Boolean);
  }
  if (Array.isArray(project.technologies)) return project.technologies;
  return [];
};

const ProjectDetail = ({ project, allProjects, onClose, onNext, onPrevious }) => {
  const overlayRef = useRef(null);
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      if (!project?._id) {
        setProjectData(project);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${config.baseUrl}/projects/${project._id}`);
        const data = await response.json();
        if (!cancelled) setProjectData(data);
      } catch {
        if (!cancelled) setProjectData(project);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [project]);

  useEffect(() => {
    overlayRef.current?.scrollTo({ top: 0 });
    overlayRef.current?.parentElement?.scrollTo({ top: 0 });
  }, [project?.name, project?._id]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        if (fullscreenImage) setFullscreenImage(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreenImage, onClose]);

  if (!project || loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[var(--cream)]">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          Loading project...
        </p>
      </div>
    );
  }

  const displayProject = projectData || project;
  const heroImage = displayProject.image || displayProject.image1;
  const galleryImages = [
    displayProject.image1,
    displayProject.image2,
    displayProject.image3,
    displayProject.image4,
  ].filter((image) => image && image !== heroImage);
  const tech = techList(displayProject);
  const currentIndex = allProjects.findIndex((item) => item.name === project.name);
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];
  const copy = formatCopy(displayProject.description);

  return (
    <div ref={overlayRef} className="min-h-full bg-[var(--cream)] text-[var(--ink)]" data-lenis-prevent>
      {fullscreenImage ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[var(--ink)]/92 p-4"
          data-lenis-prevent
          onClick={() => setFullscreenImage(null)}
        >
          <button
            type="button"
            onClick={() => setFullscreenImage(null)}
            className="absolute right-6 top-6 rounded-full border border-white/20 p-2 text-white hover:bg-white/10"
            aria-label="Close fullscreen"
          >
            <FiX size={24} />
          </button>
          <img
            src={fullscreenImage}
            alt=""
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}

      <div className="mx-auto max-w-5xl px-6 pb-28 pt-10 sm:px-10 sm:pt-12">
        <div className="mb-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-[var(--ink)]"
          >
            <FiArrowLeft size={16} />
            Back to work
          </button>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--gold)]">
            {String(Math.max(currentIndex, 0) + 1).padStart(2, '0')}
            {allProjects.length ? ` / ${String(allProjects.length).padStart(2, '0')}` : ''}
          </p>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          {displayProject.category || 'Work'}
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          {displayProject.name}
        </h1>

        {heroImage ? (
          <figure className="work-frame relative mt-10">
            <div
              className="gold-plate pointer-events-none absolute inset-y-8 left-12 -right-4 sm:-right-6"
              aria-hidden
            />
            <button
              type="button"
              onClick={() => setFullscreenImage(heroImage)}
              className="group relative block w-full overflow-hidden rounded-[1.2rem] border-[10px] border-[var(--card)] shadow-[0_24px_60px_rgba(28,25,23,0.12)]"
            >
              <img
                src={heroImage}
                alt={displayProject.name}
                className="aspect-[16/10] w-full bg-[var(--blob-b)]/40 object-cover"
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[var(--ink)]/0 opacity-0 transition-opacity group-hover:bg-[var(--ink)]/25 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--card)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink)]">
                  <FiMaximize2 size={14} />
                  Fullscreen
                </span>
              </span>
            </button>
          </figure>
        ) : null}

        <div className="mt-14 grid grid-cols-12 gap-x-10 gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">About this project</h2>
            {copy ? (
              <p className="mt-6 whitespace-pre-wrap text-[1.1rem] leading-[1.7] text-[var(--ink-soft)]">
                {copy}
              </p>
            ) : null}

            {displayProject.testimonial ? (
              <blockquote className="mt-10 border-t border-[var(--line)] pt-8 font-serif text-2xl italic leading-snug text-[var(--ink)]">
                “{displayProject.testimonial}”
              </blockquote>
            ) : null}
          </div>

          <aside className="col-span-12 lg:col-span-4">
            <dl className="space-y-6 border-t border-[var(--line)] pt-6 lg:border-t-0 lg:pt-0">
              {displayProject.client ? (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    Client
                  </dt>
                  <dd className="mt-2 font-serif text-2xl">{displayProject.client}</dd>
                </div>
              ) : null}
              {displayProject.result ? (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    Result
                  </dt>
                  <dd className="mt-2 text-[1.05rem] text-[var(--ink)]">{displayProject.result}</dd>
                </div>
              ) : null}
              {tech.length ? (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    Stack
                  </dt>
                  <dd className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--gold)]">
                    {tech.join(' · ')}
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-8 flex flex-col gap-3">
              {displayProject.liveLink && displayProject.liveLink !== '#' ? (
                <a
                  href={displayProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--cream)] transition-colors hover:bg-[var(--ink)]/90"
                >
                  View live
                  <FiExternalLink size={14} />
                </a>
              ) : null}
              {displayProject.githubLink && displayProject.githubLink !== '#' ? (
                <a
                  href={displayProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink)] transition-colors hover:border-[var(--gold)]"
                >
                  GitHub
                  <FiGithub size={14} />
                </a>
              ) : null}
            </div>
          </aside>
        </div>

        {galleryImages.length ? (
          <div className="mt-16 border-t border-[var(--line)] pt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              Gallery
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setFullscreenImage(image)}
                  className="group overflow-hidden rounded-[1.1rem] border-[8px] border-[var(--card)] shadow-[0_16px_40px_rgba(28,25,23,0.10)]"
                >
                  <img
                    src={image}
                    alt=""
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {allProjects.length > 1 ? (
          <div className="mt-16 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-8">
            <button
              type="button"
              onClick={onPrevious}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-[var(--ink)]"
            >
              <FiArrowLeft size={14} />
              Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2 text-right font-serif text-2xl tracking-tight text-[var(--ink)] transition-colors hover:text-[var(--gold)] sm:text-3xl"
            >
              {nextProject?.name}
              <FiArrowRight size={18} className="shrink-0" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectDetail;
