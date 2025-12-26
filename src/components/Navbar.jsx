import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiMoon, FiSun, FiMenu, FiX, FiSettings } from 'react-icons/fi';
import GooeyNav from './GooeyNav';
import ColorThemeSelector from './ColorThemeSelector';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Tech Stack', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const gooeyNavItems = navItems.map(item => ({
    label: item.name,
    href: item.href
  }));

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            Shaik Sajid Hussain
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-gray-700 dark:text-gray-300">
              <GooeyNav
                items={gooeyNavItems}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={0}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                onItemClick={(item) => {
                  scrollToSection(item.href);
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <ColorThemeSelector />
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
              </button>
              {/* 
              <Link
                to="/admin/login"
                className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                title="Admin Panel"
              >
                <FiSettings size={20} />
              </Link>
              */}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ColorThemeSelector />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300"
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 space-y-2"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

