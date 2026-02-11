'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

function HashDemo() {
  const [nodes, setNodes] = useState(['Server A', 'Server B', 'Server C']);
  const [keys, setKeys] = useState(['user:1', 'user:2', 'post:1']);
  const [newKey, setNewKey] = useState('');

  const simpleHash = (str: string) => { let h = 0; for (const c of str) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
  const nodeAngles = nodes.map(n => ({ name: n, angle: simpleHash(n) }));
  const keyAngles = keys.map(k => {
    const angle = simpleHash(k);
    const sorted = [...nodeAngles].sort((a, b) => a.angle - b.angle);
    const assigned = sorted.find(n => n.angle >= angle) || sorted[0];
    return { key: k, angle, server: assigned.name };
  });

  const addKey = () => { if (newKey) { setKeys(p => [...p, newKey]); setNewKey(''); } };

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <input type="text" value={newKey} onChange={e => setNewKey(e.target.value)} onKeyDown={e => e.key === 'Enter' && addKey()} placeholder="Add key (e.g. user:5)" className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"/>
        <button onClick={addKey} className="btn-primary px-6 rounded-xl">Add Key</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm text-gray-400 mb-3">📍 Key → Server Mapping</h4>
          <div className="space-y-2">
            {keyAngles.map((k, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                <span className="font-mono text-sm text-gray-300">{k.key}</span>
                <span className="text-xs text-gray-500">hash: {k.angle}°</span>
                <span className="px-2 py-1 bg-rose-500/20 text-rose-300 rounded text-xs">{k.server}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm text-gray-400 mb-3">🖥️ Server Nodes</h4>
          <div className="space-y-2">
            {nodeAngles.map((n, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                <span className="text-sm text-white font-medium">{n.name}</span>
                <span className="text-xs text-gray-500">position: {n.angle}°</span>
                <span className="text-xs text-rose-400">{keyAngles.filter(k => k.server === n.name).length} keys</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setNodes(p => [...p, `Server ${String.fromCharCode(65 + p.length)}`])} className="btn-outline px-3 py-1 rounded-lg text-sm">+ Add Node</button>
            <button onClick={() => nodes.length > 1 && setNodes(p => p.slice(0, -1))} disabled={nodes.length <= 1} className="btn-outline px-3 py-1 rounded-lg text-sm disabled:opacity-50">- Remove Node</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Module09Page() {
  const { getModuleBySlug, loading } = useSDContent();
  const mod = getModuleBySlug('module09_database_scaling');

  if (loading || !mod) {
    return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 to-rose-800/5" />
        <div className="container-custom relative">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>09</div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">🟠 Advanced</span>
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
              <div className="p-5 bg-rose-950/30 border border-rose-500/20 rounded-xl mb-6" dir="rtl">
                <h4 className="text-lg font-bold text-rose-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
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
                      <h5 className="font-bold text-rose-400 mb-1">{kp.title}</h5>
                      <p className="text-sm text-gray-400">{kp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 Consistent Hashing Visualizer</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">شوف إزاي البيانات بتتوزع على الـ Hash Ring</p>
          <HashDemo />
        </div>

        <div className="flex justify-between mt-12">
          <Link href="/module08_system_components" className="btn-outline px-6 py-3 rounded-xl">← System Components</Link>
          <Link href="/module10_consistency_availability" className="btn-primary px-6 py-3 rounded-xl">Next: CAP Theorem →</Link>
        </div>
      </div>
    </div>
  );
}
