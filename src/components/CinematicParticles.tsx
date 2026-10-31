import React, { useEffect, useRef } from 'react';

export const CinematicParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      maxOpacity: number;
      pulseSpeed: number;
      color: string;
    }

    const particleCount = 45;
    const particles: Particle[] = [];

    const colors = [
      'rgba(214, 180, 106, ', // warm subtle gold
      'rgba(234, 241, 255, ', // soft blue
      'rgba(255, 255, 255, ', // pure white
      'rgba(40, 100, 220, '   // royal blue accent
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speedX: (Math.random() - 0.45) * 0.35,
        speedY: -Math.random() * 0.4 - 0.1, // gently rising like dust in a sunbeam
        opacity: Math.random() * 0.5 + 0.1,
        maxOpacity: Math.random() * 0.45 + 0.25,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Mouse gentle interaction
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle soft diagonal sunbeam overlay
      const beamGradient = ctx.createLinearGradient(0, 0, width * 0.8, height);
      beamGradient.addColorStop(0, 'rgba(214, 180, 106, 0.04)');
      beamGradient.addColorStop(0.3, 'rgba(234, 241, 255, 0.025)');
      beamGradient.addColorStop(1, 'rgba(8, 27, 51, 0)');
      ctx.fillStyle = beamGradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.006;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Subtle mouse drift
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= (dx / dist) * 0.5;
          p.y -= (dy / dist) * 0.5;
        }

        const currentOpacity = Math.max(0.08, Math.min(p.opacity, p.maxOpacity));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentOpacity})`;
        ctx.fill();

        // Subtle glow for larger particles
        if (p.size > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${currentOpacity * 0.25})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
