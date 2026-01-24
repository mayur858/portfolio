"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  ExternalLink,
  Download,
  Sun,
  Moon,
} from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#get-in-touch" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/mayur858", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mayur-kumar-garchar/",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:kumarmayur.2001@gmail.com", label: "Email" },
  ];

  return (
    <header
      className={`fixed z-50 transition-all duration-500  ${
        isScrolled
          ? "top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl rounded-full border border-border/40 bg-background/80 backdrop-blur-md shadow-lg dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          : "top-0 left-0 w-full bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">MK</span>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-foreground">
                Mayur Kumar Garchar
              </h1>
              <p className="text-sm text-muted-foreground">
                {" "}
                Software Developer
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors duration-200 text-foreground/80 hover:text-primary"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg transition-colors duration-200 hover:bg-accent hover:text-accent-foreground text-foreground"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Resume download */}
            <a
              href="/Mayur_s_Resume.pdf"
              download
              className="hidden sm:flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-200 text-foreground"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border mt-2 rounded-b-2xl shadow-xl">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-lg font-medium transition-colors duration-200 text-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="/Mayur_s_Resume.pdf"
              download
              className="flex items-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
