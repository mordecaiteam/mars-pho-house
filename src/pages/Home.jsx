import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import DishList from '../components/DishList.jsx';
import Reveal from '../components/Reveal.jsx';
import Reviews from '../components/Reviews.jsx';
import Visit from '../components/VisitDetails.jsx';
import { menu } from '../data/menu.js';
import { order } from '../data/restaurant.js';

function HeroVideo() {
  const video = useRef(null);
  useEffect(() => {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.current?.play().catch(() => {});
    }
  }, []);
  return <video ref={video} className="hero-video" src="/media/hero.webm" poster="/media/hero-poster.webp" preload="none" muted loop playsInline aria-hidden="true" />;
}

export default function Home() {
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
