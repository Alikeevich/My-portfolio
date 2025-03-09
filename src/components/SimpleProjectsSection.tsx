"use client";

import React, { useState, useEffect } from "react";
import SimpleProjectCard from "./SimpleProjectCard";
import CategoryFilter from "./CategoryFilter";
import ScrollReveal from "./ScrollReveal";

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
      image: "/images/ANTBEAR.png",
      category: "Bots",
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
      image: "/images/ADOPTD.png",
      category: "AI",
      technologies: [
        { name: "Java" },
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
      image: "/images/LAWYER.png",
      category: "Bots",
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
      image: "/images/AMEN.png",
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
      image: "/images/TBI.png",
      category: "AI",
      technologies: [
        { name: "Ren'Py" },
        { name: "Python" },
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
    if (activeCategory === "All" || activeCategory === "Все") {
      setFilteredProjects(projects);
    } else if (activeCategory === "AI" || activeCategory === "ИИ") {
      // AI category should include AI projects and some that use AI technology
      setFilteredProjects(
        projects.filter(
          (project) =>
            project.category === "AI" ||
            project.technologies.some(
              (tech) =>
                tech.name === "AI" ||
                tech.name === "OpenAI" ||
                tech.name === "AI Storytelling" ||
                tech.name === "NLP",
            ),
        ),
      );
    } else if (activeCategory === "Bots" || activeCategory === "Боты") {
      // Bots category should include bot projects
      setFilteredProjects(
        projects.filter(
          (project) =>
            project.category === "Bots" ||
            project.title.toLowerCase().includes("bot") ||
            project.description.toLowerCase().includes("bot") ||
            (project.descriptionRU &&
              project.descriptionRU.toLowerCase().includes("бот")),
        ),
      );
    } else if (activeCategory === "Web" || activeCategory === "Веб") {
      // Web category should include web projects and those with web technologies
      setFilteredProjects(
        projects.filter(
          (project) =>
            project.category === "Web" ||
            project.technologies.some(
              (tech) =>
                tech.name === "React" ||
                tech.name === "Next.js" ||
                tech.name === "Vue.js" ||
                tech.name === "WebRTC",
            ),
        ),
      );
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
    <section className="py-20 px-4 md:px-8 min-h-screen" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              {language === "EN" ? title : titleRU}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-purple-200/80 max-w-2xl mx-auto">
              {language === "EN" ? subtitle : subtitleRU}
            </p>
          </ScrollReveal>
        </div>

        {/* Category Filter */}
        <ScrollReveal delay={0.3} distance="10px">
          <div className="mb-12">
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
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              className="h-full"
              delay={0.2 + index * 0.1}
              direction={index % 2 === 0 ? "left" : "right"}
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
            </ScrollReveal>
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
