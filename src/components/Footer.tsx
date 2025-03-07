import React from "react";
import { motion } from "framer-motion";
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

const Footer = ({
  socialLinks = {
    github: "https://github.com/Alikeevich",
    twitter: "https://twitter.com",
    instagram: "https://www.instagram.com/alik_eevich/",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me/Aleshhhhhh",
  },
  email = "alikkenzheb@gmail.com",
  copyrightYear = new Date().getFullYear(),
  developerName = "AI Developer",
}: FooterProps) => {
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-2"
            >
              {developerName}
            </motion.div>
            <p className="text-purple-300/70 text-sm">
              © {copyrightYear} All rights reserved
            </p>
          </div>

          {/* Social links */}
          <div className="flex gap-4">
            {socialIcons.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ y: -5, scale: 1.1 }}
                className="relative group"
              >
                <div className="p-2 rounded-full bg-purple-900/30 hover:bg-purple-800/50 transition-colors duration-300">
                  <social.icon className="w-5 h-5 text-purple-300 group-hover:text-purple-100" />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {social.label}
                </span>
                <div className="absolute -inset-1 rounded-full bg-purple-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-4 border-t border-purple-900/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-purple-300/50 text-xs">
            Designed with{" "}
            <span className="inline-block animate-pulse">
              <Heart className="h-3 w-3 inline text-pink-500" />
            </span>{" "}
            and code
          </div>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-300/70 hover:text-purple-100 hover:bg-purple-900/50"
            >
              Privacy Policy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-300/70 hover:text-purple-100 hover:bg-purple-900/50"
            >
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
