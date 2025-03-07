"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  direction: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  particleColors?: string[];
  maxSize?: number;
  minSize?: number;
  speed?: number;
  interactive?: boolean;
}

const SimpleParticleBackground = ({
  particleCount = 80,
  particleColors = ["#9d4edd", "#c77dff", "#7b2cbf", "#5a189a", "#3c096c"],
  maxSize = 5,
  minSize = 1,
  speed = 0.5,
  interactive = true,
}: ParticleBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    setDimensions({ width, height });

    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        color:
          particleColors[Math.floor(Math.random() * particleColors.length)],
        opacity: Math.random() * 0.5 + 0.2,
        speed: Math.random() * speed + 0.1,
        direction: Math.random() * 360,
      });
    }

    setParticles(newParticles);

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      setDimensions({ width, height });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [particleCount, particleColors, maxSize, minSize, speed]);

  // Handle mouse movement for interactive particles
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update and draw particles
      const updatedParticles = particles.map((particle) => {
        // Convert direction to radians
        const directionRad = (particle.direction * Math.PI) / 180;

        // Calculate new position
        let newX = particle.x + Math.cos(directionRad) * particle.speed;
        let newY = particle.y + Math.sin(directionRad) * particle.speed;

        // Bounce off walls
        if (newX < 0 || newX > dimensions.width) {
          particle.direction = (180 - particle.direction) % 360;
          newX = Math.max(0, Math.min(newX, dimensions.width));
        }

        if (newY < 0 || newY > dimensions.height) {
          particle.direction = (360 - particle.direction) % 360;
          newY = Math.max(0, Math.min(newY, dimensions.height));
        }

        // Interactive effect - particles move away from mouse
        if (interactive) {
          const dx = newX - mousePosition.x;
          const dy = newY - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = ((100 - distance) / 100) * 2;
            newX += Math.cos(angle) * force;
            newY += Math.sin(angle) * force;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Return updated particle
        return {
          ...particle,
          x: newX,
          y: newY,
        };
      });

      setParticles(updatedParticles);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, dimensions, mousePosition, interactive]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-[#0f0418] z-[-1]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0418] via-[#1a0b2e] to-[#0f0418] opacity-80" />

      {/* Floating gradient orbs for additional effect */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-700/20 blur-3xl animate-[pulse_15s_ease-in-out_infinite]" />

      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl animate-[pulse_20s_ease-in-out_infinite_1s]" />

      <div className="absolute top-2/3 left-1/2 w-72 h-72 rounded-full bg-fuchsia-600/10 blur-3xl animate-[pulse_18s_ease-in-out_infinite_2s]" />

      {/* Canvas for particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTMwIDBIMHYzMGgzMHoiIHN0cm9rZS1vcGFjaXR5PSIuMDUiIHN0cm9rZT0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDIiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzBoMzBIMzB6IiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzB2MzBoMzAiIHN0cm9rZS1vcGFjaXR5PSIuMDUiIHN0cm9rZT0iI2ZmZiIvPjwvZz48L3N2Zz4=')] opacity-10" />
    </div>
  );
};

export default SimpleParticleBackground;
