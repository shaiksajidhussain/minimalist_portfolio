import { FiMail, FiMapPin, FiMenu, FiX } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { gsap, useGSAP } from '../lib/gsap';
import ThemeSwitcher from './ThemeSwitcher';

const navItems = [
  { name: 'Work', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Stack', href: '#skills' },
];

const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollToSection = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(
    (_, contextSafe) => {
      const links = navRef.current?.querySelectorAll('.nav-link');
      if (!links?.length) return;

      const enter = contextSafe((event) => {
        gsap.to(event.currentTarget, { y: -2, duration: 0.2, ease: 'power2.out' });
      });
      const leave = contextSafe((event) => {
        gsap.to(event.currentTarget, { y: 0, duration: 0.2, ease: 'power2.out' });
      });

      links.forEach((link) => {
        link.addEventListener('mouseenter', enter);
        link.addEventListener('mouseleave', leave);
      });

      return () => {
        links.forEach((link) => {
          link.removeEventListener('mouseenter', enter);
          link.removeEventListener('mouseleave', leave);
        });
      };
    },
    { scope: navRef }
  );

  const handleNavClick = (href) => {
    scrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
      <div className="relative mx-auto flex h-12 max-w-7xl items-center justify-center pr-10 md:pr-0">
        <p className="absolute left-0 hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)] md:flex">
          <FiMapPin size={12} />
          Andhra Pradesh, IN
        </p>

        <nav
          ref={navRef}
          className={`flex items-center gap-2 sm:gap-3 rounded-full pl-1.5 pr-1.5 py-1 border ${
            isScrolled
              ? 'border-[var(--line)] bg-[var(--card)]/85 shadow-[0_12px_40px_rgba(28,25,23,0.08)]'
              : 'border-[var(--line)] bg-[var(--card)]/55'
          }`}
        >
          <button
            onClick={() => handleNavClick('#hero')}
            className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/60"
            aria-label="Home"
          >
            <img
              src="https://res.cloudinary.com/dgus6y6lm/image/upload/v1766677763/Sajid_Professional_vncuym.png"
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="nav-link rounded-full px-3 py-1.5 text-sm text-[var(--ink)] hover:bg-[var(--cream)]/70"
              >
                {item.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavClick('#contact')}
            className="nav-link hidden items-center gap-2 rounded-full bg-[var(--ink)] px-3.5 py-1.5 text-sm font-medium text-[var(--cream)] sm:inline-flex"
          >
            Work with me
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--cream)] text-[var(--ink)]">
              <FiMail size={12} />
            </span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink)] md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </nav>

        <ThemeSwitcher className="absolute right-0" />
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 mx-auto max-w-xs rounded-[24px] liquid-card p-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="block w-full rounded-xl px-4 py-2.5 text-left text-sm text-[var(--ink)] hover:bg-[var(--cream)]"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="mt-1 w-full rounded-xl bg-[var(--ink)] px-4 py-2.5 text-sm font-medium text-[var(--cream)]"
          >
            Work with me
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
