'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

function LBDemo() {
  const [algo, setAlgo] = useState<'round-robin' | 'least-conn'>('round-robin');
  const [servers, setServers] = useState([0, 0, 0, 0]);
  const [rrIndex, setRrIndex] = useState(0);

  const sendRequest = () => {
    setServers(prev => {
      const next = [...prev];
      if (algo === 'round-robin') {
        next[rrIndex % next.length] += 1;
        setRrIndex(p => p + 1);
      } else {
        const minIdx = next.indexOf(Math.min(...next));
        next[minIdx] += 1;
      }
      return next;
    });
  };

  const sendBurst = () => { for (let i = 0; i < 10; i++) setTimeout(sendRequest, i * 100); };
  const reset = () => { setServers([0, 0, 0, 0]); setRrIndex(0); };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setAlgo('round-robin')} className={`px-4 py-2 rounded-lg text-sm ${algo === 'round-robin' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Round Robin</button>
        <button onClick={() => setAlgo('least-conn')} className={`px-4 py-2 rounded-lg text-sm ${algo === 'least-conn' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Least Connections</button>
      </div>
      <div className="flex gap-3 mb-6">
        <button onClick={sendRequest} className="btn-primary px-6 py-3 rounded-xl">📡 Send Request</button>
        <button onClick={sendBurst} className="btn-outline px-6 py-3 rounded-xl">⚡ Send 10x Burst</button>
        <button onClick={reset} className="btn-outline px-6 py-3 rounded-xl">🔄 Reset</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {servers.map((count, i) => {
          const max = Math.max(...servers, 1);
          const pct = (count / max) * 100;
          return (
            <div key={i} className="text-center">
              <div className="h-40 bg-gray-800/30 rounded-xl relative overflow-hidden mb-2">
                <div className="absolute bottom-0 left-0 right-0 transition-all duration-300 rounded-b-xl bg-gradient-to-t from-violet-600 to-violet-400" style={{ height: `${pct}%` }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">{count}</div>
              </div>
              <p className="text-sm text-gray-400">Server {i + 1}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Module06Page() {
  const { getModuleBySlug, loading } = useSDContent();
  const mod = getModuleBySlug('module06_load_balancing');

  if (loading || !mod) {
    return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-violet-800/5" />
        <div className="container-custom relative">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>06</div>
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
              <div className="p-5 bg-violet-950/30 border border-violet-500/20 rounded-xl mb-6" dir="rtl">
                <h4 className="text-lg font-bold text-violet-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
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
                      <h5 className="font-bold text-violet-400 mb-1">{kp.title}</h5>
                      <p className="text-sm text-gray-400">{kp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        
        {/* Interactive Demo: LB Simulator */}
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 Load Balancer Simulator</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">شوف إزاي الطلبات بتتوزع على السيرفرات</p>
          <LBDemo />
        </div>

        <div className="flex justify-between mt-12">
          <Link href="/module05_caching" className="btn-outline px-6 py-3 rounded-xl">← Caching</Link>
          <Link href="/module07_message_queues" className="btn-primary px-6 py-3 rounded-xl">Next: Message Queues →</Link>
        </div>
      </div>
    </div>
  );
}
