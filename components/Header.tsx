'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/80 dark:bg-background-dark/80 backdrop-blur-md shadow-sm'
                    : 'bg-transparent'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative w-10 h-10">
                            <Image src="/logo.svg" alt="System Design Master Logo" fill priority />
                        </div>
                        <span className="text-xl font-bold text-gradient">SD Master</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/#modules"
                            className="font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
                        >
                            Modules
                        </Link>
                        <Link
                            href="/#features"
                            className="font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="/#resources"
                            className="font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
                        >
                            Resources
                        </Link>
                        <Link
                            href="/#about"
                            className="font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
                        >
                            About
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="relative p-2 rounded-full transition-all duration-300 overflow-hidden focus:outline-none"
                            aria-label="Toggle theme"
                        >
                            <div className="relative z-10 flex items-center justify-center w-8 h-8">
                                {theme === 'dark' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-300">
                                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-700">
                                        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <div
                                className={`absolute inset-0 rounded-full transition-all duration-500 ${theme === 'dark'
                                        ? 'bg-gray-900 scale-100'
                                        : 'bg-blue-50 scale-0'
                                    }`}
                            ></div>
                            <div className={`absolute top-0 left-0 right-0 bottom-0 rounded-full border ${theme === 'dark'
                                    ? 'border-yellow-500/30 border-2'
                                    : 'border-blue-300'
                                } transition-all duration-500`}></div>
                        </button>

                        {/* Get Started Button (Desktop) */}
                        <Link
                            href="/module01_intro_to_sd"
                            className="hidden md:flex items-center btn-primary space-x-2"
                        >
                            <span>Get Started</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                            </svg>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 animate-slide-down">
                        <nav className="flex flex-col space-y-4 pb-4">
                            <Link
                                href="/#modules"
                                className="font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Modules
                            </Link>
                            <Link
                                href="/#features"
                                className="font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="/#resources"
                                className="font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Resources
                            </Link>
                            <Link
                                href="/#about"
                                className="font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/module01_intro_to_sd"
                                className="btn-primary w-full text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
