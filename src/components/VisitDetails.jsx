import React from 'react';
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { address, appleMaps, bethpage, mapQuery, maps } from '../data/restaurant.js';

export default function Visit({ standalone = false }) {
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
