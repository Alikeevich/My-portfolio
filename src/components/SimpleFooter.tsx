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
    instagram: "https://www.instagram.com/alik_eevich/",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me/Aleshhhhhh",
  },
  email = "alikkenzheb@gmail.com",
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

  const socialIcons = [];

  return (
    <footer className="w-full py-8 px-4 border-t border-purple-900/30 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start">
            <div
              className="text-2xl font-bold text-white mb-2 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] cursor-pointer relative group"
              onClick={() => {
                const element = document.getElementById(
                  "footer-name-animation",
                );
                if (element) {
                  element.classList.remove(
                    "animate-[nameAnimation_3s_ease-in-out]",
                  );
                  void element.offsetWidth; // Trigger reflow
                  element.classList.add(
                    "animate-[nameAnimation_3s_ease-in-out]",
                  );
                }
              }}
            >
              <span
                id="footer-name-animation"
                className="relative inline-block"
              >
                {developerName}
              </span>
              <span className="absolute -inset-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 h-0.5 bottom-0 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500 rounded-full"></span>
            </div>
            <p className="text-purple-300/70 text-sm">
              © {copyrightYear}{" "}
              {language === "EN" ? "All rights reserved" : "Все права защищены"}
            </p>
          </div>

          {/* Social links */}
          <div className="flex gap-4">
            {/* Social icons removed as requested */}
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
            <a href="/privacy-policy">
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-300/70 hover:text-purple-100 hover:bg-purple-900/50"
              >
                {language === "EN"
                  ? "Privacy Policy"
                  : "Политика конфиденциальности"}
              </Button>
            </a>
            <a href="/terms-of-service">
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-300/70 hover:text-purple-100 hover:bg-purple-900/50"
              >
                {language === "EN"
                  ? "Terms of Service"
                  : "Условия использования"}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
