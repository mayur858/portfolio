"use client"

import React from "react";
import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Mail, Phone, MapPin, Heart, ExternalLink, Download, Sun, Moon } from 'lucide-react';
import { useDarkMode } from "../../context/DarkModeContext";

const Footer = () => {
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
<footer className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">MK</span>
                                </div>
                                <div className="ml-3">
                                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-grey-600' : 'text-black'}`}>Mayur Kumar Garchar</h3>
                                    <p className={`text-sm ${isDarkMode ? 'text-grey-600' : 'text-black'}`}>Software Developer</p>
                                </div>
                            </div>
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 max-w-md`}>
                                Passionate about creating innovative solutions that make a difference.
                                Always learning, always building, always improving.
                            </p>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode
                                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white'
                                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                                            }`}
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-grey-600' : 'text-black'}`}>Quick Links</h4>
                            <ul className="space-y-2">
                                {navItems.slice(0, 4).map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 id="get-in-touch" className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-grey-600' : 'text-black'}`}>Get In Touch</h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-3 text-blue-600" />
                                    <a
                                        href="mailto:kumarmayur.2001@gmail.com"
                                        className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        kumarmayur.2001@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-3 text-blue-600" />
                                    <a
                                        href="tel:+1234567890"
                                        className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        +91 9773064120
                                    </a>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-3 text-blue-600" />
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                        Surat, Gujarat, India
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className={`mt-12 pt-8 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center`}>
                        <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span>© 2024 Mayur Kumar Garchar. Made with</span>
                            <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
                            <span>and lots of coffee.</span>
                        </div>
                        {/* <div className="flex items-center space-x-6 mt-4 md:mt-0">
                            <a
                                href="/privacy"
                                className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/terms"
                                className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Terms of Service
                            </a>
                        </div> */}
                    </div>
                </div>
            </footer>
    );
}


export default Footer;