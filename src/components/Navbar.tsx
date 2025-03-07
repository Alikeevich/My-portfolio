"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface NavbarProps {
  logo?: string;
  menuItems?: Array<{ label: string; href: string }>;
  currentLanguage?: "EN" | "RU";
  onLanguageChange?: (language: "EN" | "RU") => void;
}

const Navbar = ({
  logo = "AI Developer",
  menuItems = [
    { label: "Home", href: "#" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  currentLanguage = "EN",
  onLanguageChange = () => {},
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    onLanguageChange(currentLanguage === "EN" ? "RU" : "EN");
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#1a0b2e]",
        isScrolled ? "shadow-lg shadow-purple-900/20 py-2" : "py-4",
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold">{logo}</span>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={item.href}
                className="px-4 py-2 text-purple-200 hover:text-white relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            </motion.div>
          ))}
        </nav>

        {/* Language Toggle and Theme Switch */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-900/50 text-purple-200 hover:bg-purple-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="w-4 h-4" />
            <span>{currentLanguage}</span>
          </motion.button>
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
                    <motion.a
                      key={index}
                      href={item.href}
                      className="text-lg text-purple-200 hover:text-white py-2 border-b border-purple-800/50"
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-auto pt-6">
                  <motion.button
                    onClick={() => {
                      toggleLanguage();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 w-full rounded-md bg-purple-900/50 text-purple-200 hover:bg-purple-800 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Globe className="w-5 h-5" />
                    <span>
                      {currentLanguage === "EN" ? "English" : "Русский"}
                    </span>
                  </motion.button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
