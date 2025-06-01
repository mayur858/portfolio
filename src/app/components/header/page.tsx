"use client"

import React, { useEffect } from "react";
import { useState } from "react";
import { Menu, X, Github, Linkedin, Mail, Phone, MapPin, Heart, ExternalLink, Download, Sun, Moon } from 'lucide-react';
import { useDarkMode } from "../../context/DarkModeContext";


const Header = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
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
        { name: 'Contact', href: '#get-in-touch' }
    ];

    const socialLinks = [
        { icon: Github, href: 'https://github.com/mayur858', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/mayur-kumar-garchar/', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:kumarmayur.2001@gmail.com', label: 'Email' }
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? `${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md shadow-lg`
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">MK</span>
                        </div>
                        <div className="ml-3">
                            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-grey-600' : 'text-black'}`} >Mayur Kumar Garchar</h1>
                            <p className={`text-sm ${isDarkMode ? 'text-grey-600' : 'text-black'}`}> Software Developer</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                                    }`}
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
                            className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Resume download */}
                        <a
                            href="/Mayur_s_Resume.pdf"
                            download
                            className="hidden sm:flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Resume
                        </a>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg transition-colors duration-200"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={`md:hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t`}>
                    <div className="px-4 py-6 space-y-4">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`block text-lg font-medium transition-colors duration-200 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href="/Mayur_s_Resume.pdf"
                            download
                            className="flex items-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download Resume
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}


export default Header;