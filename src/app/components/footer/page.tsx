"use client";

import React from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Heart } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  const currentYear = new Date().getFullYear();

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
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
    <footer className="bg-muted/40 border-t border-border/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">MK</span>
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold text-foreground">
                  Mayur Kumar Garchar
                </h3>
                <p className="text-sm text-muted-foreground">
                  Software Developer
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Passionate about creating innovative solutions that make a
              difference. Always learning, always building, always improving.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-colors duration-200 bg-background hover:bg-primary/10 text-muted-foreground hover:text-primary border border-border/50 hover:border-primary/30"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navItems.slice(0, 4).map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              id="get-in-touch"
              className="text-lg font-semibold mb-4 text-foreground"
            >
              Get In Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-center group">
                <Mail className="w-4 h-4 mr-3 text-primary group-hover:scale-110 transition-transform" />
                <a
                  href="mailto:kumarmayur.2001@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  kumarmayur.2001@gmail.com
                </a>
              </div>
              <div className="flex items-center group">
                <Phone className="w-4 h-4 mr-3 text-primary group-hover:scale-110 transition-transform" />
                <a
                  href="tel:+919773064120"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  +91 9773064120
                </a>
              </div>
              <div className="flex items-center group">
                <MapPin className="w-4 h-4 mr-3 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-muted-foreground">
                  Surat, Gujarat, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <span>© {currentYear} Mayur Kumar Garchar. Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-500 fill-current animate-pulse" />
            <span>and lots of coffee.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
