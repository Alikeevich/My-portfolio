"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Instagram, Send, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
  label: string;
  color: string;
}

const SocialLink = ({ icon, href, label, color }: SocialLinkProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full",
        "transition-all duration-300 shadow-lg",
        color,
      )}
      whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(149, 76, 233, 0.6)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      title={label}
    >
      {icon}
    </motion.a>
  );
};

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  socialLinks?: {
    github?: string;
    instagram?: string;
    telegram?: string;
  };
}

const ContactSection = ({
  title = "Get In Touch",
  subtitle = "Have a project in mind or want to collaborate? Feel free to reach out!",
  socialLinks = {
    github: "https://github.com",
    instagram: "https://instagram.com",
    telegram: "https://t.me/username",
  },
}: ContactSectionProps) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-[#1a0b2e] min-h-screen flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            {title}
          </h2>
          <p className="text-purple-200/80 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 shadow-xl shadow-purple-900/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-semibold text-white">
                Send a Message
              </h3>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-purple-800/40 border border-purple-500/50 rounded-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-purple-300" />
                </div>
                <h4 className="text-xl font-medium text-white mb-2">
                  Message Sent!
                </h4>
                <p className="text-purple-200/80">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="bg-purple-950/50 border-purple-700/50 text-white placeholder:text-purple-300/50 focus:border-purple-500 h-12"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="bg-purple-950/50 border-purple-700/50 text-white placeholder:text-purple-300/50 focus:border-purple-500 h-12"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    value={formState.message}
                    onChange={handleChange}
                    className="bg-purple-950/50 border-purple-700/50 text-white placeholder:text-purple-300/50 focus:border-purple-500 min-h-[120px]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 h-12 rounded-lg transition-all duration-300 shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-10"
          >
            {/* Contact Info */}
            <div className="bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 shadow-xl shadow-purple-900/20">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Connect With Me
              </h3>
              <p className="text-purple-200/80 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas or
                opportunities to be part of your vision.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-4">
                <SocialLink
                  icon={<Github className="w-6 h-6 text-white" />}
                  href={socialLinks.github}
                  label="GitHub"
                  color="bg-purple-800 hover:bg-purple-700"
                />
                <SocialLink
                  icon={<Instagram className="w-6 h-6 text-white" />}
                  href={socialLinks.instagram}
                  label="Instagram"
                  color="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                />
                <SocialLink
                  icon={<Send className="w-6 h-6 text-white" />}
                  href={socialLinks.telegram}
                  label="Telegram"
                  color="bg-blue-600 hover:bg-blue-700"
                />
              </div>
            </div>

            {/* Animated Decoration */}
            <motion.div
              className="relative h-64 rounded-2xl overflow-hidden border border-purple-500/30 shadow-xl shadow-purple-900/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-fuchsia-900/80 z-10"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&q=80')] bg-cover bg-center opacity-50"></div>

              {/* Animated Particles */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center p-6">
                  <h4 className="text-xl font-bold text-white mb-2">
                    Let's Create Something Amazing
                  </h4>
                  <p className="text-purple-200/90">
                    Turn your ideas into reality with cutting-edge technology
                  </p>
                </div>
              </div>

              {/* Animated Glow Effects */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/30 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-600/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
