"use client"

import React, { useEffect } from "react";
import { useState } from "react";
import { Menu, X, Github, Linkedin, Mail, Phone, MapPin, Heart, ExternalLink, Download, Sun, Moon } from 'lucide-react';
import { useDarkMode } from "../../context/DarkModeContext";

const HomePage = () => {
    // Remove local dark mode state and use context
    const { isDarkMode } = useDarkMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
    ];

    const socialLinks = [
        { icon: Github, href: 'https://github.com/mayur858', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/mayur-kumar-garchar/', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:kumarmayur.2001@gmail.com', label: 'Email' }
    ];

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Main Content Area */}
            <main className="pt-20">
                {/* Hero Section */}
                <section id="home" className={`min-h-screen flex items-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Software Developer
                                </span>
                            </h1>
                            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                I build cross-platform apps and smart software solutions with clean code and a passion for innovation.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="#projects"
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    View My Work
                                </a>
                                <a
                                    href="#get-in-touch"
                                    className={`px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 ${isDarkMode ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900' : ''
                                        }`}
                                >
                                    Get In Touch
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Placeholder sections for demonstration */}
                <section id="about" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
                        <p className={`text-center text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Hello, I’m Mayur Kumar Garchar — a passionate and driven Software Developer with hands-on experience building cross-platform applications using Flutter and C# .NET. I specialize in crafting intuitive, scalable solutions for both mobile and desktop platforms, with a strong focus on user experience and performance.

                            During my internships, I contributed to real-world projects — from optimizing event management apps in Flutter to building accounting software using .NET — where I sharpened my skills in application logic, UI design, and performance tuning.

                            Beyond software development, I'm a machine learning enthusiast with foundational experience in TensorFlow, and I’m eager to apply ML to solve practical problems. I'm committed to continuous learning and constantly explore new tools, frameworks, and technologies to grow as a developer.

                            Let’s build something impactful.
                        </p>
                    </div>
                </section>

                <section id="projects" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Final Year Project */}
                            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}`}>
                                <h3 className="text-xl font-semibold mb-2">Final Year Project — Odd Job Services Web Platform</h3>
                                <p className="mb-2">A web platform to connect local odd job service providers like plumbers and electricians with users in need.</p>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>Developed frontend using HTML, CSS, and JavaScript for an intuitive UI.</li>
                                    <li>Used MySQL as the backend database for user and service data.</li>
                                    <li>Focused on usability and functional design.</li>
                                </ul>
                            </div>

                            {/* Meals App */}
                            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}`}>
                                <h3 className="text-xl font-semibold mb-2">Meals App (Flutter)</h3>
                                <p className="mb-2">A Flutter app to help users find and prepare their favorite meals with ease.</p>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>Built with Flutter for a smooth cross-platform experience.</li>
                                    <li>Enhanced user interaction through intuitive navigation.</li>
                                    <li><a href="https://github.com/mayur858" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">GitHub Link</a></li>
                                </ul>
                            </div>

                            {/* Shopping List App */}
                            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}`}>
                                <h3 className="text-xl font-semibold mb-2">Shopping List App (Flutter)</h3>
                                <p className="mb-2">A lightweight shopping list app for adding and managing items easily.</p>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>Used Flutter to focus on interactivity and usability.</li>
                                    <li>Implemented simple UI for quick item entry and management.</li>
                                    <li><a href="https://github.com/mayur858" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">GitHub Link</a></li>
                                </ul>
                            </div>

                            {/* Neural Network ML Project */}
                            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}`}>
                                <h3 className="text-xl font-semibold mb-2">Neural Network ML Project</h3>
                                <p className="mb-2">A machine learning project to predict handwritten numbers using TensorFlow.</p>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>Trained a neural network model to identify digits from image datasets.</li>
                                    <li>Built using TensorFlow and Google Colab.</li>
                                    <li><a href="https://github.com/mayur858" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">GitHub Link</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>


                <section id="skills" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
                        <p className={`text-center text-lg max-w-3xl mx-auto mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Technologies I've worked with across mobile, web, and machine learning.
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 justify-items-center">
                            {/* Flutter */}
                            <div className="flex flex-col items-center">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter" className="w-12 h-12" />
                                <span className="mt-2 text-sm text-center">Flutter</span>
                            </div>

                            {/* Dart */}
                            <div className="flex flex-col items-center">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" alt="Dart" className="w-12 h-12" />
                                <span className="mt-2 text-sm text-center">Dart</span>
                            </div>

                            {/* C# */}
                            <div className="flex flex-col items-center">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" className="w-12 h-12" />
                                <span className="mt-2 text-sm text-center">C#</span>
                            </div>

                            {/* Next.js */}
                            <div className="flex flex-col items-center">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-12 h-12 bg-white rounded" />
                                <span className="mt-2 text-sm text-center">Next.js</span>
                            </div>

                            {/* PostgreSQL */}
                            <div className="flex flex-col items-center">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-12 h-12" />
                                <span className="mt-2 text-sm text-center">PostgreSQL</span>
                            </div>

                            {/* MongoDB */}
                            <div className="flex flex-col items-center">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-12 h-12" />
                                <span className="mt-2 text-sm text-center">MongoDB</span>
                            </div>

                            {/* Python */}
                            <div className="flex flex-col items-center">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-12 h-12" />
                                <span className="mt-2 text-sm text-center">Python</span>
                            </div>

                            {/* TensorFlow */}
                            <div className="flex flex-col items-center">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="w-12 h-12" />
                                <span className="mt-2 text-sm text-center">TensorFlow</span>
                            </div>
                        </div>
                    </div>
                </section>


                <section id="experience" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
                        <div className="space-y-12">

                            {/* DigitalCreatorz */}
                            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}`}>
                                <h3 className="text-2xl font-semibold">Flutter Developer Intern</h3>
                                <p className="text-sm text-gray-400">DigitalCreatorz — Jan 2025 – Present</p>
                                <ul className="mt-4 list-disc list-inside space-y-2">
                                    <li>Maintained and added features to a cross-platform event and touring management application.</li>
                                    <li>Enhanced the booking system for smoother and more intuitive user experience.</li>
                                    <li>Optimized application performance and improved scalability for an expanding user base.</li>
                                </ul>
                            </div>

                            {/* Tamanna Solutions Pvt Ltd */}
                            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}`}>
                                <h3 className="text-2xl font-semibold">Software Developer Intern</h3>
                                <p className="text-sm text-gray-400">Tamanna Solutions Pvt Ltd — Feb 2023 – Jul 2023</p>
                                <ul className="mt-4 list-disc list-inside space-y-2">
                                    <li>Contributed to the development of a desktop accounting software for traders and small businesses.</li>
                                    <li>Implemented features to generate invoices and track payments effectively.</li>
                                    <li>Worked with a team using Flutter and C#.NET to build user-friendly Windows applications.</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>

            </main>



        </div>
    )


}


export default HomePage;