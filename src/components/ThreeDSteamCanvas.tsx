import React, { useEffect, useRef } from 'react';

interface SteamParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface ThreeDSteamCanvasProps {
  className?: string;
  intensity?: number; // 1 to 3
}

export const ThreeDSteamCanvas: React.FC<ThreeDSteamCanvasProps> = ({
  className = '',
  intensity = 1.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 200);

    const particles: SteamParticle[] = [];
    const count = Math.floor(25 * intensity);

    const createParticle = (): SteamParticle => {
      const startX = width * 0.5 + (Math.random() - 0.5) * (width * 0.4);
      const startY = height * 0.95;
      return {
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 0.8 + 0.6),
        radius: Math.random() * 12 + 10,
        maxRadius: Math.random() * 45 + 35,
        alpha: Math.random() * 0.25 + 0.15,
        life: 0,
        maxLife: Math.random() * 90 + 70,
      };
    };

    for (let i = 0; i < count; i++) {
      const p = createParticle();
      p.y = height * 0.95 - Math.random() * (height * 0.8);
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx + Math.sin(p.life * 0.05) * 0.35;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const currentRadius = p.radius + (p.maxRadius - p.radius) * progress;
        
        // Bell curve alpha fade
        let currentAlpha = 0;
        if (progress < 0.25) {
          currentAlpha = (progress / 0.25) * p.alpha;
        } else {
          currentAlpha = (1 - (progress - 0.25) / 0.75) * p.alpha;
        }

        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, currentRadius
        );
        gradient.addColorStop(0, `rgba(255, 240, 220, ${currentAlpha * 0.7})`);
        gradient.addColorStop(0.5, `rgba(255, 230, 200, ${currentAlpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 220, 180, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -30) {
          particles[idx] = createParticle();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-20 w-full h-full ${className}`}
    />
  );
};
