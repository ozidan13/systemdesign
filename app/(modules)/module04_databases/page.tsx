'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

const dbOptions = [
    { name: 'PostgreSQL', type: 'SQL', icon: '🐘', best: 'Complex queries, ACID transactions, relationships', use: 'E-commerce, banking, CRM' },
    { name: 'MongoDB', type: 'NoSQL (Document)', icon: '🍃', best: 'Flexible schema, JSON-like documents, rapid dev', use: 'CMS, catalogs, user profiles' },
    { name: 'Redis', type: 'NoSQL (Key-Value)', icon: '⚡', best: 'Ultra-fast caching, sessions, leaderboards', use: 'Cache, realtime, counters' },
    { name: 'Cassandra', type: 'NoSQL (Wide-Column)', icon: '📊', best: 'Write-heavy, time-series, massive scale', use: 'IoT, messaging, analytics' },
    { name: 'Neo4j', type: 'NoSQL (Graph)', icon: '🕸️', best: 'Connected data, relationships, recommendations', use: 'Social networks, fraud detection' },
];

export default function Module04Page() {
    const { getModuleBySlug, loading } = useSDContent();
    const mod = getModuleBySlug('module04_databases');
    const [scenario, setScenario] = useState('');
    const [recommendation, setRecommendation] = useState('');

    const getRecommendation = () => {
        const s = scenario.toLowerCase();
        if (s.includes('chat') || s.includes('message') || s.includes('iot') || s.includes('log'))
            setRecommendation('Cassandra — Write-heavy workload, time-series data. Perfect for messaging and IoT.');
        else if (s.includes('social') || s.includes('friend') || s.includes('graph') || s.includes('recommendation'))
            setRecommendation('Neo4j — Graph database for connected data and relationship traversal.');
        else if (s.includes('cache') || s.includes('session') || s.includes('fast') || s.includes('real-time'))
            setRecommendation('Redis — In-memory key-value store for ultra-low latency access.');
        else if (s.includes('flexible') || s.includes('json') || s.includes('document') || s.includes('cms') || s.includes('blog'))
            setRecommendation('MongoDB — Document store with flexible schema for rapid development.');
        else
            setRecommendation('PostgreSQL — Rock-solid SQL database with ACID guarantees, perfect for most use cases.');
    };

    if (loading || !mod) {
        return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-800/5" />
                <div className="container-custom relative">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>04</div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">🟡 Intermediate</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{mod.title}</h1>
                    <h2 className="text-xl font-arabic text-gray-400 mb-4" dir="rtl">{mod.title_ar}</h2>
                    <p className="text-lg text-gray-400 max-w-3xl">{mod.description}</p>
                </div>
            </section>

            <div className="container-custom py-12">
                <div className="space-y-12">
                    {mod.topics.map((topic, i) => (
                        <div key={i} className="glass-card p-6 md:p-8">
                            <h3 className="text-2xl font-bold text-white mb-2">{topic.title}</h3>
                            <p className="text-gray-400 mb-4">{topic.description}</p>
                            <div className="p-5 bg-emerald-950/30 border border-emerald-500/20 rounded-xl mb-6" dir="rtl">
                                <h4 className="text-lg font-bold text-emerald-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
                                <p className="font-arabic text-gray-300 leading-relaxed mb-3">{topic.description_ar}</p>
                                {topic.analogy_ar && (
                                    <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-lg mt-3">
                                        <p className="font-arabic text-amber-300/90 text-sm">💡 <strong>التشبيه:</strong> {topic.analogy_ar}</p>
                                    </div>
                                )}
                            </div>
                            {topic.keyPoints && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {topic.keyPoints.map((kp, j) => (
                                        <div key={j} className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
                                            <h5 className="font-bold text-emerald-400 mb-1">{kp.title}</h5>
                                            <p className="text-sm text-gray-400">{kp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Database Comparison Table */}
                <div className="glass-card p-6 md:p-8 mt-12 overflow-x-auto">
                    <h3 className="text-2xl font-bold text-white mb-6">📊 Database Comparison</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {dbOptions.map((db, i) => (
                            <div key={i} className="p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 text-center">
                                <div className="text-3xl mb-2">{db.icon}</div>
                                <h4 className="font-bold text-white text-sm mb-1">{db.name}</h4>
                                <p className="text-xs text-primary-light mb-2">{db.type}</p>
                                <p className="text-xs text-gray-400 mb-2">{db.best}</p>
                                <p className="text-xs text-gray-500">🎯 {db.use}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive Demo: DB Selector */}
                <div className="glass-card p-6 md:p-8 mt-12">
                    <h3 className="text-2xl font-bold text-white mb-2">🧪 Database Selector</h3>
                    <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">وصف الـ use case بتاعك وهنقترحلك قاعدة البيانات المناسبة</p>
                    <div className="flex gap-3 mb-4">
                        <input type="text" value={scenario} onChange={e => setScenario(e.target.value)} placeholder="e.g. real-time chat app with millions of messages" className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary" />
                        <button onClick={getRecommendation} className="btn-primary px-6 rounded-xl">🔍 Recommend</button>
                    </div>
                    {recommendation && (
                        <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
                            <p className="text-emerald-300 font-medium">💡 {recommendation}</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-12">
                    <Link href="/module03_apis_protocols" className="btn-outline px-6 py-3 rounded-xl">← APIs</Link>
                    <Link href="/module05_caching" className="btn-primary px-6 py-3 rounded-xl">Next: Caching →</Link>
                </div>
            </div>
        </div>
    );
}
