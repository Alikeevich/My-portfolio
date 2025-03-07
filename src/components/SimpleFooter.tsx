"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface FooterProps {
  socialLinks?: {
    github?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    telegram?: string;
  };
  email?: string;
  copyrightYear?: number;
  developerName?: string;
}

const SimpleFooter = ({
  socialLinks = {
    github: "https://github.com/Alikeevich",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me",
  },
  email = "contact@example.com",
  copyrightYear = new Date().getFullYear(),
  developerName = "Alikeevich",
}: FooterProps) => {
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

  const socialIcons = [
    { icon: Github, link: socialLinks.github, label: "GitHub" },
    { icon: Twitter, link: socialLinks.twitter, label: "Twitter" },
    { icon: Instagram, link: socialLinks.instagram, label: "Instagram" },
    { icon: Linkedin, link: socialLinks.linkedin, label: "LinkedIn" },
    { icon: Mail, link: `mailto:${email}`, label: "Email" },
  ];

  return (
    <footer className="w-full py-8 px-4 bg-[#120726] border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-2 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
              {developerName}
            </div>
            <p className="text-purple-300/70 text-sm">
              © {copyrightYear}{" "}
              {language === "EN" ? "All rights reserved" : "Все права защищены"}
            </p>
          </div>

          {/* Social links */}
          <div className="flex gap-4">
            {socialIcons.map((social, index) => (
              <a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-2 rounded-full bg-purple-900/30 hover:bg-purple-800/50 transition-colors duration-300 hover:-translate-y-1 transform transition-transform">
                  <social.icon className="w-5 h-5 text-purple-300 group-hover:text-purple-100" />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {social.label}
                </span>
                <div className="absolute -inset-1 rounded-full bg-purple-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-4 border-t border-purple-900/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-purple-300/50 text-xs">
            {language === "EN" ? "Designed with" : "Создано с"}{" "}
            <span className="inline-block animate-pulse">
              <Heart className="h-3 w-3 inline text-pink-500" />
            </span>{" "}
            {language === "EN" ? "and code" : "и кодом"}
          </div>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-300/70 hover:text-purple-100 hover:bg-purple-900/50"
            >
              {language === "EN"
                ? "Privacy Policy"
                : "Политика конфиденциальности"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-300/70 hover:text-purple-100 hover:bg-purple-900/50"
            >
              {language === "EN" ? "Terms of Service" : "Условия использования"}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
