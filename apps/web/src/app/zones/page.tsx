'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ZONES = [
  { id: '1', name: 'Griffith Park', city: 'Los Angeles', state: 'CA', description: 'Iconic hilltop park with panoramic views of the Hollywood Sign and downtown LA skyline.', category: 'Park', rating: 4.9, flights: 234 },
  { id: '2', name: 'Santa Monica Pier', city: 'Los Angeles', state: 'CA', description: 'Famous oceanfront pier with stunning Pacific Ocean views and beachfront scenery.', category: 'Coastal', rating: 4.8, flights: 189 },
  { id: '3', name: 'Golden Gate Park', city: 'San Francisco', state: 'CA', description: 'Expansive urban park offering aerial views of the bay and city skyline.', category: 'Park', rating: 4.9, flights: 312 },
  { id: '4', name: 'Central Park', city: 'New York', state: 'NY', description: 'The iconic urban oasis in the heart of Manhattan, surrounded by skyscrapers.', category: 'Park', rating: 4.7, flights: 421 },
  { id: '5', name: 'Millennium Park', city: 'Chicago', state: 'IL', description: 'Award-winning park featuring the famous Bean sculpture and stunning city views.', category: 'Urban', rating: 4.8, flights: 156 },
  { id: '6', name: 'Balboa Park', city: 'San Diego', state: 'CA', description: 'Historic cultural park with museums, gardens, and views of the San Diego skyline.', category: 'Park', rating: 4.9, flights: 178 },
];

const CATEGORIES = ['All', 'Park', 'Coastal', 'Urban'];

export default function ZonesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<typeof ZONES[0] | null>(null);

  const filtered = ZONES.filter(z =>
    (category === 'All' || z.category === category) &&
    (z.name.toLowerCase().includes(search.toLowerCase()) || z.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      {/* Nav */}
      <nav style={{ padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#fff' }}>
          <span style={{ fontSize: '1.5rem' }}>🦉</span>
          <span style={{ fontWeight: '700' }}>Owletix</span>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/auth/login" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Sign in</Link>
          <Link href="/auth/signup" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600', padding: '0.5rem 1.25rem', borderRadius: '980px' }}>Get started</Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{ padding: '4rem 2rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Approved Locations</p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>Public Flight Zones</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', maxWidth: '500px', lineHeight: '1.6' }}>Every zone is pre-approved for drone flight. Book a verified pilot and get a live aerial view in minutes.</p>
      </div>

      {/* Search + Filter */}
      <div style={{ padding: '0 2rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search zones or cities..."
            style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '980px', padding: '0.75rem 1rem 0.75rem 2.75rem', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              style={{ backgroundColor: category === c ? '#6366f1' : 'rgba(255,255,255,0.06)', color: category === c ? '#fff' : 'rgba(255,255,255,0.6)', border: `1px solid ${category === c ? '#6366f1' : 'rgba(255,255,255,0.1)'}`, borderRadius: '980px', padding: '0.5rem 1.25rem', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid + Detail */}
      <div style={{ padding: '0 2rem 4rem', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', alignContent: 'start' }}>
          {filtered.map(zone => (
            <div key={zone.id} onClick={() => setSelected(zone === selected ? null : zone)}
              style={{ backgroundColor: selected?.id === zone.id ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${selected?.id === zone.id ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '1.25rem', padding: '1.75rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: 'rgba(99,102,241,0.15)', color: '#a5b4fc', fontSize: '0.75rem', fontWeight: '600', padding: '0.3rem 0.75rem', borderRadius: '980px' }}>{zone.category}</span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>⭐ {zone.rating}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>{zone.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.875rem' }}>{zone.city}, {zone.state}</p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', marginBottom: '1.25rem' }}>{zone.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>🛫 {zone.flights} flights completed</span>
                <span style={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: '600' }}>From $15 →</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.3)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p>No zones found matching your search</p>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.5rem', padding: '2rem', height: 'fit-content', position: 'sticky', top: '80px' }}>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '1.25rem', marginBottom: '1.5rem', display: 'block' }}>✕</button>
            <span style={{ backgroundColor: 'rgba(99,102,241,0.15)', color: '#a5b4fc', fontSize: '0.75rem', fontWeight: '600', padding: '0.3rem 0.75rem', borderRadius: '980px' }}>{selected.category}</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.03em', margin: '1rem 0 0.25rem' }}>{selected.name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{selected.city}, {selected.state}</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', fontSize: '0.9rem', marginBottom: '2rem' }}>{selected.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              {[{ label: 'Rating', value: `⭐ ${selected.rating}` }, { label: 'Flights', value: `🛫 ${selected.flights}` }, { label: 'Min. time', value: '⏱ 15 min' }, { label: 'Price', value: '💳 $1/min' }].map(s => (
                <div key={s.label} style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{s.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <Link href="/auth/signup" style={{ display: 'block', backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', textAlign: 'center', padding: '0.875rem', borderRadius: '980px', fontWeight: '600', fontSize: '0.95rem' }}>
              Book this zone →
            </Link>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.75rem' }}>No charge until your pilot takes off</p>
          </div>
        )}
      </div>
    </div>
  );
}
