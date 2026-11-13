import React, { useEffect, useState } from 'react';
import { ArrowUp, Phone, ShoppingBag } from 'lucide-react';
import DishList from '../components/DishList.jsx';
import Reveal from '../components/Reveal.jsx';
import { menu } from '../data/menu.js';
import { bethpage, order } from '../data/restaurant.js';

const categories = {
  All: [],
  Pho: ['Pho'],
  Appetizers: ['Starter'],
  Entrées: ['Main', 'Rice', 'Bánh mì'],
  Drinks: ['Drink'],
  Desserts: ['Dessert'],
};

export default function Menu() {
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
