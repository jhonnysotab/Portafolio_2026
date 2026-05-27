import { useEffect, useRef } from 'react';

export const useCustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const animateRing = () => {
      const { x: mx, y: my } = mouseRef.current;
      ringPosRef.current.x += (mx - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (my - ringPosRef.current.y) * 0.12;
      ring.style.left = `${ringPosRef.current.x}px`;
      ring.style.top = `${ringPosRef.current.y}px`;
      requestAnimationFrame(animateRing);
    };

    const handleHover = (e) => {
      const target = e.target;
      if (target.matches('a, button, .skill-card, .project-card')) {
        if (e.type === 'mouseenter') {
          cursor.style.width = '6px';
          cursor.style.height = '6px';
          ring.style.width = '50px';
          ring.style.height = '50px';
        } else {
          cursor.style.width = '12px';
          cursor.style.height = '12px';
          ring.style.width = '36px';
          ring.style.height = '36px';
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleHover, true);
    document.addEventListener('mouseleave', handleHover, true);
    
    const animationId = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleHover, true);
      document.removeEventListener('mouseleave', handleHover, true);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return { cursorRef, ringRef };
};