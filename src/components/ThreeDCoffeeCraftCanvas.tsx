import React, { useEffect, useRef } from 'react';

interface Droplet {
  x: number;
  y: number;
  speed: number;
  length: number;
  alpha: number;
  color: string;
}

interface SwirlParticle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  alpha: number;
  color: string;
}

interface IceCube {
  x: number;
  y: number;
  size: number;
  rot: number;
  rotSpeed: number;
  vy: number;
  alpha: number;
}

interface SplashRipple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
}

interface ThreeDCoffeeCraftCanvasProps {
  className?: string;
  isActive?: boolean;
}

export const ThreeDCoffeeCraftCanvas: React.FC<ThreeDCoffeeCraftCanvasProps> = ({
  className = '',
  isActive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 320);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 320);

    const centerX = width * 0.5;
    const pourTargetY = height * 0.48;

    // Pour stream droplets
    const droplets: Droplet[] = [];
    for (let i = 0; i < 24; i++) {
      droplets.push({
        x: centerX + (Math.random() - 0.5) * 8,
        y: Math.random() * pourTargetY,
        speed: 3 + Math.random() * 4,
        length: 8 + Math.random() * 14,
        alpha: 0.6 + Math.random() * 0.4,
        color: Math.random() > 0.4 ? '#4a2511' : '#c89658',
      });
    }

    // Swirling milk & espresso vortex particles
    const swirls: SwirlParticle[] = [];
    for (let i = 0; i < 35; i++) {
      swirls.push({
        angle: Math.random() * Math.PI * 2,
        radius: 20 + Math.random() * 55,
        speed: (0.015 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1),
        size: 3 + Math.random() * 7,
        alpha: 0.25 + Math.random() * 0.55,
        color: Math.random() > 0.5 ? 'rgba(255, 245, 230, ' : 'rgba(180, 115, 60, ',
      });
    }

    // Floating Ice cubes
    const iceCubes: IceCube[] = [
      { x: centerX - 36, y: pourTargetY + 15, size: 22, rot: 0.2, rotSpeed: 0.005, vy: 0.1, alpha: 0.8 },
      { x: centerX + 28, y: pourTargetY + 28, size: 26, rot: -0.4, rotSpeed: -0.004, vy: -0.1, alpha: 0.85 },
      { x: centerX - 10, y: pourTargetY + 45, size: 20, rot: 0.6, rotSpeed: 0.006, vy: 0.05, alpha: 0.75 },
    ];

    // Surface splash ripples
    const ripples: SplashRipple[] = [];

    let frame = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // 1. Draw Pouring Espresso / Milk Stream from top
      const streamXOffset = Math.sin(frame * 0.04) * 3;
      const topX = centerX + streamXOffset;

      // Outer golden espresso beam
      const streamGrad = ctx.createLinearGradient(topX, 0, centerX, pourTargetY);
      streamGrad.addColorStop(0, 'rgba(139, 69, 19, 0.95)');
      streamGrad.addColorStop(0.3, 'rgba(218, 165, 32, 0.9)');
      streamGrad.addColorStop(0.7, 'rgba(92, 45, 14, 0.95)');
      streamGrad.addColorStop(1, 'rgba(255, 235, 205, 0.85)');

      ctx.beginPath();
      ctx.moveTo(topX - 4.5, 0);
      ctx.bezierCurveTo(
        topX - 3, pourTargetY * 0.4,
        centerX - 3, pourTargetY * 0.8,
        centerX - 5, pourTargetY
      );
      ctx.lineTo(centerX + 5, pourTargetY);
      ctx.bezierCurveTo(
        centerX + 3, pourTargetY * 0.8,
        topX + 3, pourTargetY * 0.4,
        topX + 4.5, 0
      );
      ctx.closePath();
      ctx.fillStyle = streamGrad;
      ctx.shadowColor = 'rgba(242, 174, 88, 0.6)';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner concentrated espresso core line
      ctx.beginPath();
      ctx.moveTo(topX, 0);
      ctx.bezierCurveTo(topX, pourTargetY * 0.5, centerX, pourTargetY * 0.7, centerX, pourTargetY);
      ctx.strokeStyle = 'rgba(255, 230, 180, 0.85)';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Droplets running down along the stream
      droplets.forEach((d) => {
        d.y += d.speed;
        if (d.y > pourTargetY) {
          d.y = 0;
          d.x = centerX + streamXOffset + (Math.random() - 0.5) * 6;
          // Spawn ripple
          if (ripples.length < 10) {
            ripples.push({
              x: centerX + (Math.random() - 0.5) * 12,
              y: pourTargetY + (Math.random() - 0.5) * 4,
              r: 2,
              maxR: 18 + Math.random() * 12,
              alpha: 0.8,
            });
          }
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // 2. Surface Splash Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 0.8;
        rp.alpha -= 0.035;
        if (rp.alpha <= 0 || rp.r >= rp.maxR) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y, rp.r * 1.5, rp.r * 0.65, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 235, 205, ${rp.alpha})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // 3. Swirling Milk & Coffee Vortices
      swirls.forEach((sw) => {
        sw.angle += sw.speed;
        const px = centerX + Math.cos(sw.angle) * sw.radius;
        // Perspective squash (ellipse) for 3D tilt
        const py = pourTargetY + 30 + Math.sin(sw.angle) * (sw.radius * 0.42);

        ctx.beginPath();
        ctx.arc(px, py, sw.size, 0, Math.PI * 2);
        ctx.fillStyle = `${sw.color}${sw.alpha})`;
        ctx.fill();
      });

      // 4. Render 3D Floating Ice Cubes
      iceCubes.forEach((cube) => {
        cube.rot += cube.rotSpeed;
        cube.y += Math.sin(frame * 0.03 + cube.x) * 0.25;

        ctx.save();
        ctx.translate(cube.x, cube.y);
        ctx.rotate(cube.rot);

        // Ice cube translucent body
        ctx.fillStyle = 'rgba(235, 245, 255, 0.45)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(180, 220, 255, 0.6)';
        ctx.shadowBlur = 8;

        const half = cube.size / 2;
        // Rounded rect cube
        ctx.beginPath();
        ctx.roundRect(-half, -half, cube.size, cube.size, 4);
        ctx.fill();
        ctx.stroke();

        // 3D Highlight Glare on Ice Cube edge
        ctx.beginPath();
        ctx.moveTo(-half + 3, -half + 3);
        ctx.lineTo(half - 3, -half + 3);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      });

      // 5. Rising Cold Frost Vapour droplets at surface
      const mistX = centerX + Math.sin(frame * 0.05) * 35;
      const mistY = pourTargetY + Math.cos(frame * 0.03) * 10;
      const mistGrad = ctx.createRadialGradient(mistX, mistY, 0, mistX, mistY, 40);
      mistGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
      mistGrad.addColorStop(0.5, 'rgba(220, 240, 255, 0.08)');
      mistGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = mistGrad;
      ctx.beginPath();
      ctx.arc(mistX, mistY, 40, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-20 ${className}`}
    />
  );
};
