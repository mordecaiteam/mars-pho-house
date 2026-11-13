import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ArrowUp, MapPin, Phone, Clock, ShoppingBag, Menu as MenuIcon, X, Maximize2, Star, Volume2, VolumeX } from 'lucide-react';
import '@fontsource/barlow/latin-400.css';
import '@fontsource/barlow/latin-600.css';
import '@fontsource/barlow-condensed/latin-700.css';
import './style.css';

const address = '4037B Hempstead Turnpike, Bethpage, NY 11714';
const mapQuery = encodeURIComponent('Mars Pho House ' + address);
const maps = 'https://www.google.com/maps/search/?api=1&query=' + mapQuery;
const appleMaps = 'https://maps.apple.com/?q=Mars+Pho+House&address=' + encodeURIComponent(address);
const order = 'https://order.mealkeyway.com/customer/release/index?mid=694a4e6c64576a684a78734763366a504175423876673d3d#/main';
const tiktok = 'https://www.tiktok.com/@nyphohouse?lang=en';
const instagram = 'https://www.instagram.com/newyorkphohouse/?hl=en';
const bethpage = 'tel:+19297740842';
const menu = [
  ['signature_pho', 'Pho', 'Signature pho', 'Beef brisket and sliced steak in slow-simmered broth with rice noodles and herbs.'],
  ['chicken_pho', 'Pho', 'Chicken pho', 'Grilled chicken, rice noodles, fresh herbs, and lime.'],
  ['beef_short_rib', 'Pho', 'Beef short rib pho', 'Bone-in beef short rib, rice noodles, and herbs.'],
  ['banh_mi_beef', 'Bánh mì', 'Brisket bánh mì', 'Sliced brisket and chicken pâté on a baguette.'],
  ['summer_roll', 'Starter', 'Shrimp summer rolls', 'Fresh rolls with shrimp, herbs, and peanut dipping sauce.'],
  ['signature_fried_rice', 'Rice', 'Signature fried rice', 'Jasmine rice tossed with vegetables and egg.'],
  ['vegetarian_pho', 'Pho', 'Vegetarian pho', 'Rice noodles with mushrooms, fresh herbs, and vegetables.'],
  ['orange_chicken', 'Main', 'Orange chicken', 'Crisp chicken coated in orange glaze.'],
  ['lamb_fried_rice', 'Rice', 'Lamb fried rice', 'Fried rice with lamb, egg, and vegetables.'],
  ['steamed_beef_dumplings', 'Starter', 'Steamed beef dumplings', 'Beef dumplings served with dipping sauce.'],
  ['lamb_skewer', 'Starter', 'Grilled lamb skewers', 'Grilled lamb with lettuce and a side of seasoning.'],
  ['thai_ice_tea', 'Drink', 'Thai iced tea', 'Thai tea served over ice with milk.'],
  ['shrimp_pho', 'Pho', 'Shrimp pho', 'Shrimp, rice noodles, herbs, and lime.'],
  ['shrimp_fried_rice', 'Rice', 'Shrimp fried rice', 'Fried rice with shrimp and vegetables.'],
  ['curry_chicken_rice', 'Main', 'Curry chicken rice', 'Chicken curry served with rice and vegetables.'],
  ['fried_beef_dumplings', 'Starter', 'Fried beef dumplings', 'Crisp beef dumplings with dipping sauce.'],
  ['fried_chicken_dumpling', 'Starter', 'Fried chicken dumplings', 'Crisp chicken dumplings with dipping sauce.'],
  ['waffle_fries', 'Starter', 'Waffle fries', 'Golden waffle-cut fries.'],
  ['vegetable_spring_rolls', 'Starter', 'Vegetable spring rolls', 'Crisp vegetable rolls with dipping sauce.'],
  ['peppered_calamari', 'Starter', 'Peppered calamari', 'Fried calamari with pepper and dipping sauce.'],
  ['creme_brulee_flan', 'Dessert', 'Crème brûlée flan', 'Silky custard with caramel.'],
  ['vietnamese_coffee', 'Drink', 'Vietnamese coffee', 'Coffee brewed through a traditional phin filter.'],
  ['shirley_temple', 'Drink', 'Shirley Temple', 'A sparkling grenadine drink served over ice.'],
  ['pina_colada', 'Drink', 'Piña colada', 'A chilled pineapple and coconut drink.'],
];

function Reveal({ children, className = '', as: Element = 'section' }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (element.getBoundingClientRect().top < innerHeight) return;
    element.classList.add('waiting');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.remove('waiting');
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <Element ref={ref} className={'reveal ' + className}>{children}</Element>;
}

function SocialLink({ service, href }) {
  return <a className="social-icon" href={href} target="_blank" rel="noreferrer" aria-label={service}>
    <img src={'/media/' + service.toLowerCase() + '.svg'} width="19" height="19" alt="" />
  </a>;
}

function Visit({ standalone = false }) {
  const Heading = standalone ? 'h1' : 'h2';
  return <Reveal className="visit section shell">
    <div className={standalone ? 'enter-from-left' : undefined}><Heading className={standalone ? undefined : 'home-section-title'}>See you in Bethpage.</Heading>
      <p className="flex items-start gap-2"><MapPin size={20} aria-hidden="true" />{address}</p>
      <p className="muted">Near the Bethpage DMV</p>
      <div className="flex flex-wrap gap-3 mt-5">
        <a className="button primary" href={maps} target="_blank" rel="noreferrer">Google Maps <ArrowUpRight size={18} /></a>
        <a className="button outline" href={appleMaps} target="_blank" rel="noreferrer">Apple Maps <ArrowUpRight size={18} /></a>
        <a className="button outline" href={bethpage}><Phone size={17} /> 929-774-0842</a>
      </div>
    </div>
    <Reveal as="div" className="hours"><h3 className="flex items-center gap-2"><Clock size={20} /> Hours</h3>
      <dl><div><dt>Sunday–Thursday</dt><dd>11 AM–9 PM</dd></div><div><dt>Friday–Saturday</dt><dd>11:30 AM–9:30 PM</dd></div></dl>
    </Reveal>
    <Reveal as="div" className="visit-map-wrap">
      <iframe className="visit-map" title="Mars Pho House in Google Maps" loading="lazy"
        src={'https://maps.google.com/maps?q=' + mapQuery + '&z=16&output=embed'} referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
    </Reveal>
  </Reveal>;
}

function DishList({ dishes, animateCards = false }) {
  const [photo, setPhoto] = useState(null);
  const dialog = useRef(null);
  const focusTarget = useRef(null);
  const Card = animateCards ? Reveal : 'li';
  useEffect(() => {
    if (photo) dialog.current.showModal();
  }, [photo]);

  return <><ul className="dishes">{dishes.map(([image, category, name, detail]) => (
    <Card {...(animateCards ? { as: 'li' } : {})} className="dish-card" key={image}>
      <button type="button" className="dish-photo" onClick={(event) => {
        focusTarget.current = event.currentTarget;
        setPhoto({ image, name });
      }} aria-label={'Enlarge photo of ' + name}>
        <img src={'/media/menu/' + image + '.webp'} width="719" height="440" alt="" loading="lazy" decoding="async" />
        <span><Maximize2 size={16} aria-hidden="true" /></span>
      </button>
      <div className="dish-copy">
        <span className="dish-category">{category}</span>
        <h3>{name}</h3>
        <p>{detail}</p>
      </div>
    </Card>
  ))}</ul>
    <dialog ref={dialog} className="photo-dialog" aria-label={photo?.name || 'Menu photo'} onClick={(event) => {
      if (event.target === event.currentTarget) event.currentTarget.close();
    }} onClose={() => {
      setPhoto(null);
      focusTarget.current?.focus();
    }}>
      {photo && <figure><button type="button" aria-label="Close photo" onClick={() => dialog.current.close()}><X size={22} /></button>
        <img src={'/media/menu/' + photo.image + '.webp'} alt={photo.name} /><figcaption>{photo.name}</figcaption>
      </figure>}
    </dialog>
  </>;
}

function Reviews() {
  const [muted, setMuted] = useState(true);
  const video = useRef(null);
  useEffect(() => {
    const clip = video.current;
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) clip.play().catch(() => {});
      else clip.pause();
    }, { threshold: 0.35 });
    observer.observe(clip);
    return () => observer.disconnect();
  }, []);

  return <Reveal className="social-feature">
    <div className="shell review-grid">
      <div className="review-copy"><h2 className="home-section-title">Don’t take our word for it.</h2>
        <div className="review-window"><div className="review-track">
          {Array.from({ length: 6 }, (_, index) => <figure className="review-card" key={index} aria-hidden={index > 0}>
            <div className="review-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, star) => <Star key={star} size={17} fill="currentColor" aria-hidden="true" />)}</div>
            <blockquote>“Great service and food choices, a great halal pho spot on Long Island with great pricing!”</blockquote>
            <figcaption>Rahme Shahed · Google review via Zabihah</figcaption>
          </figure>)}
        </div></div>
        <a className="text-link" href="https://www.zabihah.com/restaurants/98f8dfe9-d800-4e47-bb24-8e41067abe33/mars-pho-bethpage-ny" target="_blank" rel="noreferrer">Read the review <ArrowUpRight size={16} /></a>
      </div>
      <div className="review-media">
        <h3>As seen on TikTok</h3>
        <div className="review-player">
          <video ref={video} src="/media/review.webm" poster="/media/review-poster.webp" preload="none" muted={muted} loop playsInline controls aria-label="Mars Pho House TikTok video" onVolumeChange={(event) => setMuted(event.currentTarget.muted)} />
          <button className="sound-toggle" type="button" aria-label={muted ? 'Unmute video' : 'Mute video'} onClick={() => {
            video.current.muted = !muted;
            setMuted(!muted);
          }}>{muted ? <VolumeX size={19} /> : <Volume2 size={19} />}</button>
        </div>
      </div>
      <div className="review-cta"><a className="button primary" href={maps} target="_blank" rel="noreferrer">Leave a review on Google <ArrowUpRight size={18} /></a></div>
    </div>
  </Reveal>;
}

function HeroVideo() {
  const video = useRef(null);
  useEffect(() => {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.current?.play().catch(() => {});
    }
  }, []);
  return <video ref={video} className="hero-video" src="/media/hero.webm" poster="/media/hero-poster.webp" preload="none" muted loop playsInline aria-hidden="true" />;
}

function Home() {
  return <>
    <section className="hero"><HeroVideo /><div className="shell hero-grid">
      <div className="hero-copy"><p className="eyebrow">Mars Pho House · Long Island</p>
        <h1>Halal Vietnamese<br /><em className="hero-shine">pho in Bethpage.</em></h1>
        <p>Big bowls. Bold broth. Come hungry.</p>
        <div className="hero-actions flex flex-wrap gap-3 mt-6"><a className="button primary" href={order}><ShoppingBag size={18} /> Order now</a><Link className="button outline" to="/menu">View menu <ArrowRight size={18} /></Link></div>
      </div>
    </div></section>
    <Reveal className="section shell favorites">
      <h2 className="home-section-title">Our favorites</h2>
      <DishList dishes={[menu[2], menu[3], menu.find(([image]) => image === 'peppered_calamari')]} />
      <Link className="text-link favorites-link" to="/menu">Explore the full menu <ArrowRight size={17} /></Link>
    </Reveal>
    <Reviews />
    <Visit />
  </>;
}

const categories = {
  All: [],
  Pho: ['Pho'],
  Appetizers: ['Starter'],
  Entrées: ['Main', 'Rice', 'Bánh mì'],
  Drinks: ['Drink'],
  Desserts: ['Dessert'],
};

function Menu() {
  const [category, setCategory] = useState('All');
  const [showBackTop, setShowBackTop] = useState(false);
  const dishes = category === 'All' ? menu : menu.filter((dish) => categories[category].includes(dish[1]));

  useEffect(() => {
    const update = () => setShowBackTop(window.scrollY > 0);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <section className="shell section menu-page"><div className="enter-from-left"><h1>Our Menu</h1>
    <div className="flex flex-wrap gap-3 mt-5">
      <a className="button primary" href={order}><ShoppingBag size={18} /> Order online</a>
      <a className="button outline" href={bethpage}><Phone size={17} /> Call for takeout</a>
    </div>
    <div className="category-pills" role="group" aria-label="Menu categories">
      {Object.keys(categories).map((name) => <button type="button" key={name} aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}
    </div>
    </div>
    <div className="menu-grid"><DishList key={category} dishes={dishes} animateCards /></div>
    <Reveal as="aside" className="allergy-note"><h2>Food allergies</h2><p>Please tell our staff about any food allergies or dietary restrictions before ordering. Ask about ingredients and the risk of cross-contact.</p></Reveal>
    {showBackTop && <button className="back-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><ArrowUp size={22} /></button>}
  </section>;
}

function App() {
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
      <Route path="/" element={<Home />} /><Route path="/menu" element={<Menu />} /><Route path="/visit" element={<Visit standalone />} />
      <Route path="*" element={<section className="shell section"><h1>Page unavailable</h1><Link className="text-link" to="/">Back to home <ArrowRight size={17} /></Link></section>} />
    </Routes></main>
    {pathname !== '/menu' && pathname !== '/menu/' && <footer><div className="shell footer-inner">
      <div><Link to="/" className="footer-brand"><img src="/media/logo.webp" width="650" height="102" alt="Mars Pho House" /></Link><p>Bethpage, New York</p></div>
      <nav aria-label="Footer navigation"><Link to="/">Home</Link><Link to="/menu">Menu</Link><Link to="/visit">Visit</Link></nav>
      <div className="flex flex-wrap items-center gap-3"><SocialLink service="Instagram" href={instagram} /><SocialLink service="TikTok" href={tiktok} /><a className="footer-phone" href={bethpage}><Phone size={17} /> 929-774-0842</a></div>
    </div></footer>}
  </>;
}
createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>);
