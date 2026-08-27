/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const COLORS = {
  name: 'Light',
  primary: '#e8c547',
  light: '#fff4b8',
  dark: '#1c1917',
  bg: '#f4efe6',
};

export const COLOR_THEMES = { light: COLORS };

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.style.setProperty('--color-primary', COLORS.primary);
    root.style.setProperty('--color-light', COLORS.light);
    root.style.setProperty('--color-dark', COLORS.dark);
    root.style.setProperty('--bg-color', COLORS.bg);
    localStorage.setItem('theme', 'light');
    localStorage.removeItem('colorTheme');
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: 'light',
        toggleTheme: () => {},
        colorTheme: 'light',
        changeColorTheme: () => {},
        colors: COLORS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
