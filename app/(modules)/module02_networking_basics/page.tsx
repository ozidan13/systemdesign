'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

export default function Module02Page() {
    const { getModuleBySlug, loading } = useSDContent();
    const mod = getModuleBySlug('module02_networking_basics');
    const [domain, setDomain] = useState('');
    const [dnsSteps, setDnsSteps] = useState<string[]>([]);
    const [resolving, setResolving] = useState(false);

    const simulateDNS = () => {
        if (!domain) return;
        setDnsSteps([]);
        setResolving(true);
        const steps = [
            `🔍 Browser cache: Looking for ${domain}...`,
            `❌ Not found in browser cache`,
            `🔍 OS cache (hosts file): Looking...`,
            `❌ Not in OS cache`,
            `📡 Recursive DNS Resolver (ISP): Query for ${domain}`,
            `🌐 Root DNS Server (.): "Try .${domain.split('.').pop()} TLD server"`,
            `🔍 TLD Server (.${domain.split('.').pop()}): "Try authoritative NS for ${domain}"`,
            `✅ Authoritative NS: "${domain} → ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}"`,
            `💾 Caching result (TTL: 3600s)`,
            `🎉 Resolution complete!`,
        ];
        steps.forEach((step, i) => {
            setTimeout(() => {
                setDnsSteps(prev => [...prev, step]);
                if (i === steps.length - 1) setResolving(false);
            }, (i + 1) * 400);
        });
    };

    if (loading || !mod) {
        return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-800/5" />
                <div className="container-custom relative">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>02</div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">🟢 Beginner</span>
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
                            <div className="p-5 bg-blue-950/30 border border-blue-500/20 rounded-xl mb-6" dir="rtl">
                                <h4 className="text-lg font-bold text-blue-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
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
                                            <h5 className="font-bold text-blue-400 mb-1">{kp.title}</h5>
                                            <p className="text-sm text-gray-400">{kp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* SVG: TCP 3-Way Handshake */}
                <div className="glass-card p-6 md:p-8 mt-12">
                    <h3 className="text-2xl font-bold text-white mb-6">📊 TCP 3-Way Handshake</h3>
                    <svg viewBox="0 0 600 280" className="w-full h-auto max-w-2xl mx-auto">
                        <defs><marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#818cf8" /></marker></defs>
                        <rect x="80" y="20" width="80" height="40" rx="8" fill="#1e1e2e" stroke="#6366f1" strokeWidth="2" />
                        <text x="120" y="45" textAnchor="middle" fill="#818cf8" fontSize="13" fontWeight="bold">Client</text>
                        <rect x="420" y="20" width="80" height="40" rx="8" fill="#1e1e2e" stroke="#06b6d4" strokeWidth="2" />
                        <text x="460" y="45" textAnchor="middle" fill="#67e8f9" fontSize="13" fontWeight="bold">Server</text>
                        <line x1="120" y1="60" x2="120" y2="260" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
                        <line x1="460" y1="60" x2="460" y2="260" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
                        <line x1="125" y1="100" x2="455" y2="130" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arr2)" />
                        <text x="290" y="105" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">1. SYN</text>
                        <text x="290" y="120" textAnchor="middle" fill="#6b7280" fontSize="10">&quot;Hey, wanna talk?&quot;</text>
                        <line x1="455" y1="155" x2="125" y2="185" stroke="#67e8f9" strokeWidth="2" markerEnd="url(#arr2)" />
                        <text x="290" y="162" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="bold">2. SYN-ACK</text>
                        <text x="290" y="177" textAnchor="middle" fill="#6b7280" fontSize="10">&quot;Sure! Ready when you are&quot;</text>
                        <line x1="125" y1="210" x2="455" y2="240" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arr2)" />
                        <text x="290" y="220" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">3. ACK</text>
                        <text x="290" y="235" textAnchor="middle" fill="#6b7280" fontSize="10">&quot;Let&apos;s go! 🚀&quot;</text>
                    </svg>
                </div>

                {/* Interactive Demo: DNS Simulator */}
                <div className="glass-card p-6 md:p-8 mt-12">
                    <h3 className="text-2xl font-bold text-white mb-2">🧪 DNS Resolution Simulator</h3>
                    <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">ادخل domain name وشوف خطوات الـ DNS resolution واحدة واحدة</p>
                    <div className="flex gap-3 mb-6">
                        <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="e.g. google.com" className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary" />
                        <button onClick={simulateDNS} disabled={resolving || !domain} className="btn-primary px-6 rounded-xl disabled:opacity-50">
                            {resolving ? '⏳ Resolving...' : '🔍 Resolve'}
                        </button>
                    </div>
                    {dnsSteps.length > 0 && (
                        <div className="space-y-2">
                            {dnsSteps.map((step, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <span className="text-xs text-gray-500 font-mono w-8">{i + 1}.</span>
                                    <span className="text-sm text-gray-300">{step}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-12">
                    <Link href="/module01_intro_to_sd" className="btn-outline px-6 py-3 rounded-xl">← Intro to SD</Link>
                    <Link href="/module03_apis_protocols" className="btn-primary px-6 py-3 rounded-xl">Next: APIs & Protocols →</Link>
                </div>
            </div>
        </div>
    );
}
