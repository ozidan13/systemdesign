'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

const apiMethods = [
    { method: 'GET', desc: 'Retrieve data', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { method: 'POST', desc: 'Create new resource', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { method: 'PUT', desc: 'Update full resource', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { method: 'DELETE', desc: 'Remove resource', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
];

export default function Module03Page() {
    const { getModuleBySlug, loading } = useSDContent();
    const mod = getModuleBySlug('module03_apis_protocols');
    const [selectedMethod, setSelectedMethod] = useState('GET');
    const [endpoint, setEndpoint] = useState('/api/users');
    const [response, setResponse] = useState('');

    const simulate = () => {
        const responses: Record<string, Record<string, string>> = {
            GET: { '/api/users': '[\n  { "id": 1, "name": "Ahmed", "role": "developer" },\n  { "id": 2, "name": "Sara", "role": "designer" }\n]', '/api/posts': '[\n  { "id": 1, "title": "System Design 101", "likes": 42 }\n]' },
            POST: { '/api/users': '{ "id": 3, "name": "New User", "created": true }', '/api/posts': '{ "id": 2, "title": "New Post", "created": true }' },
            PUT: { '/api/users': '{ "id": 1, "name": "Ahmed Updated", "updated": true }', '/api/posts': '{ "id": 1, "title": "Updated Post", "updated": true }' },
            DELETE: { '/api/users': '{ "deleted": true, "message": "User removed" }', '/api/posts': '{ "deleted": true, "message": "Post removed" }' },
        };
        const status = selectedMethod === 'POST' ? '201 Created' : selectedMethod === 'DELETE' ? '204 No Content' : '200 OK';
        setResponse(`HTTP/1.1 ${status}\nContent-Type: application/json\n\n${responses[selectedMethod]?.[endpoint] || '{ "error": "Not Found" }'}`);
    };

    if (loading || !mod) {
        return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-teal-800/5" />
                <div className="container-custom relative">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>03</div>
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
                            <div className="p-5 bg-teal-950/30 border border-teal-500/20 rounded-xl mb-6" dir="rtl">
                                <h4 className="text-lg font-bold text-teal-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
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
                                            <h5 className="font-bold text-teal-400 mb-1">{kp.title}</h5>
                                            <p className="text-sm text-gray-400">{kp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* SVG: REST vs GraphQL vs gRPC */}
                <div className="glass-card p-6 md:p-8 mt-12">
                    <h3 className="text-2xl font-bold text-white mb-6">📊 API Comparison: REST vs GraphQL vs gRPC</h3>
                    <svg viewBox="0 0 800 250" className="w-full h-auto">
                        <g>
                            <rect x="20" y="20" width="230" height="200" rx="12" fill="#1e1e2e" stroke="#22c55e" strokeWidth="2" />
                            <text x="135" y="55" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">REST</text>
                            <text x="135" y="80" textAnchor="middle" fill="#9ca3af" fontSize="11">GET /api/users/1</text>
                            <text x="135" y="105" textAnchor="middle" fill="#9ca3af" fontSize="10">📦 JSON response</text>
                            <text x="135" y="130" textAnchor="middle" fill="#9ca3af" fontSize="10">✅ Simple &amp; Standard</text>
                            <text x="135" y="155" textAnchor="middle" fill="#f59e0b" fontSize="10">⚠️ Over-fetching</text>
                            <text x="135" y="180" textAnchor="middle" fill="#9ca3af" fontSize="10">📡 HTTP methods</text>
                            <text x="135" y="205" textAnchor="middle" fill="#6b7280" fontSize="9">Best for: CRUD APIs</text>
                        </g>
                        <g>
                            <rect x="285" y="20" width="230" height="200" rx="12" fill="#1e1e2e" stroke="#e040fb" strokeWidth="2" />
                            <text x="400" y="55" textAnchor="middle" fill="#e040fb" fontSize="16" fontWeight="bold">GraphQL</text>
                            <text x="400" y="80" textAnchor="middle" fill="#9ca3af" fontSize="11">{`query { user(id:1) { name } }`}</text>
                            <text x="400" y="105" textAnchor="middle" fill="#9ca3af" fontSize="10">🎯 Exact data fetching</text>
                            <text x="400" y="130" textAnchor="middle" fill="#22c55e" fontSize="10">✅ No over-fetching</text>
                            <text x="400" y="155" textAnchor="middle" fill="#f59e0b" fontSize="10">⚠️ Complex caching</text>
                            <text x="400" y="180" textAnchor="middle" fill="#9ca3af" fontSize="10">📐 Strong type system</text>
                            <text x="400" y="205" textAnchor="middle" fill="#6b7280" fontSize="9">Best for: Complex UIs</text>
                        </g>
                        <g>
                            <rect x="550" y="20" width="230" height="200" rx="12" fill="#1e1e2e" stroke="#06b6d4" strokeWidth="2" />
                            <text x="665" y="55" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">gRPC</text>
                            <text x="665" y="80" textAnchor="middle" fill="#9ca3af" fontSize="11">rpc GetUser(Id) → User</text>
                            <text x="665" y="105" textAnchor="middle" fill="#9ca3af" fontSize="10">⚡ Binary (Protobuf)</text>
                            <text x="665" y="130" textAnchor="middle" fill="#22c55e" fontSize="10">✅ 10x faster than REST</text>
                            <text x="665" y="155" textAnchor="middle" fill="#9ca3af" fontSize="10">🔄 Bi-di streaming</text>
                            <text x="665" y="180" textAnchor="middle" fill="#f59e0b" fontSize="10">⚠️ No browser support</text>
                            <text x="665" y="205" textAnchor="middle" fill="#6b7280" fontSize="9">Best for: Microservices</text>
                        </g>
                    </svg>
                </div>

                {/* Interactive Demo: API Explorer */}
                <div className="glass-card p-6 md:p-8 mt-12">
                    <h3 className="text-2xl font-bold text-white mb-2">🧪 REST API Explorer</h3>
                    <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">اختار HTTP method و endpoint وشوف الـ response</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">HTTP Method</label>
                            <div className="grid grid-cols-4 gap-2">
                                {apiMethods.map(m => (
                                    <button key={m.method} onClick={() => setSelectedMethod(m.method)} className={`py-2 px-3 rounded-lg text-sm font-mono font-bold border transition-all ${selectedMethod === m.method ? m.color : 'bg-gray-800 text-gray-500 border-gray-700 hover:bg-gray-700'}`}>
                                        {m.method}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Endpoint</label>
                            <select value={endpoint} onChange={e => setEndpoint(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary">
                                <option value="/api/users">/api/users</option>
                                <option value="/api/posts">/api/posts</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={simulate} className="btn-primary px-6 py-3 rounded-xl mb-4 w-full md:w-auto">
                        🚀 Send Request
                    </button>
                    {response && (
                        <pre className="p-4 bg-gray-900 rounded-xl text-sm font-mono text-green-400 overflow-x-auto border border-gray-800">{response}</pre>
                    )}
                </div>

                <div className="flex justify-between mt-12">
                    <Link href="/module02_networking_basics" className="btn-outline px-6 py-3 rounded-xl">← Networking</Link>
                    <Link href="/module04_databases" className="btn-primary px-6 py-3 rounded-xl">Next: Databases →</Link>
                </div>
            </div>
        </div>
    );
}
