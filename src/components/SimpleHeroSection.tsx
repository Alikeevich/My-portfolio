"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Code, Database, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  name?: string;
  title?: string;
  titleRU?: string;
  specialties?: { en: string; ru: string }[];
}

const SimpleHeroSection = ({
  name = "Alikeevich",
  title = "AI & Web Developer",
  titleRU = "AI & Веб Разработчик",
  specialties = [
    { en: "Machine Learning", ru: "Машинное обучение" },
    { en: "Neural Networks", ru: "Нейронные сети" },
    { en: "Web Development", ru: "Веб-разработка" },
    { en: "Chatbots", ru: "Чат-боты" },
  ],
}: HeroSectionProps) => {
  const [language, setLanguage] = useState<"EN" | "RU">("EN");

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") as
      | "EN"
      | "RU"
      | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Listen for language changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const currentLanguage = localStorage.getItem("preferredLanguage") as
        | "EN"
        | "RU"
        | null;
      if (currentLanguage) {
        setLanguage(currentLanguage);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <section className="relative min-h-[800px] w-full flex flex-col items-center justify-center overflow-hidden py-20 px-4">
      {/* Background handled by AnimatedBackground component */}

      {/* Hero content */}
      <div className="z-10 text-center max-w-4xl">
        <div className="mb-4">
          <span className="inline-block px-6 py-2 rounded-full bg-purple-900/30 text-purple-300 text-sm font-medium border border-purple-700/50 mb-6">
            {language === "EN" ? "Portfolio" : "Портфолио"}
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-300">
          {name}
        </h1>

        <h2 className="text-2xl md:text-3xl font-medium mb-8 text-purple-200">
          {language === "EN" ? title : titleRU}
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-purple-800/30 text-purple-200 border border-purple-600/30"
            >
              {language === "EN" ? specialty.en : specialty.ru}
            </span>
          ))}
        </div>

        <div>
          <a href="#projects">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium shadow-lg shadow-purple-700/30 hover:shadow-purple-700/50 transition-all duration-300 hover:scale-105 active:scale-95">
              {language === "EN" ? "View My Work" : "Посмотреть мои работы"}
            </button>
          </a>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a0b2e] pointer-events-none"></div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default SimpleHeroSection;
