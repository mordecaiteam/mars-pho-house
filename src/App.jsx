import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight, Menu as MenuIcon, Phone, ShoppingBag, X } from 'lucide-react';
import SocialLink from './components/SocialLink.jsx';
import { bethpage, instagram, order, tiktok } from './data/restaurant.js';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Visit from './pages/Visit.jsx';

export default function App() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileNav = useRef(null);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const breakpoint = matchMedia('(min-width: 681px)');
    const closeOnDesktop = (event) => { if (event.matches) mobileNav.current?.close(); };
    breakpoint.addEventListener('change', closeOnDesktop);
    return () => breakpoint.removeEventListener('change', closeOnDesktop);
  }, []);
  const closeNav = () => mobileNav.current?.close();
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header><div className="shell header-inner">
      <Link to="/" className="brand"><img src="/media/logo.webp" width="650" height="102" alt="Mars Pho House" /></Link>
      <button type="button" className="nav-toggle" aria-controls="mobile-nav" aria-expanded={menuOpen} aria-label="Open navigation" onClick={() => {
        mobileNav.current.showModal();
        setMenuOpen(true);
      }}><MenuIcon /></button>
      <nav className="desktop-nav" aria-label="Main navigation">
        <NavLink end to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/visit">Visit</NavLink>
        <a className="button primary" href={order}><ShoppingBag size={18} /> Order now</a>
      </nav>
    </div></header>
    <dialog ref={mobileNav} id="mobile-nav" className="mobile-nav" aria-label="Main navigation" onClose={() => setMenuOpen(false)}>
      <div className="shell header-inner">
        <Link to="/" className="brand" onClick={closeNav}><img src="/media/logo.webp" width="650" height="102" alt="Mars Pho House" /></Link>
        <button type="button" className="nav-toggle" aria-label="Close navigation" onClick={closeNav} autoFocus><X /></button>
      </div>
      <nav className="shell" aria-label="Mobile navigation">
        <NavLink end to="/" onClick={closeNav}>Home</NavLink>
        <NavLink to="/menu" onClick={closeNav}>Menu</NavLink>
        <NavLink to="/visit" onClick={closeNav}>Visit</NavLink>
        <a className="button primary" href={order} onClick={closeNav}><ShoppingBag size={18} /> Order now</a>
      </nav>
    </dialog>
    <main key={pathname} id="main" className="page-enter" tabIndex={-1}><Routes>
      <Route path="/" element={<Home />} /><Route path="/menu" element={<Menu />} /><Route path="/visit" element={<Visit />} />
      <Route path="*" element={<section className="shell section"><h1>Page unavailable</h1><Link className="text-link" to="/">Back to home <ArrowRight size={17} /></Link></section>} />
    </Routes></main>
    {pathname !== '/menu' && pathname !== '/menu/' && <footer><div className="shell footer-inner">
      <div><Link to="/" className="footer-brand"><img src="/media/logo.webp" width="650" height="102" alt="Mars Pho House" /></Link><p>Bethpage, New York</p></div>
      <nav aria-label="Footer navigation"><Link to="/">Home</Link><Link to="/menu">Menu</Link><Link to="/visit">Visit</Link></nav>
      <div className="flex flex-wrap items-center gap-3"><SocialLink service="Instagram" href={instagram} /><SocialLink service="TikTok" href={tiktok} /><a className="footer-phone" href={bethpage}><Phone size={17} /> 929-774-0842</a></div>
    </div></footer>}
  </>;
}
