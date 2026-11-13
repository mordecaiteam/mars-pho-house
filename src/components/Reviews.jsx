import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Star, Volume2, VolumeX } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { maps } from '../data/restaurant.js';

export default function Reviews() {
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
