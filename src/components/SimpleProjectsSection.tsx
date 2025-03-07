"use client";

import React, { useState, useEffect } from "react";
import SimpleProjectCard from "./SimpleProjectCard";
import CategoryFilter from "./CategoryFilter";

interface Project {
  id: string;
  title: string;
  titleRU?: string;
  description: string;
  descriptionRU?: string;
  image: string;
  category: "AI" | "Bots" | "Web";
  technologies: { name: string; color?: string }[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

interface ProjectsSectionProps {
  title?: string;
  titleRU?: string;
  subtitle?: string;
  subtitleRU?: string;
  projects?: Project[];
}

const SimpleProjectsSection = ({
  title = "My Projects",
  titleRU = "Мои Проекты",
  subtitle = "Explore my latest work across different technologies and domains",
  subtitleRU = "Ознакомьтесь с моими последними работами в различных технологиях и областях",
  projects = [
    {
      id: "1",
      title: "AI English Tutor (Ant-Bear)",
      titleRU: "ИИ репетитор английского (Ant-Bear)",
      description:
        "An AI-powered English tutor that helps users improve their language skills through interactive conversations and personalized lessons.",
      descriptionRU:
        "Репетитор английского языка на базе ИИ, который помогает пользователям улучшить языковые навыки через интерактивные беседы и персонализированные уроки.",
      image:
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=450&q=80",
      category: "AI",
      technologies: [
        { name: "Python" },
        { name: "NLP" },
        { name: "React" },
        { name: "OpenAI" },
      ],
      liveUrl: "https://ant-bear.onrender.com/",
      featured: true,
    },
    {
      id: "2",
      title: "ADOPTD - Plant Disease Diagnosis",
      titleRU: "ADOPTD - Диагностика болезней растений",
      description:
        "Automatic Diagnosis of Plants and Tree Diseases - an AI bot that identifies illnesses in plants through image recognition.",
      descriptionRU:
        "Автоматическая диагностика болезней растений и деревьев - ИИ-бот, который определяет болезни растений с помощью распознавания изображений.",
      image:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=450&q=80",
      category: "AI",
      technologies: [
        { name: "Python" },
        { name: "TensorFlow" },
        { name: "Computer Vision" },
        { name: "React" },
      ],
      githubUrl: "https://github.com/Alikeevich/ADOPTD-site",
      liveUrl: "https://adoptd.netlify.app/",
    },
    {
      id: "3",
      title: "AI Lawyer for Kazakhstan",
      titleRU: "ИИ-юрист для Казахстана",
      description:
        "An AI-powered legal assistant that provides legal advice and information specific to Kazakhstan's legal system.",
      descriptionRU:
        "Юридический помощник на базе ИИ, который предоставляет юридические консультации и информацию, специфичную для правовой системы Казахстана.",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=450&q=80",
      category: "AI",
      technologies: [
        { name: "Python" },
        { name: "NLP" },
        { name: "Legal AI" },
        { name: "React" },
      ],
      liveUrl: "https://anticorruption-dlrj.onrender.com/",
    },
    {
      id: "4",
      title: "AMEN Chat Roulette",
      titleRU: "AMEN Чат-рулетка",
      description:
        "A chat roulette platform designed specifically for practicing English through conversations with other learners.",
      descriptionRU:
        "Платформа чат-рулетки, разработанная специально для практики английского языка через разговоры с другими изучающими.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=450&q=80",
      category: "Web",
      technologies: [
        { name: "Next.js" },
        { name: "WebRTC" },
        { name: "Tailwind" },
        { name: "Socket.io" },
      ],
      githubUrl: "https://github.com/Alikeevich/Amen-s-project",
      liveUrl: "https://amen-s-project.vercel.app/",
      featured: true,
    },
    {
      id: "5",
      title: "The Blackson Investigation",
      titleRU: "Расследование Блэксона",
      description:
        "An AI-powered interactive detective novella game where players solve mysteries through dialogue and investigation.",
      descriptionRU:
        "Интерактивная детективная новелла с ИИ, где игроки раскрывают тайны через диалоги и расследования.",
      image:
        "https://images.unsplash.com/photo-1605806616949-59175538ad92?w=450&q=80",
      category: "AI",
      technologies: [
        { name: "Unity" },
        { name: "C#" },
        { name: "AI Storytelling" },
        { name: "Game Design" },
      ],
      liveUrl: "https://alikeevich.itch.io/the-blackson-investigations",
    },
  ],
}: ProjectsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
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

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === activeCategory),
      );
    }
  }, [activeCategory, projects]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const categories =
    language === "EN"
      ? ["All", "AI", "Bots", "Web"]
      : ["Все", "ИИ", "Боты", "Веб"];

  return (
    <section
      className="py-20 px-4 md:px-8 bg-[#120727] min-h-screen"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className="text-center mb-16 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            {language === "EN" ? title : titleRU}
          </h2>
          <p className="text-lg text-purple-200/80 max-w-2xl mx-auto">
            {language === "EN" ? subtitle : subtitleRU}
          </p>
        </div>

        {/* Category Filter */}
        <div
          className="mb-12 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]"
          style={{ animationDelay: "0.4s" }}
        >
          <CategoryFilter
            categories={categories}
            activeCategory={
              activeCategory === "All"
                ? language === "EN"
                  ? "All"
                  : "Все"
                : activeCategory
            }
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="h-full opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <SimpleProjectCard
                title={
                  language === "EN"
                    ? project.title
                    : project.titleRU || project.title
                }
                description={
                  language === "EN"
                    ? project.description
                    : project.descriptionRU || project.description
                }
                image={project.image}
                category={project.category}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                featured={project.featured}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            <p className="text-xl text-purple-300">
              {language === "EN"
                ? "No projects found in this category."
                : "В этой категории проектов не найдено."}
            </p>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute -left-20 top-1/4 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -right-20 bottom-1/4 w-60 h-60 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </section>
  );
};

export default SimpleProjectsSection;
