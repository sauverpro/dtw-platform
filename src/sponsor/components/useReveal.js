import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.stagger').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
