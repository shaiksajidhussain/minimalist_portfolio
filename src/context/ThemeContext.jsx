/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';

export const COLOR_THEMES = {
  cream: {
    name: 'Cream',
    swatch: '#d4af37',
    vars: {
      '--cream': '#f4efe6',
      '--ink': '#1c1917',
      '--ink-soft': 'rgba(28, 25, 23, 0.8)',
      '--gold': '#d4af37',
      '--gold-bright': '#e8c547',
      '--gold-light': '#fff4c4',
      '--card': '#fffcf7',
      '--line': 'rgba(28, 25, 23, 0.1)',
      '--muted': 'rgba(28, 25, 23, 0.55)',
      '--sky': '#7eb8e6',
      '--sky-mid': '#a9d4f0',
      '--sky-end': '#d5eaf8',
      '--blob-a': '#c5e0f4',
      '--blob-b': '#ead7a0',
      '--blob-c': '#f0d3c4',
      '--color-primary': '#e8c547',
      '--color-light': '#fff4b8',
      '--color-dark': '#1c1917',
      '--bg-color': '#f4efe6',
      '--bg-image': 'none',
      '--scheme': 'light',
    },
  },
  ink: {
    name: 'Ink',
    swatch: '#1c1917',
    vars: {
      '--cream': '#141311',
      '--ink': '#f4efe6',
      '--ink-soft': 'rgba(244, 239, 230, 0.78)',
      '--gold': '#e0c066',
      '--gold-bright': '#f0d37a',
      '--gold-light': '#3a3420',
      '--card': '#1c1b18',
      '--line': 'rgba(244, 239, 230, 0.12)',
      '--muted': 'rgba(244, 239, 230, 0.55)',
      '--sky': '#1b2836',
      '--sky-mid': '#243444',
      '--sky-end': '#1a222b',
      '--blob-a': '#24384a',
      '--blob-b': '#3d3420',
      '--blob-c': '#3a2a28',
      '--color-primary': '#e0c066',
      '--color-light': '#3a3420',
      '--color-dark': '#f4efe6',
      '--bg-color': '#141311',
      '--bg-image': 'none',
      '--scheme': 'dark',
    },
  },
  dusk: {
    name: 'Dusk',
    swatch: '#c45c26',
    vars: {
      '--cream': '#f3e6d4',
      '--ink': '#2a1810',
      '--ink-soft': 'rgba(42, 24, 16, 0.8)',
      '--gold': '#c45c26',
      '--gold-bright': '#e07a3d',
      '--gold-light': '#f7d3b8',
      '--card': '#fff6ea',
      '--line': 'rgba(42, 24, 16, 0.12)',
      '--muted': 'rgba(42, 24, 16, 0.55)',
      '--sky': '#d9896a',
      '--sky-mid': '#e8b496',
      '--sky-end': '#f0d4c0',
      '--blob-a': '#f0c4a8',
      '--blob-b': '#e8c090',
      '--blob-c': '#e8b8b0',
      '--color-primary': '#c45c26',
      '--color-light': '#f7d3b8',
      '--color-dark': '#2a1810',
      '--bg-color': '#f3e6d4',
      '--bg-image': 'none',
      '--scheme': 'light',
    },
  },
  sage: {
    name: 'Sage',
    swatch: '#4a7c59',
    vars: {
      '--cream': '#e7efe4',
      '--ink': '#1c241c',
      '--ink-soft': 'rgba(28, 36, 28, 0.8)',
      '--gold': '#4a7c59',
      '--gold-bright': '#6a9a72',
      '--gold-light': '#d5e6d0',
      '--card': '#f4faf3',
      '--line': 'rgba(28, 36, 28, 0.12)',
      '--muted': 'rgba(28, 36, 28, 0.55)',
      '--sky': '#7aa88a',
      '--sky-mid': '#a8cbb4',
      '--sky-end': '#d4e6d8',
      '--blob-a': '#c5ddce',
      '--blob-b': '#d4e0b8',
      '--blob-c': '#d8cfc4',
      '--color-primary': '#4a7c59',
      '--color-light': '#d5e6d0',
      '--color-dark': '#1c241c',
      '--bg-color': '#e7efe4',
      '--bg-image': 'none',
      '--scheme': 'light',
    },
  },
  ocean: {
    name: 'Ocean',
    swatch: '#2f6f8f',
    vars: {
      '--cream': '#e7eef4',
      '--ink': '#13202c',
      '--ink-soft': 'rgba(19, 32, 44, 0.8)',
      '--gold': '#2f6f8f',
      '--gold-bright': '#4a93b5',
      '--gold-light': '#cfe3ee',
      '--card': '#f4f8fb',
      '--line': 'rgba(19, 32, 44, 0.12)',
      '--muted': 'rgba(19, 32, 44, 0.55)',
      '--sky': '#5b9bb8',
      '--sky-mid': '#8cbdd0',
      '--sky-end': '#c5dce8',
      '--blob-a': '#b7d4e4',
      '--blob-b': '#c5d0b0',
      '--blob-c': '#d4c4c0',
      '--color-primary': '#2f6f8f',
      '--color-light': '#cfe3ee',
      '--color-dark': '#13202c',
      '--bg-color': '#e7eef4',
      '--bg-image': 'none',
      '--scheme': 'light',
    },
  },
  glass: {
    name: 'Glass',
    swatch: '#e8d4c4',
    vars: {
      '--cream': '#f4efe6',
      '--ink': '#1c1612',
      '--ink-soft': 'rgba(28, 22, 18, 0.78)',
      '--gold': '#e2b86a',
      '--gold-bright': '#f0d08a',
      '--gold-light': 'rgba(255, 244, 220, 0.35)',
      '--card': 'rgba(255, 250, 244, 0.22)',
      '--line': 'rgba(255, 255, 255, 0.34)',
      '--muted': 'rgba(28, 22, 18, 0.62)',
      '--sky': 'transparent',
      '--sky-mid': 'transparent',
      '--sky-end': 'transparent',
      '--blob-a': 'transparent',
      '--blob-b': 'transparent',
      '--blob-c': 'transparent',
      '--color-primary': '#e2b86a',
      '--color-light': 'rgba(255, 244, 220, 0.4)',
      '--color-dark': '#1c1612',
      '--bg-color': 'transparent',
      '--bg-image': "url('/themes/glass-bg.jpg')",
      '--scheme': 'light',
    },
  },
};

const ThemeContext = createContext();

const applyTheme = (id) => {
  const theme = COLOR_THEMES[id] || COLOR_THEMES.cream;
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.dataset.theme = id;
  root.style.colorScheme = theme.vars['--scheme'];
  if (theme.vars['--scheme'] === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState(() => {
    if (typeof window === 'undefined') return 'cream';
    const stored = window.localStorage.getItem('colorTheme');
    return COLOR_THEMES[stored] ? stored : 'cream';
  });

  useLayoutEffect(() => {
    applyTheme(colorTheme);
    window.localStorage.setItem('colorTheme', colorTheme);
    window.localStorage.setItem('theme', COLOR_THEMES[colorTheme].vars['--scheme']);
  }, [colorTheme]);

  const changeColorTheme = useCallback((id) => {
    if (COLOR_THEMES[id]) setColorTheme(id);
  }, []);

  const cycleTheme = useCallback(() => {
    const ids = Object.keys(COLOR_THEMES);
    const next = ids[(ids.indexOf(colorTheme) + 1) % ids.length];
    setColorTheme(next);
  }, [colorTheme]);

  const colors = useMemo(
    () => ({
      name: COLOR_THEMES[colorTheme].name,
      primary: COLOR_THEMES[colorTheme].vars['--gold'],
      light: COLOR_THEMES[colorTheme].vars['--gold-light'],
      dark: COLOR_THEMES[colorTheme].vars['--ink'],
      bg: COLOR_THEMES[colorTheme].vars['--cream'],
    }),
    [colorTheme]
  );

  const value = useMemo(
    () => ({
      theme: COLOR_THEMES[colorTheme].vars['--scheme'],
      toggleTheme: cycleTheme,
      colorTheme,
      changeColorTheme,
      cycleTheme,
      colors,
      themes: COLOR_THEMES,
    }),
    [colorTheme, changeColorTheme, cycleTheme, colors]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
