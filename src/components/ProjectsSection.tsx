"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import CategoryFilter from "./CategoryFilter";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "AI" | "Bots" | "Web";
  technologies: { name: string; color?: string }[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
}

const ProjectsSection = ({
  title = "My Projects",
  subtitle = "Explore my latest work across different technologies and domains",
  projects = [
    {
      id: "1",
      title: "Neural Image Generator",
      description:
        "Advanced AI model that creates realistic images from text descriptions using diffusion techniques.",
      image:
        "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=450&q=80",
      category: "AI",
      technologies: [
        { name: "Python" },
        { name: "PyTorch" },
        { name: "TensorFlow" },
        { name: "React" },
      ],
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
    },
    {
      id: "2",
      title: "Customer Support Bot",
      description:
        "Intelligent chatbot that handles customer inquiries with natural language processing capabilities.",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=450&q=80",
      category: "Bots",
      technologies: [
        { name: "Node.js" },
        { name: "NLP" },
        { name: "MongoDB" },
        { name: "Express" },
      ],
      githubUrl: "#",
    },
    {
      id: "3",
      title: "E-commerce Platform",
      description:
        "Full-featured online store with payment processing, inventory management, and analytics dashboard.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=450&q=80",
      category: "Web",
      technologies: [
        { name: "Next.js" },
        { name: "Stripe" },
        { name: "Tailwind" },
        { name: "Prisma" },
      ],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: "4",
      title: "Sentiment Analysis Tool",
      description:
        "AI-powered application that analyzes text to determine emotional tone and sentiment with high accuracy.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=450&q=80",
      category: "AI",
      technologies: [
        { name: "Python" },
        { name: "BERT" },
        { name: "Flask" },
        { name: "Vue.js" },
      ],
      githubUrl: "#",
    },
    {
      id: "5",
      title: "Social Media Dashboard",
      description:
        "Comprehensive analytics platform for tracking and optimizing social media performance across channels.",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=450&q=80",
      category: "Web",
      technologies: [
        { name: "React" },
        { name: "D3.js" },
        { name: "Firebase" },
        { name: "GraphQL" },
      ],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: "6",
      title: "Trading Assistant Bot",
      description:
        "Automated bot that provides real-time market analysis and trading recommendations based on algorithms.",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=450&q=80",
      category: "Bots",
      technologies: [
        { name: "Python" },
        { name: "TensorFlow" },
        { name: "WebSockets" },
        { name: "Redis" },
      ],
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
    },
  ],
}: ProjectsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [isInView, setIsInView] = useState(false);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      className="py-20 px-4 md:px-8 bg-[#120727] min-h-screen"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            {title}
          </h2>
          <p className="text-lg text-purple-200/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  category={project.category}
                  technologies={project.technologies}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                  featured={project.featured}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-purple-300">
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* Decorative Elements */}
        <div className="absolute -left-20 top-1/4 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -right-20 bottom-1/4 w-60 h-60 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </section>
  );
};

export default ProjectsSection;
