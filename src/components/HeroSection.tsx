"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Code, Cpu, Database, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  name?: string;
  title?: string;
  specialties?: string[];
}

const HeroSection = ({
  name = "Alex Volkov",
  title = "AI & Web Developer",
  specialties = [
    "Machine Learning",
    "Neural Networks",
    "Web Development",
    "Chatbots",
  ],
}: HeroSectionProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateParticleMovement = (index: number) => {
    const baseX = (mousePosition.x - window.innerWidth / 2) / 50;
    const baseY = (mousePosition.y - window.innerHeight / 2) / 50;
    // Add some variation based on the particle index
    return {
      x: baseX * (1 + (index % 3) * 0.2),
      y: baseY * (1 + (index % 2) * 0.3),
    };
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: [0.3, 0.6, 0.3],
      scale: [0.8, 1, 0.8],
      transition: {
        delay: 0.2 * i,
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    }),
  };

  const particles = Array.from({ length: 15 }, (_, i) => {
    const size = Math.random() * 80 + 40;
    const initialX = Math.random() * window.innerWidth;
    const initialY = Math.random() * 600;
    const depth = Math.random() * 0.5 + 0.5; // 0.5 to 1

    return {
      id: i,
      size,
      x: initialX,
      y: initialY,
      depth,
      icon: i % 4,
    };
  });

  const getIconComponent = (iconIndex: number) => {
    switch (iconIndex) {
      case 0:
        return <Cpu className="text-purple-300" />;
      case 1:
        return <Code className="text-purple-300" />;
      case 2:
        return <Database className="text-purple-300" />;
      case 3:
        return <Globe className="text-purple-300" />;
      default:
        return <Cpu className="text-purple-300" />;
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[800px] w-full flex flex-col items-center justify-center overflow-hidden bg-[#1a0b2e] py-20 px-4"
    >
      {/* Floating particles */}
      {particles.map((particle) => {
        const movement = calculateParticleMovement(particle.id);
        return (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            initial="hidden"
            animate={controls}
            variants={particleVariants}
            custom={particle.id}
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              zIndex: Math.floor(particle.depth * 10),
              x: movement.x * particle.depth,
              y: movement.y * particle.depth,
            }}
          >
            <div
              className={cn(
                "w-full h-full flex items-center justify-center rounded-full",
                "bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20",
                "border border-purple-500/30 backdrop-blur-sm",
              )}
            >
              <div className="transform scale-[0.6]">
                {getIconComponent(particle.icon)}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Hero content */}
      <div className="z-10 text-center max-w-4xl">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={textVariants}
          custom={0}
          className="mb-4"
        >
          <span className="inline-block px-6 py-2 rounded-full bg-purple-900/30 text-purple-300 text-sm font-medium border border-purple-700/50 mb-6">
            Portfolio
          </span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate={controls}
          variants={textVariants}
          custom={1}
          className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-300"
        >
          {name}
        </motion.h1>

        <motion.h2
          initial="hidden"
          animate={controls}
          variants={textVariants}
          custom={2}
          className="text-2xl md:text-3xl font-medium mb-8 text-purple-200"
        >
          {title}
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={textVariants}
          custom={3}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-purple-800/30 text-purple-200 border border-purple-600/30"
            >
              {specialty}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={textVariants}
          custom={4}
        >
          <motion.button
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium shadow-lg shadow-purple-700/30 hover:shadow-purple-700/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View My Work
          </motion.button>
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a0b2e] pointer-events-none"></div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
