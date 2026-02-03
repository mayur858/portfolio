"use client";

import { useState, useEffect } from "react";
import BorderGradientButton from "../ui/BorderGradientButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, Download, Sun, Moon } from "lucide-react";
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

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed z-50 transition-all duration-500  ${
        isScrolled
          ? `top-4 left-1/2 -translate-x-1/2 w-[98%] max-w-5xl ${
              isMenuOpen
                ? "rounded-3xl bg-background"
                : "rounded-full bg-background/80"
            } border border-border/40 backdrop-blur-md shadow-lg dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]`
          : "top-0 left-0 w-full bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Avatar className="w-10 h-10">
              <AvatarImage
                className="grayscale"
                src="profile.jpg"
                alt="@shadcn"
              />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-foreground">
                Mayur Kumar Garchar
              </h1>
              {/* <p className="text-sm text-muted-foreground">
                {" "}
                Software Developer
              </p> */}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className="text-sm font-medium transition-colors duration-200 text-foreground/80 hover:text-primary cursor-pointer"
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
            <BorderGradientButton
              href="Mayur_s_Resume.pdf"
              download
              className="hidden sm:flex px-8 py-3 text-sm font-medium transition-transform hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </BorderGradientButton>

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
        <div
          className={`md:hidden border-t border-border mt-2 ${
            isScrolled ? "pb-4" : "bg-background rounded-b-2xl shadow-xl"
          }`}
        >
          <div className="px-4 py-6 space-y-4 flex flex-col items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-lg font-medium transition-colors duration-200 text-foreground hover:text-primary"
                onClick={(e) => handleScrollToSection(e, item.href)}
              >
                {item.name}
              </a>
            ))}
            <BorderGradientButton
              href="Mayur_s_Resume.pdf"
              download
              className="cursor-pointer px-6 py-3 text-sm font-medium w-full max-w-[200px]"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </BorderGradientButton>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
