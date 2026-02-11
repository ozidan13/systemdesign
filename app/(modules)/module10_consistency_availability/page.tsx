'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';

function CAPDemo() {
  const [choice, setChoice] = useState<'CP' | 'AP' | 'CA'>('CP');
  const examples: Record<string, { systems: string[]; desc: string; desc_ar: string }> = {
    CP: { systems: ['MongoDB', 'Redis', 'HBase', 'Zookeeper'], desc: 'Consistent + Partition Tolerant: System may become unavailable during partitions to maintain consistency.', desc_ar: 'الاتساق + تحمل الانقسام: النظام ممكن يبقى مش متاح لحد ما البيانات تبقى متسقة.' },
    AP: { systems: ['Cassandra', 'DynamoDB', 'CouchDB', 'Riak'], desc: 'Available + Partition Tolerant: System always responds, but data may be stale during partitions.', desc_ar: 'التوافر + تحمل الانقسام: النظام دايماً بيرد، بس البيانات ممكن تبقى مش محدثة.' },
    CA: { systems: ['PostgreSQL (single)', 'MySQL (single)', 'SQL Server'], desc: 'Consistent + Available: Only possible without network partitions (single node).', desc_ar: 'الاتساق + التوافر: بس ده ممكن لو مفيش شبكة بتنقسم (سيرفر واحد بس).' }
  };
  const current = examples[choice];

  return (
    <div>
      <div className="flex gap-3 mb-6">
        {(['CP', 'AP', 'CA'] as const).map(c => (
          <button key={c} onClick={() => setChoice(c)} className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${choice === c ? 'bg-fuchsia-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>{c}</button>
        ))}
      </div>
      <div className="p-6 bg-fuchsia-950/20 border border-fuchsia-500/20 rounded-xl mb-4">
        <p className="text-fuchsia-300 font-medium mb-2">{current.desc}</p>
        <p className="text-gray-400 font-arabic text-sm" dir="rtl">{current.desc_ar}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {current.systems.map((s, i) => (
          <div key={i} className="p-3 bg-gray-800/40 rounded-lg text-center text-sm text-white font-medium">{s}</div>
        ))}
      </div>
    </div>
  );
}

export default function Module10Page() {
  const { getModuleBySlug, loading } = useSDContent();
  const mod = getModuleBySlug('module10_consistency_availability');

  if (loading || !mod) {
    return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 to-fuchsia-800/5" />
        <div className="container-custom relative">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>10</div>
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
              <div className="p-5 bg-fuchsia-950/30 border border-fuchsia-500/20 rounded-xl mb-6" dir="rtl">
                <h4 className="text-lg font-bold text-fuchsia-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
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
                      <h5 className="font-bold text-fuchsia-400 mb-1">{kp.title}</h5>
                      <p className="text-sm text-gray-400">{kp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 CAP Theorem Explorer</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">اختار الأولويات وشوف أمثلة حقيقية من الأنظمة</p>
          <CAPDemo />
        </div>

        <div className="flex justify-between mt-12">
          <Link href="/module09_database_scaling" className="btn-outline px-6 py-3 rounded-xl">← DB Scaling</Link>
          <Link href="/module11_design_patterns" className="btn-primary px-6 py-3 rounded-xl">Next: Design Patterns →</Link>
        </div>
      </div>
    </div>
  );
}
