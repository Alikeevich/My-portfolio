"use client";

import React, { useState } from "react";
import { ExternalLink, Github, Code } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

interface Technology {
  name: string;
  color?: string;
}

interface ProjectCardProps {
  title?: string;
  description?: string;
  image?: string;
  category?: "AI" | "Bots" | "Web" | string;
  technologies?: Technology[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const SimpleProjectCard = ({
  title = "AI Image Generator",
  description = "A deep learning model that generates realistic images from text descriptions using state-of-the-art diffusion models.",
  image = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=450&q=80",
  category = "AI",
  technologies = [
    { name: "Python" },
    { name: "PyTorch" },
    { name: "React" },
    { name: "TensorFlow" },
  ],
  githubUrl = "#",
  liveUrl = "#",
  featured = false,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-full transition-transform duration-500 hover:scale-103"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full flex flex-col bg-[#1a0b2e] border-purple-900/50 shadow-lg shadow-purple-900/20">
        <div className="relative overflow-hidden">
          {/* Project Image */}
          <div className="h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
              style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
            />
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              className={`
                ${category === "AI" ? "bg-purple-600 hover:bg-purple-700" : ""}
                ${category === "Bots" ? "bg-blue-600 hover:bg-blue-700" : ""}
                ${category === "Web" ? "bg-pink-600 hover:bg-pink-700" : ""}
                text-white font-medium
              `}
            >
              {category}
            </Badge>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-amber-500 hover:bg-amber-600 text-black font-medium">
                Featured
              </Badge>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow">
          {/* Project Title */}
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>

          {/* Project Description */}
          <p className="text-purple-200/80 mb-4 flex-grow">{description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs border-purple-500/50 text-purple-300"
              >
                {tech.name}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-auto">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-purple-900/30 hover:bg-purple-800 transition-colors duration-300 hover:-translate-y-1"
              >
                <Github className="w-5 h-5 text-purple-300" />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-purple-900/30 hover:bg-purple-800 transition-colors duration-300 hover:-translate-y-1"
              >
                <ExternalLink className="w-5 h-5 text-purple-300" />
              </a>
            )}
          </div>
        </div>

        {/* Hover effect overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent transition-opacity duration-300 pointer-events-none ${isHovered ? "opacity-50" : "opacity-0"}`}
        />
      </Card>
    </div>
  );
};

export default SimpleProjectCard;
