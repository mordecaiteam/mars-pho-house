import React from 'react';

export default function SocialLink({ service, href }) {
  return <a className="social-icon" href={href} target="_blank" rel="noreferrer" aria-label={service}>
    <img src={'/media/' + service.toLowerCase() + '.svg'} width="19" height="19" alt="" />
  </a>;
}
