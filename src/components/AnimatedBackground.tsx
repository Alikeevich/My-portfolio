"use client";

import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Create particles
    const particlesArray: Particle[] = [];
    const particleCount = 80;
    const particleColors = [
      "#9d4edd",
      "#c77dff",
      "#7b2cbf",
      "#5a189a",
      "#3c096c",
    ];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color =
          particleColors[Math.floor(Math.random() * particleColors.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (!canvas) return;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      gradient.addColorStop(0, "#0f0418");
      gradient.addColorStop(0.5, "#1a0b2e");
      gradient.addColorStop(1, "#0f0418");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid overlay
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 60;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw floating orbs
      const time = Date.now() * 0.001;

      // Orb 1
      ctx.beginPath();
      const x1 = canvas.width * 0.3 + Math.sin(time * 0.2) * 50;
      const y1 = canvas.height * 0.3 + Math.cos(time * 0.3) * 50;
      const radius1 = 150 + Math.sin(time) * 20;
      const gradient1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, radius1);
      gradient1.addColorStop(0, "rgba(157, 78, 221, 0.2)");
      gradient1.addColorStop(1, "rgba(157, 78, 221, 0)");
      ctx.fillStyle = gradient1;
      ctx.arc(x1, y1, radius1, 0, Math.PI * 2);
      ctx.fill();

      // Orb 2
      ctx.beginPath();
      const x2 = canvas.width * 0.7 + Math.cos(time * 0.3) * 50;
      const y2 = canvas.height * 0.6 + Math.sin(time * 0.2) * 50;
      const radius2 = 180 + Math.cos(time) * 20;
      const gradient2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, radius2);
      gradient2.addColorStop(0, "rgba(90, 24, 154, 0.2)");
      gradient2.addColorStop(1, "rgba(90, 24, 154, 0)");
      ctx.fillStyle = gradient2;
      ctx.arc(x2, y2, radius2, 0, Math.PI * 2);
      ctx.fill();

      // Orb 3
      ctx.beginPath();
      const x3 = canvas.width * 0.5 + Math.sin(time * 0.4) * 50;
      const y3 = canvas.height * 0.8 + Math.cos(time * 0.5) * 50;
      const radius3 = 120 + Math.sin(time * 1.5) * 20;
      const gradient3 = ctx.createRadialGradient(x3, y3, 0, x3, y3, radius3);
      gradient3.addColorStop(0, "rgba(199, 125, 255, 0.2)");
      gradient3.addColorStop(1, "rgba(199, 125, 255, 0)");
      ctx.fillStyle = gradient3;
      ctx.arc(x3, y3, radius3, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[-1] bg-[#0f0418]"
    />
  );
};

export default AnimatedBackground;
