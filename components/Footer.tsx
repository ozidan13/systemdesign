'use client';

import Link from 'next/link';

const moduleLinks = [
    { slug: 'module01_intro_to_sd', title: 'Intro to System Design' },
    { slug: 'module02_networking_basics', title: 'Networking Basics' },
    { slug: 'module03_apis_protocols', title: 'APIs & Protocols' },
    { slug: 'module04_databases', title: 'Databases & Storage' },
    { slug: 'module05_caching', title: 'Caching Strategies' },
    { slug: 'module06_load_balancing', title: 'Load Balancing' },
    { slug: 'module07_message_queues', title: 'Message Queues' },
    { slug: 'module08_system_components', title: 'System Components' },
    { slug: 'module09_database_scaling', title: 'DB Scaling' },
    { slug: 'module10_consistency_availability', title: 'CAP Theorem' },
    { slug: 'module11_design_patterns', title: 'Design Patterns' },
    { slug: 'module12_case_study_url_shortener', title: 'URL Shortener' },
    { slug: 'module13_case_study_chat_system', title: 'Chat System' },
    { slug: 'module14_case_study_social_media', title: 'Social Media Feed' },
    { slug: 'module15_case_study_video_platform', title: 'Video Platform' },
    { slug: 'module16_interview_framework', title: 'Interview Framework' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-surface-light dark:bg-surface-dark py-12">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gradient">SD Master</span>
                        </Link>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            Master system design principles through interactive
                            visualizations, real-world case studies, and hands-on learning.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light" aria-label="Twitter">
                                <i className="fab fa-twitter text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light" aria-label="GitHub">
                                <i className="fab fa-github text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light" aria-label="LinkedIn">
                                <i className="fab fa-linkedin text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light" aria-label="YouTube">
                                <i className="fab fa-youtube text-xl"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/#modules" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light">
                                    Modules
                                </Link>
                            </li>
                            <li>
                                <Link href="/#features" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/#resources" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light">
                                    Resources
                                </Link>
                            </li>
                            <li>
                                <Link href="/#about" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* SD Modules */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">SD Modules</h3>
                        <ul className="space-y-1.5">
                            {moduleLinks.slice(0, 8).map((m) => (
                                <li key={m.slug}>
                                    <Link href={`/${m.slug}`} className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light">
                                        {m.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2">
                                <i className="fas fa-envelope text-primary dark:text-primary-light"></i>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">contact@systemdesignmaster.com</span>
                            </li>
                        </ul>
                        <h3 className="text-lg font-bold mb-3 mt-6">More Modules</h3>
                        <ul className="space-y-1.5">
                            {moduleLinks.slice(8).map((m) => (
                                <li key={m.slug}>
                                    <Link href={`/${m.slug}`} className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light">
                                        {m.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            © {currentYear} System Design Master. All rights reserved.
                        </p>
                        <div className="mt-4 md:mt-0 flex space-x-6">
                            <Link href="/privacy" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light text-sm">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light text-sm">
                                Terms of Service
                            </Link>
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                                Created with <i className="fas fa-heart text-accent"></i> by Osama
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
