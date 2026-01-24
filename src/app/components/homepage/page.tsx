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
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDarkMode } from "../../context/DarkModeContext";
import CommitGraph from "../CommitGraph";

import ThreeHero from "../ThreeHero";

const HomePage = () => {
  // Remove local dark mode state and use context
  const { isDarkMode } = useDarkMode();
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content Area */}
      <main className="pt-20">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center bg-background relative overflow-hidden"
        >
          <ThreeHero />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Software Developer
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
                I build cross-platform apps and smart software solutions with
                clean code and a passion for innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <a href="#projects">View My Work</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <a href="#get-in-touch" className="text-foreground">
                    Get In Touch
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Placeholder sections for demonstration */}
        {/* About Section */}
        <section id="about" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              About Me
            </h2>
            <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-8 shadow-sm">
              <p className="text-center text-lg md:text-xl max-w-4xl mx-auto text-muted-foreground leading-relaxed">
                Hello, I’m Mayur Kumar Garchar — a passionate Software Developer
                with expertise in building scalable web and mobile solutions. My
                journey spans from crafting high-performance marketing websites
                using Next.js and MongoDB to developing complex cross-platform
                mobile applications with Flutter. I specialize in backend logic
                with Node.js and Express when complexity demands, ensuring every
                solution is robust and efficient. From internships building
                accounting software in .NET to developing modern web platforms,
                I focus on clean code and user-centric design. Beyond coding, I
                explore machine learning with TensorFlow, always eager to
                integrate AI into practical applications. I'm committed to
                continuous learning and building software that makes an impact.
              </p>
              <div className="mt-12">
                <CommitGraph />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {/* Final Year Project */}
              <Card className="bg-card hover:shadow-xl transition-all duration-300 border-border/60">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-primary">
                    Final Year Project — Odd Job Services Web Platform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    A web platform to connect local odd job service providers
                    like plumbers and electricians with users in need.
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-2 text-foreground/80">
                    <li>
                      Developed frontend using HTML, CSS, and JavaScript for an
                      intuitive UI.
                    </li>
                    <li>
                      Used MySQL as the backend database for user and service
                      data.
                    </li>
                    <li>Focused on usability and functional design.</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Meals App */}
              <Card className="bg-card hover:shadow-xl transition-all duration-300 border-border/60">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-primary">
                    Meals App (Flutter)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    A Flutter app to help users find and prepare their favorite
                    meals with ease.
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-2 text-foreground/80">
                    <li>
                      Built with Flutter for a smooth cross-platform experience.
                    </li>
                    <li>
                      Enhanced user interaction through intuitive navigation.
                    </li>
                    <li>
                      <a
                        href="https://github.com/mayur858"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        GitHub Link
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Shopping List App */}
              <Card className="bg-card hover:shadow-xl transition-all duration-300 border-border/60">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-primary">
                    Shopping List App (Flutter)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    A lightweight shopping list app for adding and managing
                    items easily.
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-2 text-foreground/80">
                    <li>
                      Used Flutter to focus on interactivity and usability.
                    </li>
                    <li>
                      Implemented simple UI for quick item entry and management.
                    </li>
                    <li>
                      <a
                        href="https://github.com/mayur858"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        GitHub Link
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Neural Network ML Project */}
              <Card className="bg-card hover:shadow-xl transition-all duration-300 border-border/60">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-primary">
                    Neural Network ML Project
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    A machine learning project to predict handwritten numbers
                    using TensorFlow.
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-2 text-foreground/80">
                    <li>
                      Trained a neural network model to identify digits from
                      image datasets.
                    </li>
                    <li>Built using TensorFlow and Google Colab.</li>
                    <li>
                      <a
                        href="https://github.com/mayur858"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        GitHub Link
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Skills
            </h2>
            <p className="text-center text-lg max-w-3xl mx-auto mb-16 text-muted-foreground">
              Technologies I've worked with across mobile, web, and machine
              learning.
            </p>

            <div className="relative w-full overflow-hidden">
              {/* Left and Right fade gradients */}
              <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              <div className="flex w-max space-x-12 animate-scroll hover:[animation-play-state:paused] py-4">
                {[
                  ...[
                    {
                      name: "Flutter",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
                    },
                    {
                      name: "Dart",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
                    },
                    {
                      name: "C#",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
                    },
                    {
                      name: "Next.js",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                      className: "bg-white rounded p-0.5",
                    },
                    {
                      name: "PostgreSQL",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
                    },
                    {
                      name: "MongoDB",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
                    },
                    {
                      name: "Python",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                    },
                    {
                      name: "TensorFlow",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
                    },
                    {
                      name: "AWS",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
                      className: "bg-white rounded p-0.5",
                    },
                    {
                      name: "Express",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
                      className: "bg-white rounded p-0.5",
                    },
                    {
                      name: "Node.js",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                    },
                  ],
                  // Duplicate for seamless loop
                  ...[
                    {
                      name: "Flutter",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
                    },
                    {
                      name: "Dart",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
                    },
                    {
                      name: "C#",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
                    },
                    {
                      name: "Next.js",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                      className: "bg-white rounded p-0.5",
                    },
                    {
                      name: "PostgreSQL",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
                    },
                    {
                      name: "MongoDB",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
                    },
                    {
                      name: "Python",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                    },
                    {
                      name: "TensorFlow",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
                    },
                    {
                      name: "AWS",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
                      className: "bg-white rounded p-0.5",
                    },
                    {
                      name: "Express",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
                      className: "bg-white rounded p-0.5",
                    },
                    {
                      name: "Node.js",
                      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                    },
                  ],
                ].map((skill, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center group min-w-[100px]"
                  >
                    <div className="p-4 bg-muted/50 rounded-2xl border border-border/50 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/50 transition-all duration-300 shadow-sm group-hover:shadow-lg">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className={`w-12 h-12 ${skill.className || ""}`}
                      />
                    </div>
                    <span className="mt-3 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Experience
            </h2>
            <div className="space-y-12 max-w-4xl mx-auto">
              {/* DigitalCreatorz */}
              <div className="relative p-8 rounded-2xl shadow-lg bg-card border border-border/60 hover:border-primary/50 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Software Developer
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <span className="text-lg font-medium text-foreground">
                    DigitalCreatorz
                  </span>
                  <span className="text-sm px-3 py-1 bg-secondary rounded-full mt-2 sm:mt-0 w-fit">
                    Jan 2025 – Present
                  </span>
                </div>
                <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                  <li>
                    Developed high-performance marketing websites using Next.js
                    for frontend and MongoDB for data management.
                  </li>
                  <li>
                    Architected and deployed enterprise-level applications using
                    PostgreSQL on AWS EC2, with robust Express.js backends.
                  </li>
                  <li>
                    Built cross-platform mobile applications with Flutter,
                    utilizing Provider for state management.
                  </li>
                  <li>
                    Designed scalable codebases using the Model-Service
                    architecture to ensure reusability and maintainability.
                  </li>
                </ul>
              </div>

              {/* Tamanna Solutions Pvt Ltd */}
              <div className="relative p-8 rounded-2xl shadow-lg bg-card border border-border/60 hover:border-primary/50 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Software Developer Intern
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <span className="text-lg font-medium text-foreground">
                    Tamanna Solutions Pvt Ltd
                  </span>
                  <span className="text-sm px-3 py-1 bg-secondary rounded-full mt-2 sm:mt-0 w-fit">
                    Feb 2023 – Jul 2023
                  </span>
                </div>
                <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                  <li>
                    Contributed to the development of a desktop accounting
                    software for traders and small businesses.
                  </li>
                  <li>
                    Implemented features to generate invoices and track payments
                    effectively.
                  </li>
                  <li>
                    Worked with a team using Flutter and C#.NET to build
                    user-friendly Windows applications.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
