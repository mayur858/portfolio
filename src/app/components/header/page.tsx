"use client";

import { useState, useEffect, useRef } from "react";
import BorderGradientButton from "../ui/BorderGradientButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, Download, Sun, Moon, Eye } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";
import { trackEvent } from "@/lib/analytics";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const resumeLongPressTimer = useRef<number | null>(null);
  const resumeLongPressTriggered = useRef(false);

  const resumeHref = "Mayur_s_Resume.pdf";
  const resumeDownloadName = "Mayur_Kumar_Garchar_Resume.pdf";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeLongPressTimer.current) {
        window.clearTimeout(resumeLongPressTimer.current);
      }
    };
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

  const clearResumeLongPress = () => {
    if (resumeLongPressTimer.current) {
      window.clearTimeout(resumeLongPressTimer.current);
      resumeLongPressTimer.current = null;
    }
  };

  const openResumePreview = () => {
    window.location.assign(resumeHref);
  };

  const handleResumePressStart = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === "mouse") return;

    resumeLongPressTriggered.current = false;
    clearResumeLongPress();

    resumeLongPressTimer.current = window.setTimeout(() => {
      resumeLongPressTriggered.current = true;
      openResumePreview();
      setIsMenuOpen(false);
    }, 650);
  };

  const handleResumePressEnd = () => {
    clearResumeLongPress();
  };

  const handleMobileResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (resumeLongPressTriggered.current) {
      e.preventDefault();
      resumeLongPressTriggered.current = false;
      return;
    }

    trackEvent("resume_download", { placement: "mobile_menu" });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed z-50 transition-all duration-650  ${
        isScrolled
          ? `top-4 left-1/2 -translate-x-1/2 w-[98%] max-w-7xl ${
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

            {/* Resume actions */}
            <div className="hidden sm:flex items-center gap-2">
              <BorderGradientButton
                href={resumeHref}
                onClick={() => trackEvent("resume_view", { placement: "header" })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-sm font-medium transition-transform hover:scale-105"
                aria-label="View resume in a new tab"
                title="View resume"
              >
                <Eye className="w-4 h-4 mr-2" />
                Resume
              </BorderGradientButton>
              <a
                href={resumeHref}
                onClick={() => trackEvent("resume_download", { placement: "header" })}
                download={resumeDownloadName}
                className="p-3 rounded-full border border-border/60 text-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
                aria-label="Download resume"
                title="Download resume"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>

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
              href={resumeHref}
              download={resumeDownloadName}
              className="cursor-pointer select-none touch-manipulation px-6 py-3 text-sm font-medium w-full max-w-[200px]"
              onPointerDown={handleResumePressStart}
              onPointerUp={handleResumePressEnd}
              onPointerCancel={handleResumePressEnd}
              onPointerLeave={handleResumePressEnd}
              onClick={handleMobileResumeClick}
              onContextMenu={(e) => e.preventDefault()}
              aria-label="Tap to download resume. Press and hold to view resume."
              title="Tap to download. Press and hold to view."
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

