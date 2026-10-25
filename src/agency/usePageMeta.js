import { useEffect } from 'react';

const SITE = String(import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '');

const ensureMeta = (attribute, key) => {
  let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attribute, key);
    document.head.appendChild(node);
  }
  return node;
};

export const usePageMeta = ({ title, description, path = '/' }) => {
  useEffect(() => {
    document.title = title;
    ensureMeta('name', 'description').setAttribute('content', description);
    ensureMeta('property', 'og:title').setAttribute('content', title);
    ensureMeta('property', 'og:description').setAttribute('content', description);
    ensureMeta('property', 'og:type').setAttribute('content', 'website');
    ensureMeta('name', 'twitter:card').setAttribute('content', 'summary_large_image');

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (!SITE) {
      canonical?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
      return;
    }

    const url = `${SITE}${path === '/' ? '' : path}`;
    ensureMeta('property', 'og:url').setAttribute('content', url);
    const link = canonical || document.head.appendChild(document.createElement('link'));
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
  }, [title, description, path]);
};

export const siteUrl = SITE;
