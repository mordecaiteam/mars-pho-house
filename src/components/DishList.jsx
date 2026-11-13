import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import Reveal from './Reveal.jsx';

export default function DishList({ dishes, animateCards = false }) {
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
