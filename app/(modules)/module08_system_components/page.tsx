'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

function CDNDemo() {
  const [withCDN, setWithCDN] = useState<number | null>(null);
  const [withoutCDN, setWithoutCDN] = useState<number | null>(null);
  const [testing, setTesting] = useState(false);

  const runTest = () => {
    setTesting(true);
    setWithCDN(null);
    setWithoutCDN(null);
    setTimeout(() => setWithoutCDN(Math.floor(200 + Math.random() * 300)), 1500);
    setTimeout(() => { setWithCDN(Math.floor(5 + Math.random() * 30)); setTesting(false); }, 2500);
  };

  return (
    <div>
      <button onClick={runTest} disabled={testing} className="btn-primary px-8 py-3 rounded-xl mb-6 disabled:opacity-50">
        {testing ? '⏳ Testing...' : '🚀 Run Latency Test'}
      </button>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
          <p className="text-sm text-gray-400 mb-2">Without CDN (Origin)</p>
          <p className="text-4xl font-bold text-red-400">{withoutCDN !== null ? `${withoutCDN}ms` : '—'}</p>
          <p className="text-xs text-gray-500 mt-2">🌍 Request travels to origin server</p>
        </div>
        <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
          <p className="text-sm text-gray-400 mb-2">With CDN (Edge)</p>
          <p className="text-4xl font-bold text-green-400">{withCDN !== null ? `${withCDN}ms` : '—'}</p>
          <p className="text-xs text-gray-500 mt-2">⚡ Served from nearest edge</p>
        </div>
      </div>
      {withCDN !== null && withoutCDN !== null && (
        <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-center">
          <p className="text-cyan-300 font-bold">CDN is {Math.round(withoutCDN / withCDN)}x faster! 🚀</p>
        </div>
      )}
    </div>
  );
}

export default function Module08Page() {
  const { getModuleBySlug, loading } = useSDContent();
  const mod = getModuleBySlug('module08_system_components');

  if (loading || !mod) {
    return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-cyan-800/5" />
        <div className="container-custom relative">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>08</div>
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
              <div className="p-5 bg-cyan-950/30 border border-cyan-500/20 rounded-xl mb-6" dir="rtl">
                <h4 className="text-lg font-bold text-cyan-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
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
                      <h5 className="font-bold text-cyan-400 mb-1">{kp.title}</h5>
                      <p className="text-sm text-gray-400">{kp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 CDN Latency Comparison</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">شوف الفرق في السرعة مع وبدون CDN</p>
          <CDNDemo />
        </div>

        <div className="flex justify-between mt-12">
          <Link href="/module07_message_queues" className="btn-outline px-6 py-3 rounded-xl">← Message Queues</Link>
          <Link href="/module09_database_scaling" className="btn-primary px-6 py-3 rounded-xl">Next: Database Scaling →</Link>
        </div>
      </div>
    </div>
  );
}
