import React, { useEffect, useRef } from 'react';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  alpha: number;
  color: string;
}

export const ThreeDHeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates for 3D rotation parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / height - 0.5) * 2;
      mouseX = nx;
      mouseY = ny;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Generate 3D Particles
    const particleCount = 70;
    const particles: Particle3D[] = [];
    const colors = ['#d48b38', '#e29d4c', '#f5f0e8', '#ffd285', '#b87326'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 100, // Depth from camera
        size: Math.random() * 3 + 1.2,
        speed: Math.random() * 0.8 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const fov = 400; // 3D Field of View

    let angle = 0;

    const render = () => {
      angle += 0.005;
      targetRotX = mouseY * 0.25;
      targetRotY = mouseX * 0.25;
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle 3D glowing orbital ring in perspective
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(1, 0.35 + rotX * 0.2);
      ctx.rotate(angle * 0.4 + rotY);
      
      const grad = ctx.createLinearGradient(-180, 0, 180, 0);
      grad.addColorStop(0, 'rgba(212, 139, 56, 0)');
      grad.addColorStop(0.5, 'rgba(212, 139, 56, 0.2)');
      grad.addColorStop(1, 'rgba(212, 139, 56, 0)');
      
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width * 0.35, 260), 0, Math.PI * 2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Render 3D particles with perspective projection
      particles.forEach((p) => {
        // Float upwards in 3D space
        p.y -= p.speed;
        if (p.y < -height * 0.75) {
          p.y = height * 0.75;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.z = Math.random() * 800 + 100;
        }

        // Apply 3D rotation based on mouse parallax
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);

        // Rotate around Y
        const rx = p.x * cosY - p.z * sinY;
        const rz = p.x * sinY + p.z * cosY;

        // Rotate around X
        const ry = p.y * cosX - rz * sinX;
        const finalZ = p.y * sinX + rz * cosX;

        // Perspective division
        if (finalZ + fov > 10) {
          const scale = fov / (fov + finalZ);
          const px = rx * scale + centerX;
          const py = ry * scale + centerY;

          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(px, py, Math.max(0.5, p.size * scale), 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.min(1, Math.max(0.05, p.alpha * scale));
            ctx.shadowBlur = 10 * scale;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.restore();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
