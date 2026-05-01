"use client";

import { useEffect, useRef, useCallback } from "react";

interface NgoParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  speed?: number;
  maxSize?: number;
}

// Component for particle field effect made by Anmol
export default function ParticleField({
  className = "",
  particleCount = 40,
  speed = 0.3,
  maxSize = 4,
}: ParticleFieldProps) {
  const ngo_canvasRef = useRef<HTMLCanvasElement>(null);
  const ngo_animationRef = useRef<number>(0);
  const ngo_particlesRef = useRef<NgoParticle[]>([]);

  const ngo_initParticles = useCallback((width: number, height: number) => {
    const ngo_particles: NgoParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      ngo_particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * maxSize + 1,
        speedX: (Math.random() - 0.5) * speed,
        speedY: -Math.random() * speed - 0.1,
        opacity: Math.random() * 0.6 + 0.1,
        hue: Math.random() > 0.5 ? 150 : 45, // green or gold
      });
    }
    ngo_particlesRef.current = ngo_particles;
  }, [particleCount, speed, maxSize]);

  useEffect(() => {
    const ngo_canvas = ngo_canvasRef.current;
    if (!ngo_canvas) return;

    const ngo_ctx = ngo_canvas.getContext("2d");
    if (!ngo_ctx) return;

    const ngo_resize = () => {
      const ngo_rect = ngo_canvas.parentElement?.getBoundingClientRect();
      if (ngo_rect) {
        ngo_canvas.width = ngo_rect.width;
        ngo_canvas.height = ngo_rect.height;
        if (ngo_particlesRef.current.length === 0) {
          ngo_initParticles(ngo_canvas.width, ngo_canvas.height);
        }
      }
    };

    ngo_resize();
    window.addEventListener("resize", ngo_resize);

    const ngo_animate = () => {
      if (!ngo_ctx || !ngo_canvas) return;
      ngo_ctx.clearRect(0, 0, ngo_canvas.width, ngo_canvas.height);

      ngo_particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.y < -10) {
          p.y = ngo_canvas.height + 10;
          p.x = Math.random() * ngo_canvas.width;
        }
        if (p.x < -10) p.x = ngo_canvas.width + 10;
        if (p.x > ngo_canvas.width + 10) p.x = -10;

        // Gentle sway
        p.x += Math.sin(Date.now() * 0.001 + p.y * 0.01) * 0.2;

        // Draw particle
        ngo_ctx.beginPath();
        ngo_ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const ngo_color = p.hue === 150
          ? `rgba(31, 169, 113, ${p.opacity})`
          : `rgba(212, 165, 55, ${p.opacity * 0.7})`;
        ngo_ctx.fillStyle = ngo_color;
        ngo_ctx.fill();

        // Subtle glow
        ngo_ctx.beginPath();
        ngo_ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        const ngo_glowColor = p.hue === 150
          ? `rgba(31, 169, 113, ${p.opacity * 0.1})`
          : `rgba(212, 165, 55, ${p.opacity * 0.08})`;
        ngo_ctx.fillStyle = ngo_glowColor;
        ngo_ctx.fill();
      });

      ngo_animationRef.current = requestAnimationFrame(ngo_animate);
    };

    ngo_animate();

    return () => {
      cancelAnimationFrame(ngo_animationRef.current);
      window.removeEventListener("resize", ngo_resize);
    };
  }, [ngo_initParticles]);

  return (
    <canvas
      ref={ngo_canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}
