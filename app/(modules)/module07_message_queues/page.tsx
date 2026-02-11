'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

function MQDemo() {
  const [queue, setQueue] = useState<string[]>([]);
  const [processed, setProcessed] = useState<string[]>([]);
  const [msgCount, setMsgCount] = useState(1);

  const produce = () => {
    const msg = `msg_${msgCount}`;
    setQueue(prev => [...prev, msg]);
    setMsgCount(prev => prev + 1);
  };

  const consume = () => {
    if (queue.length === 0) return;
    const [first, ...rest] = queue;
    setQueue(rest);
    setProcessed(prev => [first, ...prev].slice(0, 8));
  };

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <button onClick={produce} className="btn-primary px-6 py-3 rounded-xl">📤 Produce Message</button>
        <button onClick={consume} disabled={queue.length === 0} className="btn-outline px-6 py-3 rounded-xl disabled:opacity-50">📥 Consume Message</button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
          <p className="text-sm text-gray-400 mb-1">Producer</p>
          <p className="text-2xl">📤</p>
        </div>
        <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-700/30">
          <p className="text-sm text-gray-400 mb-2 text-center">Queue ({queue.length})</p>
          <div className="flex flex-wrap gap-1.5 min-h-[40px]">
            {queue.map((m, i) => (
              <span key={i} className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs font-mono">{m}</span>
            ))}
          </div>
        </div>
        <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <p className="text-sm text-gray-400 mb-1">Consumer</p>
          <p className="text-2xl">📥</p>
        </div>
      </div>
      {processed.length > 0 && (
        <div>
          <p className="text-sm text-gray-400 mb-2">✅ Processed:</p>
          <div className="flex flex-wrap gap-1.5">
            {processed.map((m, i) => (
              <span key={i} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs font-mono">{m}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Module07Page() {
  const { getModuleBySlug, loading } = useSDContent();
  const mod = getModuleBySlug('module07_message_queues');

  if (loading || !mod) {
    return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-orange-800/5" />
        <div className="container-custom relative">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>07</div>
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
              <div className="p-5 bg-orange-950/30 border border-orange-500/20 rounded-xl mb-6" dir="rtl">
                <h4 className="text-lg font-bold text-orange-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
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
                      <h5 className="font-bold text-orange-400 mb-1">{kp.title}</h5>
                      <p className="text-sm text-gray-400">{kp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 Message Queue Visualizer</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">ابعت رسائل وشوف الطابور بيتملي ويتفرغ</p>
          <MQDemo />
        </div>

        <div className="flex justify-between mt-12">
          <Link href="/module06_load_balancing" className="btn-outline px-6 py-3 rounded-xl">← Load Balancing</Link>
          <Link href="/module08_system_components" className="btn-primary px-6 py-3 rounded-xl">Next: System Components →</Link>
        </div>
      </div>
    </div>
  );
}
