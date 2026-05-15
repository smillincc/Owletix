export default function ZonesPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Public Zones</h1>
        <p className="text-gray-400 mb-8">Browse approved locations for aerial viewing sessions.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Griffith Park, LA', 'Santa Monica Pier, LA', 'Golden Gate Park, SF', 'Central Park, NYC'].map(zone => (
            <div key={zone} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">{zone}</h3>
              <p className="text-gray-400 text-sm mb-4">Approved public zone for aerial viewing</p>
              <a href="/auth/signup" className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                Request Live View
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
