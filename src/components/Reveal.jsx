import React, { useEffect, useRef } from 'react';

export default function Reveal({ children, className = '', as: Element = 'section' }) {
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
