"use client";

import React, { useState, useEffect } from "react";
import { Github, Instagram, Send, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
  label: string;
  color: string;
}

const SocialLink = ({ icon, href, label, color }: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full",
        "transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-[0_0_15px_rgba(149,76,233,0.6)] active:scale-95",
        color,
      )}
      title={label}
    >
      {icon}
    </a>
  );
};

interface ContactSectionProps {
  title?: string;
  titleRU?: string;
  subtitle?: string;
  subtitleRU?: string;
  socialLinks?: {
    github?: string;
    instagram?: string;
    telegram?: string;
  };
}

const SimpleContactSection = ({
  title = "Get In Touch",
  titleRU = "Свяжитесь со мной",
  subtitle = "Have a project in mind or want to collaborate? Feel free to reach out!",
  subtitleRU = "Есть проект или хотите сотрудничать? Не стесняйтесь обращаться!",
  socialLinks = {
    github: "https://github.com/Alikeevich",
    instagram: "https://www.instagram.com/alik_eevich/",
    telegram: "https://t.me/Aleshhhhhh",
  },
}: ContactSectionProps) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending (without actually sending an email)
    setTimeout(() => {
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setIsSubmitting(false);

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const placeholders = {
    name: language === "EN" ? "Your Name" : "Ваше имя",
    email: language === "EN" ? "Your Email" : "Ваш Email",
    message: language === "EN" ? "Your Message" : "Ваше сообщение",
  };

  const buttonText = {
    send: language === "EN" ? "Send Message" : "Отправить сообщение",
    sending: language === "EN" ? "Sending..." : "Отправка...",
  };

  const successMessage = {
    title: language === "EN" ? "Message Sent!" : "Сообщение отправлено!",
    text:
      language === "EN"
        ? "Thanks for reaching out. I'll get back to you soon."
        : "Спасибо за обращение. Я свяжусь с вами в ближайшее время.",
  };

  return (
    <section
      className="py-20 px-4 md:px-8 min-h-screen flex items-center justify-center"
      id="contact"
    >
      <div className="max-w-6xl w-full mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            {language === "EN" ? title : titleRU}
          </h2>
          <p className="text-purple-200/80 text-lg max-w-2xl mx-auto">
            {language === "EN" ? subtitle : subtitleRU}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <ScrollReveal delay={0.2} direction="left">
            <div className="bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 shadow-xl shadow-purple-900/20">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                <h3 className="text-2xl font-semibold text-white">
                  {language === "EN" ? "Send a Message" : "Отправить сообщение"}
                </h3>
              </div>

              {isSubmitted ? (
                <div className="bg-purple-800/40 border border-purple-500/50 rounded-lg p-6 text-center opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                  <div className="w-16 h-16 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-purple-300" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-2">
                    {successMessage.title}
                  </h4>
                  <p className="text-purple-200/80">{successMessage.text}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder={placeholders.name}
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
                      placeholder={placeholders.email}
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="bg-purple-950/50 border-purple-700/50 text-white placeholder:text-purple-300/50 focus:border-purple-500 h-12"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder={placeholders.message}
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
                        <span>{buttonText.sending}</span>
                      </div>
                    ) : (
                      buttonText.send
                    )}
                  </Button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Contact Info & Social Links */}
          <ScrollReveal className="space-y-10" delay={0.3} direction="right">
            {/* Contact Info */}
            <div className="bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 shadow-xl shadow-purple-900/20">
              <h3 className="text-2xl font-semibold text-white mb-6">
                {language === "EN" ? "Connect With Me" : "Свяжитесь со мной"}
              </h3>
              <p className="text-purple-200/80 mb-8 leading-relaxed">
                {language === "EN"
                  ? "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision."
                  : "Я всегда открыт для обсуждения новых проектов, творческих идей или возможностей стать частью вашего видения."}
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-4">
                <SocialLink
                  icon={<Github className="w-6 h-6 text-white" />}
                  href={socialLinks.github || "#"}
                  label="GitHub"
                  color="bg-purple-800 hover:bg-purple-700"
                />
                <SocialLink
                  icon={<Instagram className="w-6 h-6 text-white" />}
                  href={socialLinks.instagram || "#"}
                  label="Instagram"
                  color="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                />
                <SocialLink
                  icon={<Send className="w-6 h-6 text-white" />}
                  href={socialLinks.telegram || "#"}
                  label="Telegram"
                  color="bg-blue-600 hover:bg-blue-700"
                />
              </div>
            </div>

            {/* Animated Decoration */}
            <div
              className="relative h-64 rounded-2xl overflow-hidden border border-purple-500/30 shadow-xl shadow-purple-900/20 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-fuchsia-900/80 z-10"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&q=80')] bg-cover bg-center opacity-50"></div>

              {/* Content */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center p-6">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {language === "EN"
                      ? "Let's Create Something Amazing"
                      : "Давайте создадим что-то удивительное"}
                  </h4>
                  <p className="text-purple-200/90">
                    {language === "EN"
                      ? "Turn your ideas into reality with cutting-edge technology"
                      : "Превратите ваши идеи в реальность с помощью передовых технологий"}
                  </p>
                </div>
              </div>

              {/* Glow Effects */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/30 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-600/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default SimpleContactSection;
