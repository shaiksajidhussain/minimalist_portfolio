import { createContext, createElement, useContext, useLayoutEffect, useMemo, useState } from 'react';

export const THEMES = [
  {
    id: 'violet',
    name: 'Violet',
    swatch: '#536dff',
    accent: '#536dff',
    violet: '#8b5cf6',
    stroke: '#e7eeff',
    panel: '#eef2ff',
    glow: '#b7c6ff',
  },
  {
    id: 'copper',
    name: 'Copper',
    swatch: '#d4894a',
    accent: '#d4894a',
    violet: '#c46a3a',
    stroke: '#f7e4ce',
    panel: '#f8efe6',
    glow: '#e2b07a',
  },
  {
    id: 'tide',
    name: 'Tide',
    swatch: '#2fbfa3',
    accent: '#2fbfa3',
    violet: '#1f8f8a',
    stroke: '#d6f4ea',
    panel: '#e7f6f1',
    glow: '#7ddec8',
  },
  {
    id: 'rose',
    name: 'Rose',
    swatch: '#e06b8c',
    accent: '#e06b8c',
    violet: '#a84b78',
    stroke: '#ffe2ea',
    panel: '#fde8ee',
    glow: '#f0a0b8',
  },
  {
    id: 'ice',
    name: 'Ice',
    swatch: '#5eb4d8',
    accent: '#5eb4d8',
    violet: '#6f8cff',
    stroke: '#e2eef8',
    panel: '#e7f2f8',
    glow: '#9fd4ee',
  },
  {
    id: 'moss',
    name: 'Moss',
    swatch: '#5ea84a',
    accent: '#5ea84a',
    violet: '#3d7a45',
    stroke: '#dcecd6',
    panel: '#e7f3e4',
    glow: '#8fce7a',
  },
  {
    id: 'amber',
    name: 'Amber',
    swatch: '#e0a322',
    accent: '#e0a322',
    violet: '#c4842a',
    stroke: '#ffecc4',
    panel: '#f8efd8',
    glow: '#f0c14b',
  },
  {
    id: 'crimson',
    name: 'Crimson',
    swatch: '#e0455a',
    accent: '#e0455a',
    violet: '#a83248',
    stroke: '#ffdce0',
    panel: '#fde8ea',
    glow: '#f08a96',
  },
  {
    id: 'lime',
    name: 'Lime',
    swatch: '#b6d63a',
    accent: '#b6d63a',
    violet: '#7ea020',
    stroke: '#ecf4d2',
    panel: '#f3f8e0',
    glow: '#d6f25c',
  },
  {
    id: 'iris',
    name: 'Iris',
    swatch: '#7c6bff',
    accent: '#7c6bff',
    violet: '#5b4fd4',
    stroke: '#e6e2ff',
    panel: '#ece8ff',
    glow: '#b7a6ff',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    swatch: '#3d7dff',
    accent: '#3d7dff',
    violet: '#2450c8',
    stroke: '#dce7ff',
    panel: '#e7eeff',
    glow: '#8eb0ff',
  },
  {
    id: 'plum',
    name: 'Plum',
    swatch: '#c45ad4',
    accent: '#c45ad4',
    violet: '#8a3a9a',
    stroke: '#f6def8',
    panel: '#f8eafb',
    glow: '#e09ae8',
  },
  {
    id: 'graphite',
    name: 'Graphite',
    swatch: '#c5ccd6',
    accent: '#c5ccd6',
    violet: '#8b93a0',
    stroke: '#eef1f5',
    panel: '#f2f4f7',
    glow: '#d5dbe3',
  },
  {
    id: 'ember',
    name: 'Ember',
    swatch: '#ef6a2f',
    accent: '#ef6a2f',
    violet: '#c2410c',
    stroke: '#ffe4d4',
    panel: '#fdecdc',
    glow: '#ffb088',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    kind: 'gradient',
    swatch: 'linear-gradient(135deg, #7c6bff, #2fbfa3 55%, #e06b8c)',
    accent: '#7c6bff',
    violet: '#2fbfa3',
    stroke: '#e7eeff',
    panel: '#eef6f4',
    glow: '#b7c6ff',
  },
  {
    id: 'dusk',
    name: 'Dusk',
    kind: 'gradient',
    swatch: 'linear-gradient(135deg, #d4894a, #e0455a 50%, #7c6bff)',
    accent: '#e07a5a',
    violet: '#7c6bff',
    stroke: '#ffe4d8',
    panel: '#f8ece8',
    glow: '#f0a090',
  },
  {
    id: 'horizon',
    name: 'Horizon',
    kind: 'gradient',
    swatch: 'linear-gradient(135deg, #e0a322, #e06b8c 48%, #5eb4d8)',
    accent: '#e0a322',
    violet: '#5eb4d8',
    stroke: '#ffecc4',
    panel: '#f8f0e4',
    glow: '#f0c14b',
  },
  {
    id: 'nova',
    name: 'Nova',
    kind: 'gradient',
    swatch: 'linear-gradient(135deg, #b6d63a, #5eb4d8 52%, #7c6bff)',
    accent: '#b6d63a',
    violet: '#5eb4d8',
    stroke: '#ecf4d2',
    panel: '#eef4e8',
    glow: '#d6f25c',
  },
  {
    id: 'nocturne',
    name: 'Nocturne',
    kind: 'gradient',
    swatch: 'linear-gradient(135deg, #2450c8, #c45ad4 55%, #080d18)',
    accent: '#8eb0ff',
    violet: '#c45ad4',
    stroke: '#dce7ff',
    panel: '#e8e6f4',
    glow: '#8eb0ff',
  },
];

export const MARKS = [
  { id: 'orbit', name: 'Orbit' },
  { id: 'signal', name: 'Signal' },
  { id: 'lattice', name: 'Lattice' },
  { id: 'planes', name: 'Planes' },
  { id: 'glass', name: 'Glass' },
];

const THEME_IDS = THEMES.map((item) => item.id);
const MARK_IDS = MARKS.map((item) => item.id);

const stored = (key, fallback, allowed) => {
  if (typeof window === 'undefined') return fallback;
  const value = window.localStorage.getItem(key);
  return allowed.includes(value) ? value : fallback;
};

const LookContext = createContext(null);

export const LookProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => stored('agency-palette', 'ocean', THEME_IDS));
  const [mark, setMark] = useState(() => stored('agency-graphic', 'orbit', MARK_IDS));

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.site = 'agency';
    root.dataset.agencyTheme = theme;
    window.localStorage.setItem('agency-palette', theme);
    window.localStorage.setItem('agency-graphic', mark);
    return () => {
      delete root.dataset.site;
      delete root.dataset.agencyTheme;
    };
  }, [theme, mark]);

  const value = useMemo(() => {
    const palette = THEMES.find((item) => item.id === theme) || THEMES[0];
    return { theme, mark, palette, setTheme, setMark };
  }, [theme, mark]);

  return createElement(LookContext.Provider, { value }, children);
};

export const useLook = () => {
  const value = useContext(LookContext);
  if (!value) throw new Error('useLook must be used within LookProvider');
  return value;
};
