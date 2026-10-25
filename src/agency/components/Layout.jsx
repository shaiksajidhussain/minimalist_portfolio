import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { BRAND, NAV } from '../content';
import { LookProvider } from '../look';
import { siteUrl } from '../usePageMeta';
import ThemeMenu from './ThemeMenu';
import '../agency.css';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target && lenis) {
      lenis.scrollTo(target, { offset: -88, immediate: true });
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, hash, lenis]);

  return null;
};

const Nav = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="nav">
      <Link to="/" className="wordmark" onClick={() => setOpen(false)}>
        {BRAND.name}
      </Link>
      <nav className="nav-links" aria-label="Primary">
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="nav-tools">
        <ThemeMenu />
        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="mobile-panel" aria-label="Mobile">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  );
};

const Footer = () => (
  <footer className="wrap footer">
    <div>
      <strong>{BRAND.name}</strong>
      <p>Websites, applications, and the marketing that points the right people at them.</p>
    </div>
    <div>
      <strong>Studio</strong>
      <ul>
        {NAV.map((item) => (
          <li key={item.to}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <strong>Contact</strong>
      <ul>
        <li>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
        </li>
        <li>
          <a href={BRAND.phoneHref}>{BRAND.phone}</a>
        </li>
        {BRAND.socials.map((item) => (
          <li key={item.href}>
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
    <p className="legal">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
  </footer>
);

const Layout = ({ children }) => {
  useEffect(() => {
    if (!siteUrl) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: BRAND.name,
      url: siteUrl,
      email: BRAND.email,
      telephone: '+917893160318',
      areaServed: 'Worldwide',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Andhra Pradesh',
        addressCountry: 'IN',
      },
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <LookProvider>
      <div className="agency">
        <ScrollToTop />
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Nav />
        <main id="content">{children}</main>
        <Footer />
      </div>
    </LookProvider>
  );
};

export default Layout;
