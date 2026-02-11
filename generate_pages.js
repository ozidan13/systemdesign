const fs = require('fs');
const path = require('path');

// Module definitions for pages 5-16
const modules = [
    {
        num: '05', slug: 'module05_caching', title: 'Caching', color: 'amber',
        level: 'intermediate', levelColor: 'yellow', levelEmoji: '🟡',
        prevSlug: 'module04_databases', prevTitle: 'Databases',
        nextSlug: 'module06_load_balancing', nextTitle: 'Load Balancing',
        demo: `
        {/* Interactive Demo: Cache Simulator */}
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 Cache Hit/Miss Simulator</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">ابعت طلبات وشوف الكاش شغال إزاي — Hit ولا Miss</p>
          <CacheDemo />
        </div>`,
        demoComponent: `
function CacheDemo() {
  const [cache, setCache] = useState<Record<string, string>>({});
  const [log, setLog] = useState<{key: string; hit: boolean}[]>([]);
  const [key, setKey] = useState('');
  const cacheSize = 4;

  const lookup = () => {
    if (!key) return;
    const hit = key in cache;
    if (!hit) {
      const newCache = { ...cache, [key]: \`value_\${key}\` };
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
            <div key={i} className={\`flex items-center gap-2 p-2 rounded-lg text-sm \${l.hit ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}\`}>
              <span>{l.hit ? '✅ HIT' : '❌ MISS'}</span>
              <span className="font-mono">{l.key}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`
    },
    {
        num: '06', slug: 'module06_load_balancing', title: 'Load Balancing', color: 'violet',
        level: 'intermediate', levelColor: 'yellow', levelEmoji: '🟡',
        prevSlug: 'module05_caching', prevTitle: 'Caching',
        nextSlug: 'module07_message_queues', nextTitle: 'Message Queues',
        demo: `
        {/* Interactive Demo: LB Simulator */}
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 Load Balancer Simulator</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">شوف إزاي الطلبات بتتوزع على السيرفرات</p>
          <LBDemo />
        </div>`,
        demoComponent: `
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
        <button onClick={() => setAlgo('round-robin')} className={\`px-4 py-2 rounded-lg text-sm \${algo === 'round-robin' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400'}\`}>Round Robin</button>
        <button onClick={() => setAlgo('least-conn')} className={\`px-4 py-2 rounded-lg text-sm \${algo === 'least-conn' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400'}\`}>Least Connections</button>
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
                <div className="absolute bottom-0 left-0 right-0 transition-all duration-300 rounded-b-xl bg-gradient-to-t from-violet-600 to-violet-400" style={{ height: \`\${pct}%\` }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">{count}</div>
              </div>
              <p className="text-sm text-gray-400">Server {i + 1}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}`
    },
    {
        num: '07', slug: 'module07_message_queues', title: 'Message Queues', color: 'orange',
        level: 'intermediate', levelColor: 'yellow', levelEmoji: '🟡',
        prevSlug: 'module06_load_balancing', prevTitle: 'Load Balancing',
        nextSlug: 'module08_system_components', nextTitle: 'System Components',
        demo: `
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 Message Queue Visualizer</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">ابعت رسائل وشوف الطابور بيتملي ويتفرغ</p>
          <MQDemo />
        </div>`,
        demoComponent: `
function MQDemo() {
  const [queue, setQueue] = useState<string[]>([]);
  const [processed, setProcessed] = useState<string[]>([]);
  const [msgCount, setMsgCount] = useState(1);

  const produce = () => {
    const msg = \`msg_\${msgCount}\`;
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
}`
    },
    {
        num: '08', slug: 'module08_system_components', title: 'System Components', color: 'cyan',
        level: 'intermediate', levelColor: 'yellow', levelEmoji: '🟡',
        prevSlug: 'module07_message_queues', prevTitle: 'Message Queues',
        nextSlug: 'module09_database_scaling', nextTitle: 'Database Scaling',
        demo: `
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 CDN Latency Comparison</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">شوف الفرق في السرعة مع وبدون CDN</p>
          <CDNDemo />
        </div>`,
        demoComponent: `
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
          <p className="text-4xl font-bold text-red-400">{withoutCDN !== null ? \`\${withoutCDN}ms\` : '—'}</p>
          <p className="text-xs text-gray-500 mt-2">🌍 Request travels to origin server</p>
        </div>
        <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
          <p className="text-sm text-gray-400 mb-2">With CDN (Edge)</p>
          <p className="text-4xl font-bold text-green-400">{withCDN !== null ? \`\${withCDN}ms\` : '—'}</p>
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
}`
    },
    {
        num: '09', slug: 'module09_database_scaling', title: 'Database Scaling', color: 'rose',
        level: 'advanced', levelColor: 'orange', levelEmoji: '🟠',
        prevSlug: 'module08_system_components', prevTitle: 'System Components',
        nextSlug: 'module10_consistency_availability', nextTitle: 'CAP Theorem',
        demo: `
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 Consistent Hashing Visualizer</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">شوف إزاي البيانات بتتوزع على الـ Hash Ring</p>
          <HashDemo />
        </div>`,
        demoComponent: `
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
            <button onClick={() => setNodes(p => [...p, \`Server \${String.fromCharCode(65 + p.length)}\`])} className="btn-outline px-3 py-1 rounded-lg text-sm">+ Add Node</button>
            <button onClick={() => nodes.length > 1 && setNodes(p => p.slice(0, -1))} disabled={nodes.length <= 1} className="btn-outline px-3 py-1 rounded-lg text-sm disabled:opacity-50">- Remove Node</button>
          </div>
        </div>
      </div>
    </div>
  );
}`
    },
    {
        num: '10', slug: 'module10_consistency_availability', title: 'Consistency & Availability', color: 'fuchsia',
        level: 'advanced', levelColor: 'orange', levelEmoji: '🟠',
        prevSlug: 'module09_database_scaling', prevTitle: 'DB Scaling',
        nextSlug: 'module11_design_patterns', nextTitle: 'Design Patterns',
        demo: `
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 CAP Theorem Explorer</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">اختار الأولويات وشوف أمثلة حقيقية من الأنظمة</p>
          <CAPDemo />
        </div>`,
        demoComponent: `
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
          <button key={c} onClick={() => setChoice(c)} className={\`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all \${choice === c ? 'bg-fuchsia-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}\`}>{c}</button>
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
}`
    },
    {
        num: '11', slug: 'module11_design_patterns', title: 'Design Patterns', color: 'lime',
        level: 'advanced', levelColor: 'orange', levelEmoji: '🟠',
        prevSlug: 'module10_consistency_availability', prevTitle: 'CAP Theorem',
        nextSlug: 'module12_case_study_url_shortener', nextTitle: 'URL Shortener',
        demo: `
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 Circuit Breaker Simulator</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">شوف إزاي الـ Circuit Breaker بيحمي النظام من الأعطال</p>
          <CBDemo />
        </div>`,
        demoComponent: `
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
      <div className={\`p-6 rounded-xl border-2 mb-6 text-center \${colors[state]}\`}>
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
}`
    },
    {
        num: '12', slug: 'module12_case_study_url_shortener', title: 'URL Shortener', color: 'indigo',
        level: 'expert', levelColor: 'red', levelEmoji: '🔴',
        prevSlug: 'module11_design_patterns', prevTitle: 'Design Patterns',
        nextSlug: 'module13_case_study_chat_system', nextTitle: 'Chat System',
        demo: `
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 URL Shortener Builder</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">ادخل رابط طويل وشوف إزاي بيتقصر</p>
          <URLDemo />
        </div>`,
        demoComponent: `
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
    setShortUrl(\`sdm.co/\${code.slice(0, 7)}\`);
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
}`
    },
    {
        num: '13', slug: 'module13_case_study_chat_system', title: 'Chat System', color: 'green',
        level: 'expert', levelColor: 'red', levelEmoji: '🔴',
        prevSlug: 'module12_case_study_url_shortener', prevTitle: 'URL Shortener',
        nextSlug: 'module14_case_study_social_media', nextTitle: 'Social Media Feed',
        demo: '', demoComponent: ''
    },
    {
        num: '14', slug: 'module14_case_study_social_media', title: 'Social Media Feed', color: 'sky',
        level: 'expert', levelColor: 'red', levelEmoji: '🔴',
        prevSlug: 'module13_case_study_chat_system', prevTitle: 'Chat System',
        nextSlug: 'module15_case_study_video_platform', nextTitle: 'Video Platform',
        demo: '', demoComponent: ''
    },
    {
        num: '15', slug: 'module15_case_study_video_platform', title: 'Video Platform', color: 'red',
        level: 'expert', levelColor: 'red', levelEmoji: '🔴',
        prevSlug: 'module14_case_study_social_media', prevTitle: 'Social Media Feed',
        nextSlug: 'module16_interview_framework', nextTitle: 'Interview Framework',
        demo: '', demoComponent: ''
    },
    {
        num: '16', slug: 'module16_interview_framework', title: 'Interview Framework', color: 'purple',
        level: 'expert', levelColor: 'red', levelEmoji: '🔴',
        prevSlug: 'module15_case_study_video_platform', prevTitle: 'Video Platform',
        nextSlug: '', nextTitle: '',
        demo: `
        <div className="glass-card p-6 md:p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">🧪 Mock Interview Timer</h3>
          <p className="text-sm font-arabic text-gray-500 mb-6" dir="rtl">45 دقيقة — تابع وقتك مع RESHADED checklist</p>
          <TimerDemo />
        </div>`,
        demoComponent: `
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
        <p className={\`text-6xl font-mono font-bold \${time < 300 ? 'text-red-400' : time < 600 ? 'text-amber-400' : 'text-white'}\`}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </p>
        <div className="flex gap-3 justify-center mt-4">
          <button onClick={() => setRunning(!running)} className="btn-primary px-6 py-2 rounded-xl">{running ? '⏸ Pause' : '▶ Start'}</button>
          <button onClick={() => { setTime(45 * 60); setRunning(false); }} className="btn-outline px-6 py-2 rounded-xl">🔄 Reset</button>
        </div>
      </div>
      <div className="space-y-2">
        {labels.map((label, i) => (
          <button key={i} onClick={() => toggle(i)} className={\`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all \${checks[i] ? 'bg-green-500/10 border border-green-500/20' : 'bg-gray-800/30 border border-gray-700/20'}\`}>
            <span className={\`w-5 h-5 rounded border-2 flex items-center justify-center text-xs \${checks[i] ? 'border-green-500 bg-green-500 text-white' : 'border-gray-600'}\`}>{checks[i] ? '✓' : ''}</span>
            <span className={\`text-sm \${checks[i] ? 'text-green-400 line-through' : 'text-gray-300'}\`}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}`
    }
];

modules.forEach(m => {
    const dir = path.join(__dirname, 'app', '(modules)', m.slug);
    fs.mkdirSync(dir, { recursive: true });

    const navNext = m.nextSlug
        ? `<Link href="/${m.nextSlug}" className="btn-primary px-6 py-3 rounded-xl">Next: ${m.nextTitle} →</Link>`
        : `<Link href="/" className="btn-primary px-6 py-3 rounded-xl">🏠 Back to Home</Link>`;

    const content = `'use client';

import { useState } from 'react';
import { useSDContent } from '../../../lib/contexts/SDContentContext';
import Link from 'next/link';
${m.demoComponent}

export default function Module${m.num}Page() {
  const { getModuleBySlug, loading } = useSDContent();
  const mod = getModuleBySlug('${m.slug}');

  if (loading || !mod) {
    return <div className="min-h-screen flex items-center justify-center bg-background-dark"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-${m.color}-600/10 to-${m.color}-800/5" />
        <div className="container-custom relative">
          <div className="flex items-center gap-4 mb-4">
            <div className={\`w-14 h-14 rounded-2xl bg-gradient-to-br \${mod.color} flex items-center justify-center text-white font-bold text-xl shadow-lg\`}>${m.num}</div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-${m.levelColor}-500/20 text-${m.levelColor}-400 border border-${m.levelColor}-500/30">${m.levelEmoji} ${m.level.charAt(0).toUpperCase() + m.level.slice(1)}</span>
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
              <div className="p-5 bg-${m.color}-950/30 border border-${m.color}-500/20 rounded-xl mb-6" dir="rtl">
                <h4 className="text-lg font-bold text-${m.color}-400 font-arabic mb-3">📖 {topic.title_ar}</h4>
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
                      <h5 className="font-bold text-${m.color}-400 mb-1">{kp.title}</h5>
                      <p className="text-sm text-gray-400">{kp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        ${m.demo}

        <div className="flex justify-between mt-12">
          <Link href="/${m.prevSlug}" className="btn-outline px-6 py-3 rounded-xl">← ${m.prevTitle}</Link>
          ${navNext}
        </div>
      </div>
    </div>
  );
}
`;

    fs.writeFileSync(path.join(dir, 'page.tsx'), content, 'utf8');
    console.log(`✅ Created ${m.slug}/page.tsx`);
});

console.log('\\n🎉 All module pages generated!');
