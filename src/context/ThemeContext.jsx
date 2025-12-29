/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Color palette definitions
export const COLOR_THEMES = {
  orange: {
    name: 'Orange',
    primary: '#f97316',
    light: '#fed7aa',
    dark: '#7c2d12',
    bg: '#fef3c7',
  },
  blue: {
    name: 'Blue',
    primary: '#3b82f6',
    light: '#dbeafe',
    dark: '#1e3a8a',
    bg: '#dbeafe',
  },
  purple: {
    name: 'Purple',
    primary: '#a855f7',
    light: '#f3e8ff',
    dark: '#581c87',
    bg: '#f3e8ff',
  },
  pink: {
    name: 'Pink',
    primary: '#ec4899',
    light: '#fce7f3',
    dark: '#831843',
    bg: '#fce7f3',
  },
  green: {
    name: 'Green',
    primary: '#10b981',
    light: '#d1fae5',
    dark: '#065f46',
    bg: '#d1fae5',
  },
  red: {
    name: 'Red',
    primary: '#ef4444',
    light: '#fee2e2',
    dark: '#7f1d1d',
    bg: '#fee2e2',
  },
  cyan: {
    name: 'Cyan',
    primary: '#06b6d4',
    light: '#cffafe',
    dark: '#164e63',
    bg: '#cffafe',
  },
  indigo: {
    name: 'Indigo',
    primary: '#6366f1',
    light: '#e0e7ff',
    dark: '#312e81',
    bg: '#e0e7ff',
  },
  teal: {
    name: 'Teal',
    primary: '#14b8a6',
    light: '#ccfbf1',
    dark: '#134e4a',
    bg: '#ccfbf1',
  },
  amber: {
    name: 'Amber',
    primary: '#f59e0b',
    light: '#fef3c7',
    dark: '#78350f',
    bg: '#fef3c7',
  },
  lime: {
    name: 'Lime',
    primary: '#84cc16',
    light: '#ecfdf5',
    dark: '#365314',
    bg: '#f2fde8',
  },
  rose: {
    name: 'Rose',
    primary: '#f43f5e',
    light: '#ffe4e6',
    dark: '#831337',
    bg: '#ffe4e6',
  },
  sky: {
    name: 'Sky',
    primary: '#0ea5e9',
    light: '#e0f2fe',
    dark: '#0c2d4d',
    bg: '#e0f2fe',
  },
  violet: {
    name: 'Violet',
    primary: '#8b5cf6',
    light: '#ede9fe',
    dark: '#4c1d95',
    bg: '#ede9fe',
  },
  fuchsia: {
    name: 'Fuchsia',
    primary: '#d946ef',
    light: '#fae8ff',
    dark: '#701c1c',
    bg: '#fae8ff',
  },
  slate: {
    name: 'Slate',
    primary: '#64748b',
    light: '#f1f5f9',
    dark: '#1e293b',
    bg: '#f1f5f9',
  },
  zinc: {
    name: 'Zinc',
    primary: '#71717a',
    light: '#fafafa',
    dark: '#18181b',
    bg: '#fafafa',
  },
  black: {
    name: 'Black',
    primary: '#1a1a1a',
    light: '#f5f5f5',
    dark: '#0a0a0a',
    bg: '#fafafa',
  },
  gray: {
    name: 'Gray',
    primary: '#6b7280',
    light: '#f9fafb',
    dark: '#111827',
    bg: '#f9fafb',
  },
  stone: {
    name: 'Stone',
    primary: '#78716c',
    light: '#fafaf9',
    dark: '#1c1917',
    bg: '#fafaf9',
  },
  neutral: {
    name: 'Neutral',
    primary: '#737373',
    light: '#fafafa',
    dark: '#171717',
    bg: '#fafafa',
  },
  emerald: {
    name: 'Emerald',
    primary: '#059669',
    light: '#d1fae5',
    dark: '#065f46',
    bg: '#d1fae5',
  },
  mint: {
    name: 'Mint',
    primary: '#14b8a6',
    light: '#ccfbf1',
    dark: '#0d4f4a',
    bg: '#ccfbf1',
  },
  orange: {
    name: 'Orange Dark',
    primary: '#ea580c',
    light: '#ffedd5',
    dark: '#7c2d12',
    bg: '#ffedd5',
  },
  yellow: {
    name: 'Yellow',
    primary: '#eab308',
    light: '#fef08a',
    dark: '#713f12',
    bg: '#fef08a',
  },
  brown: {
    name: 'Brown',
    primary: '#92400e',
    light: '#fef3c7',
    dark: '#451a03',
    bg: '#fef3c7',
  },
  crimson: {
    name: 'Crimson',
    primary: '#c41e3a',
    light: '#ffe4e6',
    dark: '#7f1d1d',
    bg: '#ffe4e6',
  },
  navy: {
    name: 'Navy',
    primary: '#001f3f',
    light: '#e0e7ff',
    dark: '#001f3f',
    bg: '#e0e7ff',
  },
  white: {
    name: 'White',
    primary: '#ffffff',
    light: '#ffffff',
    dark: '#f5f5f5',
    bg: '#ffffff',
  },
  beige: {
    name: 'Beige',
    primary: '#e7d2cc',
    light: '#f5ede8',
    dark: '#c9b5ae',
    bg: '#fef1e4',
  },
  silver: {
    name: 'Silver',
    primary: '#e2e1df',
    light: '#efefee',
    dark: '#bfbdba',
    bg: '#f0eeec',
  },
  sage: {
    name: 'Sage',
    primary: '#bbc4c2',
    light: '#e0e5e3',
    dark: '#8a9290',
    bg: '#e8ebe9',
  },
  mist: {
    name: 'Mist',
    primary: '#c7ced6',
    light: '#e6ecf1',
    dark: '#8a92a4',
    bg: '#eef1f5',
  },
  cream: {
    name: 'Cream',
    primary: '#fef1e4',
    light: '#fffbf5',
    dark: '#f5e6d3',
    bg: '#fef1e4',
  },
  // Gradient Themes
  sunset: {
    name: 'Sunset Gradient',
    primary: '#ff6b6b',
    light: '#ffe66d',
    dark: '#c92a2a',
    bg: '#ffffff',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)',
  },
  ocean: {
    name: 'Ocean Gradient',
    primary: '#0066cc',
    light: '#00d4ff',
    dark: '#003d99',
    bg: '#ffffff',
    gradient: 'linear-gradient(135deg, #001f3f 0%, #0066cc 50%, #00d4ff 100%)',
  },
  forest: {
    name: 'Forest Gradient',
    primary: '#065f46',
    light: '#10b981',
    dark: '#064e3b',
    bg: '#ffffff',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #10b981 100%)',
  },
  cosmic: {
    name: 'Cosmic Gradient',
    primary: '#8b5cf6',
    light: '#c4b5fd',
    dark: '#5b21b6',
    bg: '#ffffff',
    gradient: 'linear-gradient(135deg, #5b21b6 0%, #8b5cf6 50%, #ec4899 100%)',
  },
  peach: {
    name: 'Peach Gradient',
    primary: '#ff9770',
    light: '#ffd4b4',
    dark: '#ff7a45',
    bg: '#ffffff',
    gradient: 'linear-gradient(135deg, #ff7a45 0%, #ff9770 50%, #ffc6a0 100%)',
  },
  aurora: {
    name: 'Aurora Gradient',
    primary: '#06b6d4',
    light: '#67e8f9',
    dark: '#0e919b',
    bg: '#ffffff',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #14b8a6 100%)',
  },
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const [colorTheme, setColorTheme] = useState(() => {
    const savedColor = localStorage.getItem('colorTheme');
    return savedColor || 'orange';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Update background color when switching light/dark mode
    const colors = COLOR_THEMES[colorTheme];
    if (theme === 'dark') {
      // Use zinc-900 background for dark mode
      document.documentElement.style.setProperty('--bg-color', '#18181b');
    } else {
      document.documentElement.style.setProperty('--bg-color', colors.bg);
    }
  }, [theme, colorTheme]);

  useEffect(() => {
    localStorage.setItem('colorTheme', colorTheme);
    const colors = COLOR_THEMES[colorTheme];
    document.documentElement.style.setProperty('--color-primary', colors.primary);
    document.documentElement.style.setProperty('--color-light', colors.light);
    document.documentElement.style.setProperty('--color-dark', colors.dark);
    
    // Set background color based on theme
    if (document.documentElement.classList.contains('dark')) {
      // For dark mode, always use zinc-900
      document.documentElement.style.setProperty('--bg-color', '#18181b');
    } else {
      // For light mode, use the color theme's bg
      document.documentElement.style.setProperty('--bg-color', colors.bg);
    }
  }, [colorTheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeColorTheme = (color) => {
    if (COLOR_THEMES[color]) {
      setColorTheme(color);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorTheme, changeColorTheme, colors: COLOR_THEMES[colorTheme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

