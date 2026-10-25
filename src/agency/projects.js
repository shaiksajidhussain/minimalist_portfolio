import { useEffect, useState } from 'react';
import config from '../config/api';

export const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const plainText = (value) =>
  String(value || '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

export const paragraphs = (value) =>
  plainText(value)
    .split(/\n{2,}/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

export const externalUrl = (value) => {
  if (!value || value === '#') return '';
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
    return url.href;
  } catch {
    return '';
  }
};

export const techList = (project) => {
  const raw = project?.tech ?? project?.technologies ?? [];
  const items = Array.isArray(raw) ? raw : String(raw).split(',');
  return items
    .flatMap((item) => String(item).split(/[·|,]/))
    .map((item) => item.trim())
    .filter((item, index, list) => item && list.indexOf(item) === index);
};

export const galleryOf = (project) => {
  const sources = [project?.image, project?.image1, project?.thumbnail, project?.image2, project?.image3, project?.image4];
  return sources.filter((src, index) => src && sources.indexOf(src) === index);
};

export const categoryOf = (project) => {
  const value = String(project?.category || '').trim();
  if (!value || value.toLowerCase() === 'all') {
    if (/personal/i.test(project?.client || '')) return 'Personal Projects';
    return 'Web Development';
  }
  return value;
};

export const projectKind = (project) => {
  const client = String(project?.client || '').trim();
  const category = String(project?.category || '').toLowerCase();
  if (!client || /personal/i.test(client) || category.includes('personal')) return 'Studio demonstration';
  return 'Client project';
};

export const clientLabel = (project) => {
  if (projectKind(project) !== 'Client project') return '';
  return String(project.client || '').trim();
};

export const normalizeProject = (project, index) => ({
  ...project,
  slug: slugify(project.name) || `project-${index + 1}`,
  summary: paragraphs(project.description)[0] || 'Project notes are still being written.',
  kind: projectKind(project),
  clientName: clientLabel(project),
  categoryLabel: categoryOf(project),
  stack: techList(project),
  images: galleryOf(project),
  live: externalUrl(project.liveLink),
  repo: externalUrl(project.githubLink),
});

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/projects`);
        if (!response.ok) throw new Error('Request failed');
        const data = await response.json();
        const seen = new Map();
        const list = (Array.isArray(data) ? data : [])
          .slice()
          .sort((a, b) => (a.orderNumber ?? a.order ?? 0) - (b.orderNumber ?? b.order ?? 0))
          .map(normalizeProject)
          .map((project) => {
            const count = seen.get(project.slug) || 0;
            seen.set(project.slug, count + 1);
            if (!count) return project;
            return { ...project, slug: `${project.slug}-${count + 1}` };
          });
        if (!cancelled) {
          setProjects(list);
          setStatus(list.length ? 'ready' : 'empty');
        }
      } catch {
        if (!cancelled) {
          setProjects([]);
          setStatus('error');
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, status };
};
