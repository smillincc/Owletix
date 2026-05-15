'use client';
import { useState } from 'react';
import Link from 'next/link';

const ZONES = [
  { id: '1', name: 'Griffith Park', city: 'Los Angeles', state: 'CA', desc: 'Iconic hilltop park with panoramic views of the Hollywood Sign and downtown LA skyline.', category: 'Park', rating: 4.9, flights: 234, minPrice: 15 },
  { id: '2', name: 'Santa Monica Pier', city: 'Los Angeles', state: 'CA', desc: 'Famous oceanfront pier with stunning Pacific Ocean views and beachfront scenery.', category: 'Coastal', rating: 4.8, flights: 189, minPrice: 15 },
  { id: '3', name: 'Golden Gate Park', city: 'San Francisco', state: 'CA', desc: 'Expansive urban park offering aerial views of the bay and city skyline.', category: 'Park', rating: 4.9, flights: 312, minPrice: 15 },
  { id: '4', name: 'Central Park', city: 'New York', state: 'NY', desc: 'The iconic urban oasis in the heart of Manhattan, surrounded by skyscrapers.', category: 'Park', rating: 4.7, flights: 421, minPrice: 15 },
  { id: '5', name: 'Millennium Park', city: 'Chicago', state: 'IL', desc: 'Award-winning park featuring the famous Bean sculpture and stunning city views.', category: 'Urban', rating: 4.8, flights: 156, minPrice: 15 },
  { id: '6', name: 'Balboa Park', city: 'San Diego', state: 'CA', desc: 'Historic cultural park with museums, gardens, and views of the San Diego skyline.', category: 'Park', rating: 4.9, flights: 178, minPrice: 15 },
];

const CATS = ['All', 'Park', 'Coastal', 'Urban'];
const CAT_COLORS = { Park: '#10b981', Coastal: '#06b6d4', Urban: '#6366f1' };

export default function ZonesPage() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = ZONES.filter(z =>
    (cat === 'All' || z.category === cat) &&
    (z.name.toLowerCase().includes(search.toLowerCase()) || z.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', color: '#1d1d1f' }}>
      {/* Nav */}
      <nav style={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#1d1d1f' }}>
          <span style={{ fontSize: '1.4rem' }}>🦉</span>
          <span style={{ fontWeight: '700', fontSize: '1.05rem' }}>Owletix</span>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/auth/login" style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', padding: '0.5rem 1rem' }}>Sign in</Link>
          <Link href="/auth/signup" style={{ backgroundColor: '#1d1d1f', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600', padding: '0.5rem 1.25rem', borderRadius: '980px' }}>Get started</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ color: '#6366f1', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Approved Locations</p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>Public Flight Zones</h1>
          <p style={{ color: '#6e6e73', fontSize: '0.95rem', maxWidth: '480px', lineHeight: '1.6' }}>Every zone is pre-approved for drone flight. Book a verified pilot and get a live aerial view in minutes.</p>
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.9rem' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search zones or cities..."
              style={{ width: '100%', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '980px', padding: '0.7rem 1rem 0.7rem 2.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box', color: '#1d1d1f', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#fff', padding: '0.3rem', borderRadius: '980px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ backgroundColor: cat === c ? '#1d1d1f' : 'transparent', color: cat === c ? '#fff' : '#6e6e73', border: 'none', borderRadius: '980px', padding: '0.4rem 1rem', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit' }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', alignItems: 'start' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {filtered.map(z => (
              <div key={z.id} onClick={() => setSelected(selected?.id === z.id ? null : z)}
                style={{ backgroundColor: '#fff', border: `2px solid ${selected?.id === z.id ? '#6366f1' : 'transparent'}`, borderRadius: '1.25rem', padding: '1.5rem', cursor: 'pointer', boxShadow: selected?.id === z.id ? '0 0 0 4px rgba(99,102,241,0.1)' : '0 1px 8px rgba(0,0,0,0.06)', transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ backgroundColor: `${CAT_COLORS[z.category]}15`, color: CAT_COLORS[z.category], fontSize: '0.72rem', fontWeight: '700', padding: '0.25rem 0.7rem', borderRadius: '980px' }}>{z.category}</span>
                  <span style={{ fontSize: '0.8rem', color: '#6e6e73', fontWeight: '500' }}>⭐ {z.rating}</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.2rem', color: '#1d1d1f' }}>{z.name}</h3>
                <p style={{ fontSize: '0.82rem', color: '#6e6e73', marginBottom: '0.75rem' }}>{z.city}, {z.state}</p>
                <p style={{ fontSize: '0.85rem', color: '#6e6e73', lineHeight: '1.55', marginBottom: '1.1rem' }}>{z.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#6e6e73' }}>🛫 {z.flights} flights</span>
                  <span style={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: '700' }}>From ${z.minPrice} →</span>
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <div style={{ backgroundColor: '#fff', borderRadius: '1.5rem', padding: '1.75rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)', position: 'sticky', top: '80px' }}>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#6e6e73', cursor: 'pointer', fontSize: '1.1rem', marginBottom: '1.25rem', display: 'block', fontFamily: 'inherit' }}>✕ Close</button>
              <span style={{ backgroundColor: `${CAT_COLORS[selected.category]}15`, color: CAT_COLORS[selected.category], fontSize: '0.72rem', fontWeight: '700', padding: '0.25rem 0.7rem', borderRadius: '980px' }}>{selected.category}</span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-0.03em', margin: '0.875rem 0 0.2rem', color: '#1d1d1f' }}>{selected.name}</h2>
              <p style={{ color: '#6e6e73', fontSize: '0.875rem', marginBottom: '1.25rem' }}>{selected.city}, {selected.state}</p>
              <p style={{ color: '#6e6e73', lineHeight: '1.7', fontSize: '0.875rem', marginBottom: '1.75rem' }}>{selected.desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {[['⭐ ' + selected.rating, 'Rating'], ['🛫 ' + selected.flights, 'Flights'], ['⏱ 15 min', 'Minimum'], ['💳 $1/min', 'Rate']].map(([v, l]) => (
                  <div key={l} style={{ backgroundColor: '#f5f5f7', borderRadius: '0.875rem', padding: '0.875rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1d1d1f', marginBottom: '0.2rem' }}>{v}</div>
                    <div style={{ fontSize: '0.72rem', color: '#6e6e73' }}>{l}</div>
                  </div>
                ))}
              </div>
              <Link href="/auth/signup" style={{ display: 'block', backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', textAlign: 'center', padding: '0.9rem', borderRadius: '980px', fontWeight: '700', fontSize: '0.95rem' }}>Book this zone →</Link>
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6e6e73', marginTop: '0.75rem' }}>No charge until your pilot takes off</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
