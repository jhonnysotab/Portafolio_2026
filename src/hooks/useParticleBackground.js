import { useEffect, useRef } from 'react';

class Particle {
  constructor(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random();
  }

  update(width, height, mouseX, mouseY) {
    // Movimiento suave hacia el mouse
    this.x += this.vx + (mouseX - width / 2) * 0.0003;
    this.y += this.vy + (mouseY - height / 2) * 0.0003;
    
    // Mantener partículas DENTRO del viewport con margen
    const margin = 5;
    if (this.x < margin) {
      this.x = margin;
      this.vx *= -1;
    }
    if (this.x > width - margin) {
      this.x = width - margin;
      this.vx *= -1;
    }
    if (this.y < margin) {
      this.y = margin;
      this.vy *= -1;
    }
    if (this.y > height - margin) {
      this.y = height - margin;
      this.vy *= -1;
    }
  }

  draw(ctx, r, g, b) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha * 0.4})`;
    ctx.fill();
  }
}

export const useParticleBackground = (canvasRef) => {
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const neonColorRef = useRef({ r: 0, g: 245, b: 212 });
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const updateNeonColor = () => {
    const style = getComputedStyle(document.documentElement);
    const neonHex = style.getPropertyValue('--neon').trim();
    
    if (neonHex.startsWith('#')) {
      const hex = neonHex.replace('#', '');
      neonColorRef.current = {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
      };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Asegurar que el canvas no exceda el viewport
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      dimensionsRef.current = { width, height };
    };

    const createParticles = () => {
      const { width, height } = dimensionsRef.current;
      const particles = [];
      // Número fijo de partículas que no depende del tamaño
      const particleCount = 170;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
      return particles;
    };

    const repositionParticles = () => {
      const { width, height } = dimensionsRef.current;
      particlesRef.current.forEach(particle => {
        // Reubicar partículas que estén fuera del nuevo viewport
        if (particle.x > width) particle.x = Math.random() * width;
        if (particle.y > height) particle.y = Math.random() * height;
      });
    };

    const drawLines = (particles) => {
      const { r, g, b } = neonColorRef.current;
      const { width, height } = dimensionsRef.current;
      const maxDistance = Math.min(120, Math.min(width, height) * 0.15); // Distancia adaptativa
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - distance / maxDistance) * 0.08;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      const { width, height } = dimensionsRef.current;
      
      // Limpiar solo el área del canvas
      ctx.clearRect(0, 0, width, height);
      
      updateNeonColor();
      
      const { r, g, b } = neonColorRef.current;
      
      particlesRef.current.forEach(particle => {
        particle.update(width, height, mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx, r, g, b);
      });
      
      drawLines(particlesRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      // Limitar el mouse al viewport
      mouseRef.current.x = Math.max(0, Math.min(e.clientX, window.innerWidth));
      mouseRef.current.y = Math.max(0, Math.min(e.clientY, window.innerHeight));
    };

    const handleResize = () => {
      updateCanvasSize();
      repositionParticles();
    };

    // Inicialización
    updateCanvasSize();
    updateNeonColor();
    particlesRef.current = createParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    // Observer para cambios de tema
    const observer = new MutationObserver(() => {
      updateNeonColor();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasRef]);
};