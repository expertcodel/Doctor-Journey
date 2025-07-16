// components/SmoothScrollLink.jsx
'use client';

import { useCallback } from 'react';

export default function SmoothScrollLink({ href, className = '', children }) {
  const handleClick = useCallback((e) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        const yOffset = -50; // Adjust as needed
        const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        history.replaceState(null, null, ' ');
      }
    }
  }, [href]);

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
