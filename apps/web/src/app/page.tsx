export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0f1e] text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-6">
          <span className="text-6xl">🦉</span>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Owletix
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Lawful Live Aerial Visibility Marketplace
        </p>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
          Connect with verified drone pilots for live aerial views of approved public spaces and authorized properties. Safe, lawful, transparent.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: '✅', title: 'Verified Pilots', desc: 'FAA Part 107 certified pilots only' },
            { icon: '🔒', title: 'Lawful Only', desc: 'Approved public zones and authorized properties' },
            { icon: '📡', title: 'Live Streaming', desc: 'Real-time aerial views via secure stream' },
          ].map((f) => (
            <div key={f.title} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/auth/signup" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
            Get Started
          </a>
          <a href="/auth/login" className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors">
            Sign In
          </a>
          <a href="/zones" className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors">
            Browse Zones
          </a>
        </div>
        <div className="mt-16 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-sm">
          ⚠️ Owletix is strictly for lawful aerial visibility only. Surveillance, tracking, or any illegal use is prohibited and will result in immediate account termination.
        </div>
      </div>
    </main>
  );
}
