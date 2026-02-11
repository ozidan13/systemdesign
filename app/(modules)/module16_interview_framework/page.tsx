'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

function TimerDemo() {
  const [time, setTime] = useState(45 * 60);
  const [running, setRunning] = useState(false);
  const [checks, setChecks] = useState([false, false, false, false, false, false, false, false]);
  const labels = ['Requirements (5 min)', 'Estimation (5 min)', 'Storage Schema (5 min)', 'High-level Design (10 min)', 'API Design (5 min)', 'Detailed Design (10 min)', 'Evaluate (3 min)', 'Discuss Trade-offs (2 min)'];

  const toggle = (i: number) => setChecks(prev => { const n = [...prev]; n[i] = !n[i]; return n; });

  useState(() => {
    if (!running) return;
    const iv = setInterval(() => setTime(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(iv);
  });

  const mins = Math.floor(time / 60);
  const secs = time % 60;

  return (
    <div>
      <div className="text-center mb-6">
        <p className={`text-6xl font-mono font-bold ${time < 300 ? 'text-red-400' : time < 600 ? 'text-amber-400' : 'text-white'}`}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </p>
        <div className="flex gap-3 justify-center mt-4">
          <button onClick={() => setRunning(!running)} className="btn-primary px-6 py-2 rounded-xl">{running ? '⏸ Pause' : '▶ Start'}</button>
          <button onClick={() => { setTime(45 * 60); setRunning(false); }} className="btn-outline px-6 py-2 rounded-xl">🔄 Reset</button>
        </div>
      </div>
      <div className="space-y-2">
        {labels.map((label, i) => (
          <button key={i} onClick={() => toggle(i)} className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all ${checks[i] ? 'bg-green-500/10 border border-green-500/20' : 'bg-gray-800/30 border border-gray-700/20'}`}>
            <span className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs ${checks[i] ? 'border-green-500 bg-green-500 text-white' : 'border-gray-600'}`}>{checks[i] ? '✓' : ''}</span>
            <span className={`text-sm ${checks[i] ? 'text-green-400 line-through' : 'text-gray-300'}`}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Module16Page() {
  const { getModuleBySlug, loading } = useSDContent();
  const mod = getModuleBySlug('module16_interview_framework');

  if (loading || !mod) {
    return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-purple-800/5" />
        <div className="container-custom relative">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>16</div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">🔴 Expert</span>
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
              <div className="p-5 bg-purple-950/30 border border-purple-500/20 rounded-xl mb-6" dir="rtl">
                <h4 className="text-lg font-bold text-purple-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
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
                      <h5 className="font-bold text-purple-400 mb-1">{kp.title}</h5>
                      <p className="text-sm text-gray-400">{kp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 Mock Interview Timer</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">45 دقيقة — تابع وقتك مع RESHADED checklist</p>
          <TimerDemo />
        </div>

        <div className="flex justify-between mt-12">
          <Link href="/module15_case_study_video_platform" className="btn-outline px-6 py-3 rounded-xl">← Video Platform</Link>
          <Link href="/" className="btn-primary px-6 py-3 rounded-xl">🏠 Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
