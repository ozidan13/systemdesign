'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

function URLDemo() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const base62Encode = (num: number) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    while (num > 0) { result = chars[num % 62] + result; num = Math.floor(num / 62); }
    return result || '0';
  };

  const shorten = () => {
    if (!url) return;
    const hash = Array.from(url).reduce((acc, c) => acc * 31 + c.charCodeAt(0), 0);
    const code = base62Encode(Math.abs(hash) % 1000000000);
    setShortUrl(`sdm.co/${code.slice(0, 7)}`);
  };

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter a long URL..." className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"/>
        <button onClick={shorten} className="btn-primary px-6 rounded-xl">✂️ Shorten</button>
      </div>
      {shortUrl && (
        <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl">
          <p className="text-sm text-gray-400 mb-1">Short URL:</p>
          <p className="text-xl font-mono font-bold text-indigo-300">{shortUrl}</p>
          <p className="text-xs text-gray-500 mt-2">Encoding: Base62 | Storage: ~500 bytes</p>
        </div>
      )}
    </div>
  );
}

export default function Module12Page() {
  const { getModuleBySlug, loading } = useSDContent();
  const mod = getModuleBySlug('module12_case_study_url_shortener');

  if (loading || !mod) {
    return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-indigo-800/5" />
        <div className="container-custom relative">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>12</div>
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
              <div className="p-5 bg-indigo-950/30 border border-indigo-500/20 rounded-xl mb-6" dir="rtl">
                <h4 className="text-lg font-bold text-indigo-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
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
                      <h5 className="font-bold text-indigo-400 mb-1">{kp.title}</h5>
                      <p className="text-sm text-gray-400">{kp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 URL Shortener Builder</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">ادخل رابط طويل وشوف إزاي بيتقصر</p>
          <URLDemo />
        </div>

        <div className="flex justify-between mt-12">
          <Link href="/module11_design_patterns" className="btn-outline px-6 py-3 rounded-xl">← Design Patterns</Link>
          <Link href="/module13_case_study_chat_system" className="btn-primary px-6 py-3 rounded-xl">Next: Chat System →</Link>
        </div>
      </div>
    </div>
  );
}
