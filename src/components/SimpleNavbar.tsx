"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface NavbarProps {
  logo?: string;
  menuItems?: Array<{ label: string; href: string; labelRU?: string }>;
  currentLanguage?: "EN" | "RU";
  onLanguageChange?: (language: "EN" | "RU") => void;
}

const SimpleNavbar = ({
  logo = "Alikeevich",
  menuItems = [
    { label: "Home", labelRU: "Главная", href: "#" },
    { label: "Projects", labelRU: "Проекты", href: "#projects" },
    { label: "Skills", labelRU: "Навыки", href: "#skills" },
    { label: "Contact", labelRU: "Контакты", href: "#contact" },
  ],
  currentLanguage = "EN",
  onLanguageChange = () => {},
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"EN" | "RU">(currentLanguage);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "EN" ? "RU" : "EN";
    setLanguage(newLanguage);
    onLanguageChange(newLanguage);
    // Store language preference in localStorage
    localStorage.setItem("preferredLanguage", newLanguage);
  };

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") as
      | "EN"
      | "RU"
      | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      onLanguageChange(savedLanguage);
    }
  }, [onLanguageChange]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#1a0b2e]",
        isScrolled ? "shadow-lg shadow-purple-900/20 py-2" : "py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold">{logo}</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="hover:scale-105 transition-transform duration-300"
            >
              <a
                href={item.href}
                className="px-4 py-2 text-purple-200 hover:text-white relative group"
              >
                {language === "EN" ? item.label : item.labelRU || item.label}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            </div>
          ))}
        </nav>

        {/* Language Toggle and Theme Switch */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-900/50 text-purple-200 hover:bg-purple-800 transition-colors hover:scale-105 active:scale-95"
          >
            <Globe className="w-4 h-4" />
            <span>{language}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-200 hover:text-white hover:bg-purple-900/50"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#1a0b2e] border-purple-900/50 w-[250px] p-0"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-purple-200 hover:text-white hover:bg-purple-900/50"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <nav className="flex flex-col space-y-6">
                  {menuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="text-lg text-purple-200 hover:text-white py-2 border-b border-purple-800/50 hover:translate-x-1 transition-transform duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {language === "EN"
                        ? item.label
                        : item.labelRU || item.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-auto pt-6">
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 w-full rounded-md bg-purple-900/50 text-purple-200 hover:bg-purple-800 transition-colors hover:scale-102 active:scale-98"
                  >
                    <Globe className="w-5 h-5" />
                    <span>{language === "EN" ? "English" : "Русский"}</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default SimpleNavbar;
