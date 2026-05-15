'use client';
import { useState } from 'react';
import Link from 'next/link';

const CA_ZONES = [
  // Los Angeles County
  { id: '1', name: 'Griffith Park', city: 'Los Angeles', state: 'CA', region: 'LA', desc: 'Approved for drone flight in open areas away from observatory. Stunning views of Hollywood Sign and LA skyline.', category: 'Park', rating: 4.9, flights: 234, lat: 34.1184, lng: -118.3004, maxAlt: 400, notes: 'Avoid BUR airspace. LAANC may be required.' },
  { id: '2', name: 'Santa Monica State Beach', city: 'Santa Monica', state: 'CA', region: 'LA', desc: 'Beach area approved outside peak hours. No flights over swimmers or pier area.', category: 'Coastal', rating: 4.8, flights: 189, lat: 34.0195, lng: -118.4912, maxAlt: 400, notes: 'SMO Airport nearby. LAANC required. No flights within 500ft of people.' },
  { id: '3', name: 'Huntington Beach State Beach', city: 'Huntington Beach', state: 'CA', region: 'LA', desc: 'City requires proof of drone insurance and valid FAA Part 107 license. Max 400ft AGL, visual line of sight required.', category: 'Coastal', rating: 4.8, flights: 156, lat: 33.6595, lng: -118.0000, maxAlt: 400, notes: 'Per City of HB ordinance: FAA Part 107 required, proof of insurance required, all FAA regulations apply.' },
  { id: '4', name: 'Malibu Lagoon State Beach', city: 'Malibu', state: 'CA', region: 'LA', desc: 'Scenic coastal area. Approved zones away from protected wildlife and lagoon ecological reserve.', category: 'Coastal', rating: 4.7, flights: 98, lat: 34.0341, lng: -118.6789, maxAlt: 400, notes: 'Avoid Malibu Lagoon ecological reserve. No flights over wildlife.' },
  { id: '5', name: 'Torrance Beach', city: 'Torrance', state: 'CA', region: 'LA', desc: 'South Bay beach with approved coastal drone zones away from residential areas.', category: 'Coastal', rating: 4.7, flights: 87, lat: 33.7985, lng: -118.3506, maxAlt: 400, notes: 'Avoid TOA Airport airspace. LAANC required.' },
  { id: '6', name: 'Dockweiler State Beach', city: 'Playa del Rey', state: 'CA', region: 'LA', desc: 'One of the few beaches near LA with designated drone flying areas. Popular with drone pilots.', category: 'Coastal', rating: 4.6, flights: 203, lat: 33.9308, lng: -118.4398, maxAlt: 400, notes: 'Designated drone area. Avoid LAX flight paths. Check LAANC before every flight.' },
  { id: '7', name: 'El Matador State Beach', city: 'Malibu', state: 'CA', region: 'LA', desc: 'Dramatic coastal cliffs and sea stacks. Approved for drone photography away from crowds.', category: 'Coastal', rating: 4.9, flights: 76, lat: 34.0286, lng: -118.8747, maxAlt: 400, notes: 'No flights over cliff edges with people below. VLOS required at all times.' },
  { id: '8', name: 'Elysian Park', city: 'Los Angeles', state: 'CA', region: 'LA', desc: 'Large urban park near Dodger Stadium with city views. Approved outside game days.', category: 'Park', rating: 4.5, flights: 112, lat: 34.0814, lng: -118.2395, maxAlt: 400, notes: 'No flights on Dodger Stadium game days. Avoid LAPD helicopter routes.' },
  { id: '9', name: 'Kenneth Hahn State Recreation Area', city: 'Los Angeles', state: 'CA', region: 'LA', desc: 'Hilltop park with panoramic LA basin views. Open grassy areas approved for drone ops.', category: 'Park', rating: 4.6, flights: 89, lat: 34.0031, lng: -118.3586, maxAlt: 400, notes: 'State park permit may be required for commercial use.' },
  { id: '10', name: 'Leo Carrillo State Park Beach', city: 'Malibu', state: 'CA', region: 'LA', desc: 'Remote Malibu beach with dramatic rock formations. Excellent for aerial photography.', category: 'Coastal', rating: 4.8, flights: 54, lat: 34.0459, lng: -118.9373, maxAlt: 400, notes: 'CA State Parks drone permit required. No flights over camping areas.' },
  // Orange County
  { id: '11', name: 'Crystal Cove State Park', city: 'Newport Beach', state: 'CA', region: 'OC', desc: 'Pristine coastal park with rocky coves and ocean views. Approved in designated areas.', category: 'Coastal', rating: 4.9, flights: 134, lat: 33.5651, lng: -117.8328, maxAlt: 400, notes: 'State park drone permit required. Avoid protected tidepool areas.' },
  { id: '12', name: 'Bolsa Chica State Beach', city: 'Huntington Beach', state: 'CA', region: 'OC', desc: 'Wide sandy beach with ocean views. Popular drone location away from ecological reserve.', category: 'Coastal', rating: 4.7, flights: 98, lat: 33.7206, lng: -118.0583, maxAlt: 400, notes: 'Bolsa Chica Ecological Reserve is strictly off-limits. Beach area only.' },
  { id: '13', name: 'Aliso Beach County Park', city: 'Laguna Beach', state: 'CA', region: 'OC', desc: 'Beautiful cove beach approved for drone photography. Stunning cliff formations.', category: 'Coastal', rating: 4.8, flights: 67, lat: 33.5206, lng: -117.7603, maxAlt: 400, notes: 'OC Parks permit required. No flights during beach events or over crowds.' },
  { id: '14', name: 'Irvine Regional Park', city: 'Orange', state: 'CA', region: 'OC', desc: 'Large regional park with open meadows. FAA Part 107 and park permit required.', category: 'Park', rating: 4.6, flights: 45, lat: 33.7919, lng: -117.7578, maxAlt: 400, notes: 'OC Parks permit required. No flights near equestrian areas or playgrounds.' },
  { id: '15', name: 'Dana Point Harbor', city: 'Dana Point', state: 'CA', region: 'OC', desc: 'Scenic harbor with ocean views. Approved in open areas away from vessel traffic.', category: 'Coastal', rating: 4.7, flights: 78, lat: 33.4639, lng: -117.6981, maxAlt: 400, notes: 'No flights over marina or moving vessels. Coast Guard regulations apply.' },
  // San Diego County
  { id: '16', name: 'Balboa Park Open Areas', city: 'San Diego', state: 'CA', region: 'SD', desc: 'Approved open park areas. Historic buildings and populated areas are no-fly zones within the park.', category: 'Park', rating: 4.9, flights: 178, lat: 32.7341, lng: -117.1444, maxAlt: 400, notes: 'LAANC required near SAN. Only pre-approved open areas. No flights over buildings.' },
  { id: '17', name: 'Torrey Pines State Beach', city: 'La Jolla', state: 'CA', region: 'SD', desc: 'Dramatic coastal cliffs and beach. Approved in beach areas away from glider port.', category: 'Coastal', rating: 4.9, flights: 143, lat: 32.9174, lng: -117.2545, maxAlt: 400, notes: 'Glider port nearby - coordinate with operators. No flights over glider activity.' },
  { id: '18', name: 'Mission Bay Park', city: 'San Diego', state: 'CA', region: 'SD', desc: 'Large aquatic park with open water and grass areas. Multiple approved drone zones.', category: 'Park', rating: 4.7, flights: 167, lat: 32.7831, lng: -117.2282, maxAlt: 400, notes: 'San Diego city permit required for commercial ops. No flights over Sea World.' },
  { id: '19', name: 'Cabrillo National Monument', city: 'Point Loma', state: 'CA', region: 'SD', desc: 'NPS site with panoramic bay views. Special NPS permit required for drone operations.', category: 'Coastal', rating: 4.8, flights: 32, lat: 32.6735, lng: -117.2425, maxAlt: 400, notes: 'NPS Section 6 permit required. Apply at least 2 weeks in advance. Limited permits available.' },
  { id: '20', name: 'Sunset Cliffs Natural Park', city: 'San Diego', state: 'CA', region: 'SD', desc: 'Dramatic ocean cliffs at sunset. Approved in designated areas with city permit.', category: 'Coastal', rating: 4.9, flights: 89, lat: 32.7157, lng: -117.2564, maxAlt: 400, notes: 'San Diego parks permit required. No flights during sunset hours when crowds are present.' },
  // San Francisco Bay Area
  { id: '21', name: 'Crissy Field', city: 'San Francisco', state: 'CA', region: 'SF', desc: 'National Recreation Area with pre-approved drone zones. Views of Golden Gate Bridge.', category: 'Park', rating: 4.9, flights: 312, lat: 37.8036, lng: -122.4681, maxAlt: 200, notes: 'Max 200ft due to SFO approach. NPS permit required. LAANC mandatory.' },
  { id: '22', name: 'Cesar Chavez Park', city: 'Berkeley', state: 'CA', region: 'SF', desc: 'Waterfront park with bay views. One of few Bay Area parks that allows drone flying.', category: 'Park', rating: 4.7, flights: 198, lat: 37.8731, lng: -122.3187, maxAlt: 400, notes: 'Berkeley city permit required. Check LAANC for OAK airspace proximity.' },
  { id: '23', name: 'Alviso Marina County Park', city: 'San Jose', state: 'CA', region: 'SF', desc: 'Wetlands and open water area. Approved in designated open areas with county permit.', category: 'Park', rating: 4.5, flights: 67, lat: 37.4271, lng: -121.9776, maxAlt: 400, notes: 'Santa Clara County permit required. No flights over protected wetlands.' },
  { id: '24', name: 'Point Reyes National Seashore', city: 'Point Reyes', state: 'CA', region: 'SF', desc: 'Remote coastal NPS area. Special permit required. Dramatic lighthouse and coastal views.', category: 'Coastal', rating: 4.9, flights: 28, lat: 38.0449, lng: -122.7996, maxAlt: 400, notes: 'NPS Section 6 permit required. Limited to pre-approved zones only. Apply 30 days in advance.' },
  { id: '25', name: 'Shoreline Park Mountain View', city: 'Mountain View', state: 'CA', region: 'SF', desc: 'Open park with lagoon views near Google campus. Approved in open park areas.', category: 'Park', rating: 4.6, flights: 134, lat: 37.4210, lng: -122.0821, maxAlt: 400, notes: 'Mountain View city permit required. Avoid Moffett Federal Airfield airspace.' },
  // Central Valley
  { id: '26', name: 'Folsom Lake State Recreation Area', city: 'Folsom', state: 'CA', region: 'CV', desc: 'Large reservoir with open water and shoreline. Approved in designated recreational areas.', category: 'Park', rating: 4.7, flights: 89, lat: 38.7196, lng: -121.1322, maxAlt: 400, notes: 'CA State Parks permit required for commercial operations. No flights over marinas.' },
  { id: '27', name: 'Lake Natoma', city: 'Rancho Cordova', state: 'CA', region: 'CV', desc: 'Calm lake with open shoreline. Approved for recreational drone photography.', category: 'Park', rating: 4.6, flights: 54, lat: 38.6396, lng: -121.2108, maxAlt: 400, notes: 'Folsom Lake SRA permit applies. No flights during rowing/kayaking events.' },
  // Inland Empire
  { id: '28', name: 'Lake Perris State Recreation Area', city: 'Perris', state: 'CA', region: 'IE', desc: 'Large inland lake with open shores and hills. Good visibility for drone operations.', category: 'Park', rating: 4.6, flights: 76, lat: 33.8535, lng: -117.1758, maxAlt: 400, notes: 'CA State Parks permit required. No flights over designated swimming areas.' },
  { id: '29', name: 'Joshua Tree Open Desert Zones', city: 'Joshua Tree', state: 'CA', region: 'IE', desc: 'Open desert areas outside National Park boundaries. Wide open skies for drone operations.', category: 'Desert', rating: 4.8, flights: 64, lat: 34.1350, lng: -116.3108, maxAlt: 400, notes: 'National Park boundary strictly enforced. GPS coordinates verified before each session.' },
  { id: '30', name: 'Salton Sea State Recreation Area', city: 'Mecca', state: 'CA', region: 'IE', desc: 'Unique inland sea with vast open spaces. Dramatic aerial perspectives of surreal landscape.', category: 'Desert', rating: 4.5, flights: 43, lat: 33.5136, lng: -115.9118, maxAlt: 400, notes: 'No flights over wildlife refuge areas. Verify TFRs near military training routes.' },
  // North California
  { id: '31', name: 'Lake Tahoe - Kings Beach', city: 'Kings Beach', state: 'CA', region: 'NC', desc: 'Crystal clear mountain lake with beach areas. Approved in beach zones outside of summer peak.', category: 'Coastal', rating: 4.9, flights: 112, lat: 39.2380, lng: -120.0240, maxAlt: 400, notes: 'Placer County permit required in summer. No flights over crowded beaches.' },
  { id: '32', name: 'Mount Shasta Open Areas', city: 'Mount Shasta', state: 'CA', region: 'NC', desc: 'Spectacular volcanic peak vistas. Approved in open BLM areas away from wilderness zones.', category: 'Desert', rating: 4.8, flights: 38, lat: 41.4099, lng: -122.1949, maxAlt: 400, notes: 'Wilderness areas prohibited. BLM open areas only. Check for forest fire TFRs.' },
  // Central Coast
  { id: '33', name: 'Pismo Beach', city: 'Pismo Beach', state: 'CA', region: 'CC', desc: 'Famous beach and sand dunes. Approved in open beach areas with city permit.', category: 'Coastal', rating: 4.7, flights: 98, lat: 35.1428, lng: -120.6415, maxAlt: 400, notes: 'Pismo Beach city permit required. No flights over Oceano Dunes SVRA without separate permit.' },
  { id: '34', name: 'Morro Bay State Park', city: 'Morro Bay', state: 'CA', region: 'CC', desc: 'Iconic bay with Morro Rock and estuary. Approved in open bay areas with park permit.', category: 'Coastal', rating: 4.8, flights: 87, lat: 35.3658, lng: -120.8530, maxAlt: 400, notes: 'CA State Parks permit required. Morro Rock TFR may apply. Estuary is protected.' },
  { id: '35', name: 'Big Sur Coast - Andrew Molera SP', city: 'Big Sur', state: 'CA', region: 'CC', desc: 'Dramatic Pacific coastline. One of the most spectacular aerial photography locations in California.', category: 'Coastal', rating: 5.0, flights: 45, lat: 36.2832, lng: -121.8417, maxAlt: 400, notes: 'CA State Parks permit required. No flights over campgrounds. Condor habitat - extra care required.' },
  { id: '36', name: 'Carmel Beach', city: 'Carmel', state: 'CA', region: 'CC', desc: 'Pristine white sand beach with Pebble Beach golf course views. City permit required.', category: 'Coastal', rating: 4.9, flights: 67, lat: 36.5530, lng: -121.9233, maxAlt: 400, notes: 'Carmel city permit required. No flights during tournaments at Pebble Beach.' },
];

const RESTRICTED_ZONES = [
  { name: 'LAX - Los Angeles International', lat: 33.9425, lng: -118.4081, radiusMiles: 5, reason: 'Class B Airspace - LAANC Required' },
  { name: 'SFO - San Francisco International', lat: 37.6213, lng: -122.3790, radiusMiles: 5, reason: 'Class B Airspace - LAANC Required' },
  { name: 'SAN - San Diego International', lat: 32.7338, lng: -117.1933, radiusMiles: 5, reason: 'Class B Airspace - LAANC Required' },
  { name: 'OAK - Oakland International', lat: 37.7213, lng: -122.2208, radiusMiles: 5, reason: 'Class B Airspace - LAANC Required' },
  { name: 'SJC - San Jose International', lat: 37.3626, lng: -121.9290, radiusMiles: 5, reason: 'Class C Airspace - LAANC Required' },
  { name: 'BUR - Hollywood Burbank', lat: 34.2007, lng: -118.3590, radiusMiles: 3, reason: 'Class C Airspace - LAANC Required' },
  { name: 'SMO - Santa Monica', lat: 34.0158, lng: -118.4514, radiusMiles: 3, reason: 'Class D Airspace' },
  { name: 'TOA - Torrance', lat: 33.8034, lng: -118.3396, radiusMiles: 3, reason: 'Class D Airspace' },
  { name: 'MRY - Monterey Regional', lat: 36.5870, lng: -121.8428, radiusMiles: 3, reason: 'Class D Airspace' },
  { name: 'Joshua Tree National Park', lat: 33.8734, lng: -115.9010, radiusMiles: 15, reason: 'National Park - No Drones' },
  { name: 'Yosemite National Park', lat: 37.8651, lng: -119.5383, radiusMiles: 20, reason: 'National Park - No Drones' },
  { name: 'Camp Pendleton MCAS', lat: 33.3750, lng: -117.3573, radiusMiles: 8, reason: 'Military Airspace - Prohibited' },
  { name: 'Vandenberg SFB', lat: 34.7370, lng: -120.5674, radiusMiles: 10, reason: 'Military Airspace - Prohibited' },
  { name: 'Edwards AFB', lat: 34.9054, lng: -117.8836, radiusMiles: 10, reason: 'Military Airspace - Prohibited' },
];

const REGIONS = { 'All': 'All', 'LA': 'Los Angeles', 'OC': 'Orange County', 'SD': 'San Diego', 'SF': 'Bay Area', 'CV': 'Central Valley', 'IE': 'Inland Empire', 'NC': 'Northern CA', 'CC': 'Central Coast' };
const CAT_COLORS = { Park: '#10b981', Coastal: '#06b6d4', Desert: '#f59e0b', Urban: '#6366f1' };

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
  const [region, setRegion] = useState('All');
  const [selected, setSelected] = useState(CA_ZONES[0]);
  const [view, setView] = useState('map');
  const [showRestricted, setShowRestricted] = useState(true);

  const filtered = CA_ZONES.filter(z =>
    (cat === 'All' || z.category === cat) &&
    (region === 'All' || z.region === region) &&
    (z.name.toLowerCase().includes(search.toLowerCase()) || z.city.toLowerCase().includes(search.toLowerCase()))
  );

  const mapUrl = selected
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${selected.lng - 0.06}%2C${selected.lat - 0.05}%2C${selected.lng + 0.06}%2C${selected.lat + 0.05}&layer=mapnik&marker=${selected.lat}%2C${selected.lng}`
    : `https://www.openstreetmap.org/export/embed.html?bbox=-124.5%2C32.5%2C-114.1%2C42.0&layer=mapnik`;

  return (
    <div style={{ backgroundColor: '#f5f5f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif' }}>
      <nav style={{ padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#1d1d1f' }}>
          <DroneIcon size={26} color="#6366f1" />
          <span style={{ fontWeight: '800', fontSize: '1.05rem' }}>Owletix</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['How it works', '/how-it-works'], ['For Pilots', '/for-pilots'], ['Safety', '/safety']].map(([l, h]) => (
            <Link key={l} href={h} style={{ color: '#6e6e73', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>{l}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.625rem' }}>
          <Link href="/auth/login" style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', padding: '0.45rem 0.875rem' }}>Sign in</Link>
          <Link href="/auth/signup" style={{ backgroundColor: '#1d1d1f', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600', padding: '0.45rem 1.1rem', borderRadius: '980px' }}>Get started</Link>
        </div>
      </nav>

      <div style={{ backgroundColor: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '0.625rem 2rem', display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6l-8-4z" stroke="#d97706" strokeWidth="2" fill="#d97706" fillOpacity="0.15"/></svg>
        <p style={{ fontSize: '0.775rem', color: '#92400e', fontWeight: '500', margin: 0, lineHeight: '1.4' }}>
          <strong>Legal requirement:</strong> All pilots must hold a valid FAA Part 107 certificate, carry proof of drone insurance, and comply with all FAA regulations (max 400ft AGL, visual line of sight). City/park permits may be additionally required.
        </p>
      </div>

      <div style={{ padding: '1.5rem 2rem 1rem', maxWidth: '1500px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <p style={{ color: '#6366f1', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>California Approved Locations</p>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f' }}>Public Flight Zones — {filtered.length} locations</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '980px', padding: '0.2rem' }}>
            {[['🗺 Map', 'map'], ['☰ List', 'list']].map(([l, v]) => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '0.4rem 1rem', borderRadius: '980px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600', backgroundColor: view === v ? '#1d1d1f' : 'transparent', color: view === v ? '#fff' : '#6e6e73' }}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <svg style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)' }} width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#6e6e73" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#6e6e73" strokeWidth="2" strokeLinecap="round"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search zones, cities..."
              style={{ width: '100%', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '980px', padding: '0.6rem 1rem 0.6rem 2.4rem', color: '#1d1d1f', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <select value={region} onChange={e => setRegion(e.target.value)} style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '980px', padding: '0.6rem 1rem', color: '#1d1d1f', fontSize: '0.82rem', outline: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>
            {Object.entries(REGIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          {['All', 'Park', 'Coastal', 'Desert'].map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ backgroundColor: cat === c ? '#1d1d1f' : '#fff', color: cat === c ? '#fff' : '#6e6e73', border: '1px solid ' + (cat === c ? '#1d1d1f' : 'rgba(0,0,0,0.1)'), borderRadius: '980px', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: '500', cursor: 'pointer' }}>{c}</button>
          ))}
          <button onClick={() => setShowRestricted(!showRestricted)} style={{ backgroundColor: showRestricted ? '#fff2f2' : '#fff', color: showRestricted ? '#dc2626' : '#6e6e73', border: '1px solid ' + (showRestricted ? '#fecaca' : 'rgba(0,0,0,0.1)'), borderRadius: '980px', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: '500', cursor: 'pointer' }}>
            🚫 Restricted
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 2rem 4rem', display: 'grid', gridTemplateColumns: view === 'map' ? '300px 1fr' : '1fr', gap: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: view === 'map' ? 'calc(100vh - 220px)' : 'none', overflowY: view === 'map' ? 'auto' : 'visible' }}>
          <p style={{ fontSize: '0.72rem', color: '#6e6e73', fontWeight: '500', padding: '0 0.25rem' }}>{filtered.length} approved zones</p>
          {filtered.map(zone => (
            <div key={zone.id} onClick={() => setSelected(zone)}
              style={{ backgroundColor: selected?.id === zone.id ? '#f0f0ff' : '#fff', border: '1px solid ' + (selected?.id === zone.id ? '#c7d2fe' : 'rgba(0,0,0,0.07)'), borderRadius: '0.875rem', padding: '1rem', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: '700', color: CAT_COLORS[zone.category] || '#6366f1', backgroundColor: (CAT_COLORS[zone.category] || '#6366f1') + '18', padding: '0.15rem 0.5rem', borderRadius: '980px' }}>{zone.category}</span>
                <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: '600' }}>★ {zone.rating}</span>
              </div>
              <h3 style={{ fontWeight: '700', fontSize: '0.875rem', color: '#1d1d1f', marginBottom: '0.1rem' }}>{zone.name}</h3>
              <p style={{ fontSize: '0.72rem', color: '#6e6e73', marginBottom: '0.4rem' }}>{zone.city} · Max {zone.maxAlt}ft</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.68rem', color: '#6e6e73' }}>{zone.flights} flights</span>
                <Link href="/auth/signup" onClick={e => e.stopPropagation()} style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: '700', textDecoration: 'none', backgroundColor: '#f0f0ff', padding: '0.2rem 0.6rem', borderRadius: '980px' }}>Book $15+</Link>
              </div>
            </div>
          ))}

          {showRestricted && (
            <div style={{ marginTop: '0.75rem' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: '700', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem', padding: '0 0.25rem' }}>🚫 Restricted Airspace ({RESTRICTED_ZONES.length})</p>
              {RESTRICTED_ZONES.map(r => (
                <div key={r.name} style={{ backgroundColor: '#fff2f2', border: '1px solid #fecaca', borderRadius: '0.625rem', padding: '0.625rem', marginBottom: '0.3rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#dc2626', marginBottom: '0.1rem' }}>{r.name}</p>
                  <p style={{ fontSize: '0.68rem', color: '#9b1c1c' }}>{r.reason} · {r.radiusMiles}mi no-fly radius</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {view === 'map' && (
          <div style={{ position: 'sticky', top: '120px', height: 'calc(100vh - 210px)' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '1.5rem', border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              {selected && (
                <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div>
                      <h2 style={{ fontWeight: '800', fontSize: '1rem', color: '#1d1d1f', marginBottom: '0.1rem' }}>{selected.name}</h2>
                      <p style={{ fontSize: '0.75rem', color: '#6e6e73' }}>{selected.city}, CA · Max {selected.maxAlt}ft AGL · ★ {selected.rating}</p>
                    </div>
                    <Link href="/auth/signup" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '980px', fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap' as const }}>Book now →</Link>
                  </div>
                  <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', padding: '0.5rem 0.75rem' }}>
                    <p style={{ fontSize: '0.72rem', color: '#92400e', lineHeight: '1.5', margin: 0 }}>⚖️ {selected.notes}</p>
                  </div>
                </div>
              )}
              <div style={{ flex: 1, position: 'relative' }}>
                <iframe src={mapUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="California Drone Zones" />
                <div style={{ position: 'absolute', bottom: '0.875rem', left: '0.875rem', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '0.625rem', padding: '0.4rem 0.75rem', fontSize: '0.7rem', color: '#6e6e73', border: '1px solid rgba(0,0,0,0.08)', backdropFilter: 'blur(10px)' }}>
                  ✅ {filtered.length} approved · 🚫 {RESTRICTED_ZONES.length} restricted
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'list' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {filtered.map(zone => (
              <div key={zone.id} style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: '700', color: CAT_COLORS[zone.category] || '#6366f1', backgroundColor: (CAT_COLORS[zone.category] || '#6366f1') + '18', padding: '0.2rem 0.6rem', borderRadius: '980px' }}>{zone.category}</span>
                  <span style={{ fontSize: '0.65rem', backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', borderRadius: '980px', padding: '0.15rem 0.5rem', fontWeight: '600' }}>✓ FAA Approved</span>
                </div>
                <h3 style={{ fontWeight: '700', fontSize: '1rem', color: '#1d1d1f', marginBottom: '0.2rem' }}>{zone.name}</h3>
                <p style={{ fontSize: '0.775rem', color: '#6e6e73', marginBottom: '0.5rem' }}>{zone.city}, CA · Max {zone.maxAlt}ft AGL</p>
                <p style={{ fontSize: '0.82rem', color: '#6e6e73', lineHeight: '1.6', marginBottom: '0.75rem' }}>{zone.desc}</p>
                <div style={{ backgroundColor: '#fffbeb', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', marginBottom: '1rem', border: '1px solid #fde68a' }}>
                  <p style={{ fontSize: '0.72rem', color: '#92400e', lineHeight: '1.5', margin: 0 }}>⚖️ {zone.notes}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6e6e73' }}>★ {zone.rating} · {zone.flights} flights</span>
                  <Link href="/auth/signup" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', padding: '0.45rem 0.875rem', borderRadius: '980px', fontSize: '0.78rem', fontWeight: '700' }}>Book from $15</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
