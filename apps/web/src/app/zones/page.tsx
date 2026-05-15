'use client';
import { useState } from 'react';
import Link from 'next/link';

const ZONES = [
  { id: '1', name: 'Griffith Park', city: 'Los Angeles', state: 'CA', desc: 'Iconic hilltop park with panoramic views of the Hollywood Sign and downtown LA skyline.', category: 'Park', rating: 4.9, flights: 234, lat: 34.1184, lng: -118.3004 },
  { id: '2', name: 'Santa Monica Pier', city: 'Los Angeles', state: 'CA', desc: 'Famous oceanfront pier with stunning Pacific Ocean views and beachfront scenery.', category: 'Coastal', rating: 4.8, flights: 189, lat: 34.0095, lng: -118.4975 },
  { id: '3', name: 'Golden Gate Park', city: 'San Francisco', state: 'CA', desc: 'Expansive urban park offering aerial views of the bay and city skyline.', category: 'Park', rating: 4.9, flights: 312, lat: 37.7694, lng: -122.4862 },
  { id: '4', name: 'Central Park', city: 'New York', state: 'NY', desc: 'The iconic urban oasis in the heart of Manhattan, surrounded by skyscrapers.', category: 'Park', rating: 4.7, flights: 421, lat: 40.7829, lng: -73.9654 },
  { id: '5', name: 'Millennium Park', city: 'Chicago', state: 'IL', desc: 'Award-winning park featuring the famous Bean sculpture and stunning city views.', category: 'Urban', rating: 4.8, flights: 156, lat: 41.8827, lng: -87.6233 },
  { id: '6', name: 'Balboa Park', city: 'San Diego', state: 'CA', desc: 'Historic cultural park with museums, gardens, and views of the San Diego skyline.', category: 'Park', rating: 4.9, flights: 178, lat: 32.7341, lng: -117.1444 },
  { id: '7', name: 'Piedmont Park', city: 'Atlanta', state: 'GA', desc: 'Beautiful urban green space with skyline views of downtown Atlanta.', category: 'Park', rating: 4.7, flights: 98, lat: 33.7883, lng: -84.3724 },
  { id: '8', name: 'Discovery Park', city: 'Seattle', state: 'WA', desc: 'Largest park in Seattle with stunning Puget Sound and Olympic Mountain views.', category: 'Coastal', rating: 4.8, flights: 134, lat: 47.6614, lng: -122.4107 },
];

const CAT_COLORS = { Park: '#10b981', Coastal: '#06b6d4', Urban: '#6366f1' };
const CATS = ['All', 'Park', 'Coastal', 'Urban'];

const DroneIcon = ({ size = 26, color = '#6366f1' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <circle cx="36" cy="12" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <circle cx="12" cy="36" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <circle cx="36" cy="36" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <rect x="18" y="18" width="12" height="12" rx="3" fill={color} opacity="0.15" stroke={color} strokeWidth="2"/>
    <line x1="17" y1="17" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="31" y1="17" x2="36" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="17" y1="31" x2="12" y2="36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="31" y1="31" x2="36" y2="36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="3" fill={color}/>
  </svg>
);

export default function ZonesPage() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(ZONES[0]);
  const [view, setView] = useState('map');

  const filtered = ZONES.filter(z =>
    (cat === 'All' || z.category === cat) &&
    (z.name.toLowerCase().includes(search.toLowerCase()) || z.city.toLowerCase().includes(search.toLowerCase()))
  );

  const mapUrl = selected
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${selected.lng - 0.05}%2C${selected.lat - 0.04}%2C${selected.lng + 0.05}%2C${selected.lat + 0.04}&layer=mapnik&marker=${selected.lat}%2C${selected.lng}`
    : `https://www.openstreetmap.org/export/embed.html?bbox=-130%2C24%2C-65%2C50&layer=mapnik`;

  return (
    <div style={{ backgroundColor: '#f5f5f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif' }}>
      {/* Nav */}
      <nav style={{ padding: '0 2.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#1d1d1f' }}>
          <DroneIcon size={26} color="#6366f1" />
          <span style={{ fontWeight: '800', fontSize: '1.05rem' }}>Owletix</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[['How it works', '/how-it-works'], ['For Pilots', '/for-pilots'], ['Safety', '/safety']].map(([l, h]) => (
            <Link key={l} href={h} style={{ color: '#6e6e73', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>{l}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/auth/login" style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', padding: '0.5rem 1rem' }}>Sign in</Link>
          <Link href="/auth/signup" style={{ backgroundColor: '#1d1d1f', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600', padding: '0.55rem 1.25rem', borderRadius: '980px' }}>Get started</Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{ padding: '2.5rem 2.5rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        <p style={{ color: '#6366f1', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Approved Locations</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f', marginBottom: '0.3rem' }}>Public Flight Zones</h1>
            <p style={{ color: '#6e6e73', fontSize: '0.9rem' }}>Every zone is pre-approved. Book a verified pilot and get live aerial views in minutes.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '980px', padding: '0.25rem' }}>
            {[['Map', 'map'], ['List', 'list']].map(([l, v]) => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '0.4rem 1rem', borderRadius: '980px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600', backgroundColor: view === v ? '#1d1d1f' : 'transparent', color: view === v ? '#fff' : '#6e6e73', transition: 'all 0.15s' }}>{l}</button>
            ))}
          </div>
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#6e6e73" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#6e6e73" strokeWidth="2" strokeLinecap="round"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search zones or cities..."
              style={{ width: '100%', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '980px', padding: '0.7rem 1rem 0.7rem 2.75rem', color: '#1d1d1f', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ backgroundColor: cat === c ? '#1d1d1f' : '#fff', color: cat === c ? '#fff' : '#6e6e73', border: '1px solid ' + (cat === c ? '#1d1d1f' : 'rgba(0,0,0,0.1)'), borderRadius: '980px', padding: '0.5rem 1.1rem', fontSize: '0.82rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s' }}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2.5rem 4rem', display: 'grid', gridTemplateColumns: view === 'map' ? '340px 1fr' : '1fr', gap: '1.5rem' }}>

        {/* Zone list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', maxHeight: view === 'map' ? 'calc(100vh - 220px)' : 'none', overflowY: view === 'map' ? 'auto' : 'visible' }}>
          {filtered.map(zone => (
            <div key={zone.id} onClick={() => setSelected(zone)}
              style={{ backgroundColor: selected?.id === zone.id ? '#f0f0ff' : '#fff', border: '1px solid ' + (selected?.id === zone.id ? '#c7d2fe' : 'rgba(0,0,0,0.07)'), borderRadius: '1rem', padding: '1.25rem', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: CAT_COLORS[zone.category], backgroundColor: CAT_COLORS[zone.category] + '18', padding: '0.2rem 0.6rem', borderRadius: '980px' }}>{zone.category}</span>
                <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: '600' }}>★ {zone.rating}</span>
              </div>
              <h3 style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1d1d1f', marginBottom: '0.15rem' }}>{zone.name}</h3>
              <p style={{ fontSize: '0.78rem', color: '#6e6e73', marginBottom: '0.625rem' }}>{zone.city}, {zone.state}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#6e6e73' }}>{zone.flights} flights</span>
                <Link href="/auth/signup" onClick={e => e.stopPropagation()} style={{ fontSize: '0.78rem', color: '#6366f1', fontWeight: '700', textDecoration: 'none', backgroundColor: '#f0f0ff', padding: '0.3rem 0.75rem', borderRadius: '980px' }}>Book from $15</Link>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6e6e73' }}>
              <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔍</p>
              <p style={{ fontSize: '0.9rem' }}>No zones found</p>
            </div>
          )}
        </div>

        {/* Map panel */}
        {view === 'map' && (
          <div style={{ position: 'sticky', top: '80px', height: 'calc(100vh - 220px)' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '1.5rem', border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              {selected && (
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h2 style={{ fontWeight: '800', fontSize: '1.1rem', color: '#1d1d1f', marginBottom: '0.15rem', letterSpacing: '-0.02em' }}>{selected.name}</h2>
                    <p style={{ fontSize: '0.8rem', color: '#6e6e73' }}>{selected.city}, {selected.state} · ★ {selected.rating} · {selected.flights} flights</p>
                  </div>
                  <Link href="/auth/signup" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', padding: '0.625rem 1.25rem', borderRadius: '980px', fontSize: '0.85rem', fontWeight: '700', whiteSpace: 'nowrap' as const }}>Book this zone →</Link>
                </div>
              )}
              <div style={{ flex: 1, position: 'relative' }}>
                <iframe
                  src={mapUrl}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  title="Zone Map"
                />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '0.75rem', padding: '0.625rem 1rem', fontSize: '0.75rem', color: '#6e6e73', border: '1px solid rgba(0,0,0,0.08)', backdropFilter: 'blur(10px)' }}>
                  📍 {filtered.length} approved zones shown
                </div>
              </div>
              {selected && (
                <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                  <p style={{ fontSize: '0.85rem', color: '#6e6e73', lineHeight: '1.6' }}>{selected.desc}</p>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.875rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#f5f5f7', borderRadius: '980px', padding: '0.3rem 0.75rem', color: '#1d1d1f', fontWeight: '500' }}>💳 From $15</span>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#f5f5f7', borderRadius: '980px', padding: '0.3rem 0.75rem', color: '#1d1d1f', fontWeight: '500' }}>⏱ 15 min minimum</span>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#ecfdf5', borderRadius: '980px', padding: '0.3rem 0.75rem', color: '#059669', fontWeight: '500' }}>✓ Pre-approved</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* List view grid */}
        {view === 'list' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {filtered.map(zone => (
              <div key={zone.id} style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', color: CAT_COLORS[zone.category], backgroundColor: CAT_COLORS[zone.category] + '18', padding: '0.25rem 0.7rem', borderRadius: '980px' }}>{zone.category}</span>
                  <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: '600' }}>★ {zone.rating}</span>
                </div>
                <h3 style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1d1d1f', marginBottom: '0.25rem' }}>{zone.name}</h3>
                <p style={{ fontSize: '0.82rem', color: '#6e6e73', marginBottom: '0.75rem' }}>{zone.city}, {zone.state}</p>
                <p style={{ fontSize: '0.875rem', color: '#6e6e73', lineHeight: '1.6', marginBottom: '1.25rem' }}>{zone.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#6e6e73' }}>{zone.flights} flights completed</span>
                  <Link href="/auth/signup" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '980px', fontSize: '0.82rem', fontWeight: '700' }}>Book from $15</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
