import { useEffect, useRef } from 'react';

// Los 4 símbolos icónicos del control de PlayStation, con sus colores clásicos
const SHAPES = [
  { key: 'triangle', color: '#2ed9a0', angleOffset: 0 },
  { key: 'circle', color: '#ff4d6d', angleOffset: Math.PI / 2 },
  { key: 'cross', color: '#4c9aff', angleOffset: Math.PI },
  { key: 'square', color: '#ff5da2', angleOffset: (Math.PI * 3) / 2 },
];

const FOLLOW_EASE = 0.06;
const SPIN_SPEED = 1.4;
const ORBIT_SPEED = 0.006;

export const usePs1Background = (canvasRef) => {
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const dimsRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      dimsRef.current = { width, height };
      if (mouseRef.current.x === 0 && mouseRef.current.y === 0) {
        mouseRef.current = { x: width / 2, y: height / 2 };
        targetRef.current = { x: width / 2, y: height / 2 };
      }
    };

    const handlePointerMove = (e) => {
      const point = e.touches ? e.touches[0] : e;
      mouseRef.current.x = point.clientX;
      mouseRef.current.y = point.clientY;
    };

    const drawTriangle = (x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * size;
        const py = Math.sin(a) * size;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const drawCircle = (x, y, size) => {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawSquare = (x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.strokeRect(-size * 0.8, -size * 0.8, size * 1.6, size * 1.6);
      ctx.restore();
    };

    const drawCross = (x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(-size, -size);
      ctx.lineTo(size, size);
      ctx.moveTo(size, -size);
      ctx.lineTo(-size, size);
      ctx.stroke();
      ctx.restore();
    };

    let t = 0;
    let animationId = null;

    const draw = () => {
      const { width, height } = dimsRef.current;
      ctx.clearRect(0, 0, width, height);

      targetRef.current.x += (mouseRef.current.x - targetRef.current.x) * FOLLOW_EASE;
      targetRef.current.y += (mouseRef.current.y - targetRef.current.y) * FOLLOW_EASE;

      const { x: cx, y: cy } = targetRef.current;
      const orbitRadius = Math.min(width, height) * 0.13;
      const shapeSize = Math.min(width, height) * 0.03;

      SHAPES.forEach((shape, i) => {
        const angle = t + shape.angleOffset;
        const sx = cx + Math.cos(angle) * orbitRadius;
        const sy = cy + Math.sin(angle) * orbitRadius * 0.6;
        const spin = t * SPIN_SPEED + i;

        ctx.lineWidth = 2.5;
        ctx.strokeStyle = shape.color;
        ctx.shadowColor = shape.color;
        ctx.shadowBlur = 18;
        ctx.globalAlpha = 0.55;

        if (shape.key === 'triangle') drawTriangle(sx, sy, shapeSize, spin);
        if (shape.key === 'circle') drawCircle(sx, sy, shapeSize);
        if (shape.key === 'cross') drawCross(sx, sy, shapeSize * 0.8, spin);
        if (shape.key === 'square') drawSquare(sx, sy, shapeSize * 0.8, spin);
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      t += ORBIT_SPEED;
      draw();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    if (prefersReducedMotion) {
      draw();
    } else {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [canvasRef]);
};
