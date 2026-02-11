'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

function CacheDemo() {
  const [cache, setCache] = useState<Record<string, string>>({});
  const [log, setLog] = useState<{key: string; hit: boolean}[]>([]);
  const [key, setKey] = useState('');
  const cacheSize = 4;

  const lookup = () => {
    if (!key) return;
    const hit = key in cache;
    if (!hit) {
      const newCache = { ...cache, [key]: `value_${key}` };
      const keys = Object.keys(newCache);
      if (keys.length > cacheSize) delete newCache[keys[0]]; // LRU eviction
      setCache(newCache);
    }
    setLog(prev => [{ key, hit }, ...prev].slice(0, 10));
    setKey('');
  };

  const hits = log.filter(l => l.hit).length;
  const total = log.length;

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <input type="text" value={key} onChange={e => setKey(e.target.value)} onKeyDown={e => e.key === 'Enter' && lookup()} placeholder="Enter key (e.g. user:1, post:5)" className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"/>
        <button onClick={lookup} className="btn-primary px-6 rounded-xl">🔍 Lookup</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-3 bg-gray-800/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{hits}</div>
          <div className="text-xs text-gray-500">Cache Hits</div>
        </div>
        <div className="p-3 bg-gray-800/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-400">{total - hits}</div>
          <div className="text-xs text-gray-500">Cache Misses</div>
        </div>
        <div className="p-3 bg-gray-800/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-amber-400">{total > 0 ? Math.round((hits / total) * 100) : 0}%</div>
          <div className="text-xs text-gray-500">Hit Ratio</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(cache).map(([k, v]) => (
          <div key={k} className="px-3 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-sm text-amber-300 font-mono">{k}: {v}</div>
        ))}
        {Object.keys(cache).length === 0 && <p className="text-gray-500 text-sm">Cache is empty — try looking up some keys!</p>}
      </div>
      {log.length > 0 && (
        <div className="space-y-1">
          {log.map((l, i) => (
            <div key={i} className={`flex items-center gap-2 p-2 rounded-lg text-sm ${l.hit ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              <span>{l.hit ? '✅ HIT' : '❌ MISS'}</span>
              <span className="font-mono">{l.key}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Module05Page() {
  const { getModuleBySlug, loading } = useSDContent();
  const mod = getModuleBySlug('module05_caching');

  if (loading || !mod) {
    return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-amber-800/5" />
        <div className="container-custom relative">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>05</div>
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
              <div className="p-5 bg-amber-950/30 border border-amber-500/20 rounded-xl mb-6" dir="rtl">
                <h4 className="text-lg font-bold text-amber-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
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
                      <h5 className="font-bold text-amber-400 mb-1">{kp.title}</h5>
                      <p className="text-sm text-gray-400">{kp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        
        {/* Interactive Demo: Cache Simulator */}
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 Cache Hit/Miss Simulator</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">ابعت طلبات وشوف الكاش شغال إزاي — Hit ولا Miss</p>
          <CacheDemo />
        </div>

        <div className="flex justify-between mt-12">
          <Link href="/module04_databases" className="btn-outline px-6 py-3 rounded-xl">← Databases</Link>
          <Link href="/module06_load_balancing" className="btn-primary px-6 py-3 rounded-xl">Next: Load Balancing →</Link>
        </div>
      </div>
    </div>
  );
}
