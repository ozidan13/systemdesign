'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

export default function Module01Page() {
    const { getModuleBySlug, loading } = useSDContent();
    const mod = getModuleBySlug('module01_intro_to_sd');

    // Interactive Demo State
    const [requests, setRequests] = useState(10);
    const [scalingType, setScalingType] = useState<'vertical' | 'horizontal'>('vertical');
    const [servers, setServers] = useState(1);
    const serverCapacity = scalingType === 'vertical' ? 50 + servers * 30 : 50;
    const totalCapacity = scalingType === 'vertical' ? serverCapacity : serverCapacity * servers;
    const load = Math.min((requests / totalCapacity) * 100, 100);
    const isOverloaded = load >= 90;

    if (loading || !mod) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-dark">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            {/* Hero */}
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-indigo-800/5" />
                <div className="container-custom relative">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>01</div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">🟢 Beginner</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{mod.title}</h1>
                    <h2 className="text-xl font-arabic text-gray-400 mb-4" dir="rtl">{mod.title_ar}</h2>
                    <p className="text-lg text-gray-400 max-w-3xl">{mod.description}</p>
                </div>
            </section>

            <div className="container-custom py-12">
                {/* Topics */}
                <div className="space-y-12">
                    {mod.topics.map((topic, i) => (
                        <div key={i} className="glass-card p-6 md:p-8" id={`topic-${i}`}>
                            <h3 className="text-2xl font-bold text-white mb-2">{topic.title}</h3>
                            <p className="text-gray-400 mb-4">{topic.description}</p>

                            {/* Arabic Explanation */}
                            <div className="p-5 bg-indigo-950/30 border border-indigo-500/20 rounded-xl mb-6" dir="rtl">
                                <h4 className="text-lg font-bold text-indigo-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
                                <p className="font-arabic text-gray-300 leading-relaxed mb-3">{topic.description_ar}</p>
                                {topic.analogy_ar && (
                                    <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-lg mt-3">
                                        <p className="font-arabic text-amber-300/90 text-sm">💡 <strong>التشبيه:</strong> {topic.analogy_ar}</p>
                                    </div>
                                )}
                            </div>

                            {/* Key Points */}
                            {topic.keyPoints && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {topic.keyPoints.map((kp, j) => (
                                        <div key={j} className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
                                            <h5 className="font-bold text-primary-light mb-1">{kp.title}</h5>
                                            <p className="text-sm text-gray-400">{kp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* SVG Diagram: Scaling Comparison */}
                <div className="glass-card p-6 md:p-8 mt-12">
                    <h3 className="text-2xl font-bold text-white mb-6">📊 Horizontal vs Vertical Scaling</h3>
                    <svg viewBox="0 0 800 300" className="w-full h-auto">
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#818cf8" />
                            </marker>
                        </defs>
                        {/* Vertical Scaling */}
                        <text x="200" y="30" textAnchor="middle" fill="#818cf8" fontSize="16" fontWeight="bold">Vertical Scaling ↑</text>
                        <rect x="150" y="45" width="100" height="60" rx="8" fill="#1e1e2e" stroke="#6366f1" strokeWidth="2" />
                        <text x="200" y="75" textAnchor="middle" fill="#818cf8" fontSize="11">Small Server</text>
                        <text x="200" y="92" textAnchor="middle" fill="#4b5563" fontSize="9">2 CPU, 4GB</text>
                        <line x1="200" y1="115" x2="200" y2="145" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4 2" />
                        <rect x="130" y="150" width="140" height="90" rx="10" fill="#1e1e2e" stroke="#6366f1" strokeWidth="2.5" />
                        <text x="200" y="185" textAnchor="middle" fill="#818cf8" fontSize="13" fontWeight="bold">BIG Server</text>
                        <text x="200" y="205" textAnchor="middle" fill="#4b5563" fontSize="10">64 CPU, 512GB</text>
                        <text x="200" y="225" textAnchor="middle" fill="#f59e0b" fontSize="9">💰 Expensive!</text>
                        <text x="200" y="268" textAnchor="middle" fill="#6b7280" fontSize="10">Same machine, more power</text>

                        {/* Horizontal Scaling */}
                        <text x="575" y="30" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Horizontal Scaling →</text>
                        <rect x="525" y="45" width="100" height="60" rx="8" fill="#1e1e2e" stroke="#06b6d4" strokeWidth="2" />
                        <text x="575" y="80" textAnchor="middle" fill="#67e8f9" fontSize="11">1 Server</text>
                        <line x1="575" y1="115" x2="575" y2="145" stroke="#67e8f9" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4 2" />
                        {[0, 1, 2, 3].map(idx => (
                            <g key={idx}>
                                <rect x={455 + idx * 80} y="155" width="65" height="50" rx="6" fill="#1e1e2e" stroke="#06b6d4" strokeWidth="1.5" />
                                <text x={487 + idx * 80} y="185" textAnchor="middle" fill="#67e8f9" fontSize="10">Server {idx + 1}</text>
                            </g>
                        ))}
                        <text x="575" y="230" textAnchor="middle" fill="#22c55e" fontSize="9">✅ Cost-effective</text>
                        <text x="575" y="268" textAnchor="middle" fill="#6b7280" fontSize="10">More machines, same size</text>
                    </svg>
                </div>

                {/* Interactive Demo: Scaling Simulator */}
                <div className="glass-card p-6 md:p-8 mt-12">
                    <h3 className="text-2xl font-bold text-white mb-2">🧪 Scaling Simulator</h3>
                    <p className="text-gray-400 mb-2">Experiment with scaling strategies under load</p>
                    <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">جرّب الفرق بين التوسع الأفقي والرأسي — زوّد الطلبات وشوف إيه اللي بيحصل</p>

                    {/* Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Scaling Type</label>
                            <div className="flex gap-2">
                                <button onClick={() => { setScalingType('vertical'); setServers(1); }} className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${scalingType === 'vertical' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                                    ↑ Vertical
                                </button>
                                <button onClick={() => { setScalingType('horizontal'); setServers(1); }} className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${scalingType === 'horizontal' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                                    → Horizontal
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Requests/sec: <span className="text-white font-bold">{requests}</span></label>
                            <input type="range" min="1" max="500" value={requests} onChange={e => setRequests(+e.target.value)} className="w-full accent-primary" />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">
                                {scalingType === 'vertical' ? `Server Power Level: ${servers}` : `Server Count: ${servers}`}
                            </label>
                            <input type="range" min="1" max={scalingType === 'vertical' ? 10 : 20} value={servers} onChange={e => setServers(+e.target.value)} className="w-full accent-secondary" />
                        </div>
                    </div>

                    {/* Server Visualization */}
                    <div className="bg-gray-900/50 rounded-xl p-6 mb-4">
                        <div className="flex flex-wrap gap-3 justify-center mb-4">
                            {scalingType === 'horizontal' ? (
                                Array.from({ length: servers }).map((_, i) => (
                                    <div key={i} className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center text-xs font-mono transition-all ${load > 90 ? 'border-red-500 bg-red-500/10 text-red-400' : load > 60 ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-cyan-500 bg-cyan-500/10 text-cyan-400'}`}>
                                        S{i + 1}
                                    </div>
                                ))
                            ) : (
                                <div className={`rounded-xl border-2 flex items-center justify-center font-mono transition-all ${load > 90 ? 'border-red-500 bg-red-500/10 text-red-400' : load > 60 ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-indigo-500 bg-indigo-500/10 text-indigo-400'}`} style={{ width: `${60 + servers * 12}px`, height: `${60 + servers * 12}px`, fontSize: `${10 + servers}px` }}>
                                    💪
                                </div>
                            )}
                        </div>

                        {/* Load Bar */}
                        <div className="w-full bg-gray-800 rounded-full h-6 overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-500 flex items-center justify-center text-xs font-bold text-white ${load > 90 ? 'bg-gradient-to-r from-red-600 to-red-500' : load > 60 ? 'bg-gradient-to-r from-amber-600 to-amber-500' : 'bg-gradient-to-r from-emerald-600 to-emerald-500'}`} style={{ width: `${Math.max(load, 5)}%` }}>
                                {Math.round(load)}%
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-gray-800/30 rounded-lg">
                            <div className="text-2xl font-bold text-white">{requests}</div>
                            <div className="text-xs text-gray-500">Requests/sec</div>
                        </div>
                        <div className="p-3 bg-gray-800/30 rounded-lg">
                            <div className="text-2xl font-bold text-white">{totalCapacity}</div>
                            <div className="text-xs text-gray-500">Total Capacity</div>
                        </div>
                        <div className="p-3 bg-gray-800/30 rounded-lg">
                            <div className={`text-2xl font-bold ${isOverloaded ? 'text-red-400' : 'text-green-400'}`}>
                                {isOverloaded ? '⚠️ OVERLOADED' : '✅ HEALTHY'}
                            </div>
                            <div className="text-xs text-gray-500">Status</div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-12">
                    <Link href="/" className="btn-outline px-6 py-3 rounded-xl">← Home</Link>
                    <Link href="/module02_networking_basics" className="btn-primary px-6 py-3 rounded-xl">Next: Networking Basics →</Link>
                </div>
            </div>
        </div>
    );
}
