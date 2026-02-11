'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

function CBDemo() {
  const [state, setState] = useState<'CLOSED' | 'OPEN' | 'HALF_OPEN'>('CLOSED');
  const [failures, setFailures] = useState(0);
  const [successes, setSuccesses] = useState(0);
  const threshold = 3;

  const sendSuccess = () => {
    if (state === 'OPEN') return;
    setSuccesses(p => p + 1);
    if (state === 'HALF_OPEN') setState('CLOSED');
    setFailures(0);
  };

  const sendFailure = () => {
    if (state === 'OPEN') return;
    const newF = failures + 1;
    setFailures(newF);
    if (newF >= threshold) setState('OPEN');
  };

  const tryReset = () => { if (state === 'OPEN') { setState('HALF_OPEN'); setFailures(0); } };
  const reset = () => { setState('CLOSED'); setFailures(0); setSuccesses(0); };

  const colors = { CLOSED: 'bg-green-500/20 text-green-400 border-green-500', OPEN: 'bg-red-500/20 text-red-400 border-red-500', HALF_OPEN: 'bg-amber-500/20 text-amber-400 border-amber-500' };

  return (
    <div>
      <div className={`p-6 rounded-xl border-2 mb-6 text-center ${colors[state]}`}>
        <p className="text-3xl font-bold mb-2">{state.replace('_', ' ')}</p>
        <p className="text-sm opacity-75">Failures: {failures}/{threshold} | Successes: {successes}</p>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <button onClick={sendSuccess} disabled={state === 'OPEN'} className="btn-primary px-6 py-3 rounded-xl disabled:opacity-50">✅ Success</button>
        <button onClick={sendFailure} disabled={state === 'OPEN'} className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50">❌ Failure</button>
        <button onClick={tryReset} disabled={state !== 'OPEN'} className="btn-outline px-6 py-3 rounded-xl disabled:opacity-50">🔄 Try Reset</button>
        <button onClick={reset} className="btn-outline px-6 py-3 rounded-xl">🔁 Full Reset</button>
      </div>
    </div>
  );
}

export default function Module11Page() {
  const { getModuleBySlug, loading } = useSDContent();
  const mod = getModuleBySlug('module11_design_patterns');

  if (loading || !mod) {
    return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-600/10 to-lime-800/5" />
        <div className="container-custom relative">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>11</div>
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
              <div className="p-5 bg-lime-950/30 border border-lime-500/20 rounded-xl mb-6" dir="rtl">
                <h4 className="text-lg font-bold text-lime-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
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
                      <h5 className="font-bold text-lime-400 mb-1">{kp.title}</h5>
                      <p className="text-sm text-gray-400">{kp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 Circuit Breaker Simulator</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">شوف إزاي الـ Circuit Breaker بيحمي النظام من الأعطال</p>
          <CBDemo />
        </div>

        <div className="flex justify-between mt-12">
          <Link href="/module10_consistency_availability" className="btn-outline px-6 py-3 rounded-xl">← CAP Theorem</Link>
          <Link href="/module12_case_study_url_shortener" className="btn-primary px-6 py-3 rounded-xl">Next: URL Shortener →</Link>
        </div>
      </div>
    </div>
  );
}
