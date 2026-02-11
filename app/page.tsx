'use client';

import { useSDContent } from '../lib/contexts/SDContentContext';
import Link from 'next/link';

const levelColors: Record<string, string> = {
    beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    advanced: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    expert: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const levelLabels: Record<string, string> = {
    beginner: '🟢 Beginner',
    intermediate: '🟡 Intermediate',
    advanced: '🟠 Advanced',
    expert: '🔴 Expert',
};

export default function HomePage() {
    const { content, loading } = useSDContent();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-dark">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading System Design Master...</p>
                </div>
            </div>
        );
    }

    if (!content) return null;

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }} />

            {/* Hero Section */}
            <section className="relative py-20 md:py-32">
                <div className="container-custom text-center" dir="rtl">
                    <div className="animate-fade-in">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm mb-6">
                            <span className="mr-2">🏗️</span>
                            <span className="font-arabic">من الصفر للاحتراف</span>
                            <span className="mx-2">•</span>
                            <span>Zero to Hero</span>
                        </div>

                        <h1 className="mb-6" style={{
                            background: 'linear-gradient(90deg, #ffffff, #6366f1, #06b6d4, #ffffff)',
                            backgroundSize: '300% 100%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'gradientText 6s ease infinite',
                        }}>
                            System Design Master
                        </h1>

                        <h2 className="text-2xl md:text-3xl font-arabic text-gray-300 mb-4 font-normal">
                            {content.siteTitle_ar}
                        </h2>

                        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-4" dir="ltr">
                            {content.tagline}
                        </p>
                        <p className="text-lg md:text-xl text-gray-500 font-arabic max-w-3xl mx-auto mb-10">
                            {content.tagline_ar}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center" dir="ltr">
                            <Link href="/module01_intro_to_sd" className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                                🚀 Start Learning
                            </Link>
                            <Link href="#modules" className="btn-outline text-lg px-8 py-4 rounded-xl">
                                📚 Browse Modules
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16" dir="ltr">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-light">16</div>
                                <div className="text-sm text-gray-500">Modules</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-secondary-light">50+</div>
                                <div className="text-sm text-gray-500">Topics</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-accent-light">5</div>
                                <div className="text-sm text-gray-500">Case Studies</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modules Section */}
            <section id="modules" className="relative py-20">
                <div className="container-custom">
                    <div className="text-center mb-16" dir="rtl">
                        <h2 className="text-gradient mb-4">المسار التعليمي</h2>
                        <p className="text-xl text-gray-400" dir="ltr">Your Learning Path — From Fundamentals to Expert</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {content.modules.map((mod, index) => (
                            <Link
                                key={mod.id}
                                href={`/${mod.slug}`}
                                className="group block"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="glass-card p-6 h-full flex flex-col">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${levelColors[mod.level]}`}>
                                            {levelLabels[mod.level]}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary-light transition-colors">
                                        {mod.title}
                                    </h3>
                                    <p className="text-sm font-arabic text-gray-400 mb-3" dir="rtl">{mod.title_ar}</p>

                                    {/* Description */}
                                    <p className="text-sm text-gray-400 mb-4 flex-grow" dir="rtl">
                                        <span className="font-arabic">{mod.shortDescription_ar}</span>
                                    </p>

                                    {/* Topics Preview */}
                                    <div className="space-y-1.5 mb-4">
                                        {mod.topics.slice(0, 3).map((topic, i) => (
                                            <div key={i} className="flex items-center text-xs text-gray-500">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 flex-shrink-0"></span>
                                                <span>{topic.title}</span>
                                            </div>
                                        ))}
                                        {mod.topics.length > 3 && (
                                            <div className="text-xs text-gray-600">+{mod.topics.length - 3} more topics</div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className="text-xs text-gray-500">{mod.topics.length} topics</span>
                                        <span className="text-primary-light text-sm group-hover:translate-x-1 transition-transform inline-flex items-center">
                                            Explore →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative py-20">
                <div className="container-custom">
                    <div className="text-center mb-16" dir="rtl">
                        <h2 className="text-gradient mb-4">ليه System Design Master؟</h2>
                        <p className="text-xl text-gray-400" dir="ltr">Why This Platform is Different</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '🎨', title: 'Visual Engineering', desc: 'Interactive SVG diagrams and architecture visualizations', desc_ar: 'رسومات تفاعلية ومرئيات لبنية الأنظمة' },
                            { icon: '🏗️', title: 'Real Case Studies', desc: 'Design YouTube, WhatsApp, Twitter from scratch', desc_ar: 'صمم يوتيوب وواتساب وتويتر من الصفر' },
                            { icon: '🎯', title: 'Interview Ready', desc: 'RESHADED framework for system design interviews', desc_ar: 'إطار RESHADED لمقابلات تصميم الأنظمة' },
                            { icon: '🌍', title: 'Bilingual', desc: 'Egyptian Arabic explanations with English technical terms', desc_ar: 'شرح بالعامية المصرية مع المصطلحات الإنجليزية' },
                        ].map((feature, i) => (
                            <div key={i} className="glass-card p-6 text-center">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-400 mb-2">{feature.desc}</p>
                                <p className="text-sm text-gray-500 font-arabic" dir="rtl">{feature.desc_ar}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section id="resources" className="relative py-20">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-gradient mb-4">Learning Resources</h2>
                        <p className="text-xl text-gray-400">Recommended books, courses, and repositories</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.learningResources.map((resource, i) => (
                            <a
                                key={i}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card p-6 group"
                            >
                                <span className="inline-block px-2 py-1 rounded text-xs bg-primary/20 text-primary-light mb-3">{resource.type}</span>
                                <h3 className="font-bold text-white group-hover:text-primary-light transition-colors">{resource.title}</h3>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative py-20">
                <div className="container-custom">
                    <div className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto">
                        <h2 className="text-gradient mb-4">About the Creator</h2>
                        <p className="text-xl text-white font-bold mb-2">{content.authorInfo.name}</p>
                        <p className="text-gray-400 mb-4">{content.authorInfo.role}</p>
                        <p className="text-gray-500 mb-6">{content.authorInfo.bio}</p>
                        <a
                            href={`https://wa.me/${content.authorInfo.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp pulse-effect"
                        >
                            <i className="fab fa-whatsapp mr-2"></i> Contact on WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
