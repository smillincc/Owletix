'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const CA_ZONES = [
  { id:'1', name:'Griffith Park', city:'Los Angeles', region:'LA', desc:'Open hilltop areas with Hollywood Sign and downtown LA views.', category:'Park', rating:4.9, flights:234, lat:34.1184, lng:-118.3004, maxAlt:400, notes:'Avoid BUR airspace. LAANC may be required.' },
  { id:'2', name:'Santa Monica State Beach', city:'Santa Monica', region:'LA', desc:'Beach area approved outside peak hours. No flights over swimmers.', category:'Coastal', rating:4.8, flights:189, lat:34.0195, lng:-118.4912, maxAlt:400, notes:'SMO Airport nearby. LAANC required. 500ft clearance from people.' },
  { id:'3', name:'Huntington Beach State Beach', city:'Huntington Beach', region:'LA', desc:'City requires proof of drone insurance and valid FAA Part 107 license. Max 400ft AGL.', category:'Coastal', rating:4.8, flights:156, lat:33.6595, lng:-118.0000, maxAlt:400, notes:'Per City of HB ordinance: FAA Part 107 required, proof of insurance required.' },
  { id:'4', name:'Dockweiler State Beach', city:'Playa del Rey', region:'LA', desc:'Designated drone flying area near LAX with approved zones.', category:'Coastal', rating:4.6, flights:203, lat:33.9308, lng:-118.4398, maxAlt:400, notes:'Designated drone area. Avoid LAX flight paths. LAANC required.' },
  { id:'5', name:'Malibu Lagoon State Beach', city:'Malibu', region:'LA', desc:'Scenic coastal area away from protected wildlife and lagoon reserve.', category:'Coastal', rating:4.7, flights:98, lat:34.0341, lng:-118.6789, maxAlt:400, notes:'Avoid Malibu Lagoon ecological reserve. No flights over wildlife.' },
  { id:'6', name:'El Matador State Beach', city:'Malibu', region:'LA', desc:'Dramatic coastal cliffs and sea stacks. Stunning aerial photography.', category:'Coastal', rating:4.9, flights:76, lat:34.0286, lng:-118.8747, maxAlt:400, notes:'No flights over cliff edges with people below. VLOS required.' },
  { id:'7', name:'Torrance Beach', city:'Torrance', region:'LA', desc:'South Bay beach with approved coastal drone zones.', category:'Coastal', rating:4.7, flights:87, lat:33.7985, lng:-118.3506, maxAlt:400, notes:'Avoid TOA Airport airspace. LAANC required.' },
  { id:'8', name:'Kenneth Hahn SRA', city:'Los Angeles', region:'LA', desc:'Hilltop park with panoramic LA basin views.', category:'Park', rating:4.6, flights:89, lat:34.0031, lng:-118.3586, maxAlt:400, notes:'State park permit may be required for commercial use.' },
  { id:'9', name:'Leo Carrillo State Park', city:'Malibu', region:'LA', desc:'Remote Malibu beach with dramatic rock formations.', category:'Coastal', rating:4.8, flights:54, lat:34.0459, lng:-118.9373, maxAlt:400, notes:'CA State Parks drone permit required. No flights over camping areas.' },
  { id:'10', name:'Elysian Park', city:'Los Angeles', region:'LA', desc:'Large urban park near Dodger Stadium with city views.', category:'Park', rating:4.5, flights:112, lat:34.0814, lng:-118.2395, maxAlt:400, notes:'No flights on game days. Avoid LAPD helicopter routes.' },
  { id:'11', name:'Crystal Cove State Park', city:'Newport Beach', region:'OC', desc:'Pristine coastal park with rocky coves and ocean views.', category:'Coastal', rating:4.9, flights:134, lat:33.5651, lng:-117.8328, maxAlt:400, notes:'State park drone permit required. Avoid protected tidepool areas.' },
  { id:'12', name:'Bolsa Chica State Beach', city:'Huntington Beach', region:'OC', desc:'Wide sandy beach away from ecological reserve.', category:'Coastal', rating:4.7, flights:98, lat:33.7206, lng:-118.0583, maxAlt:400, notes:'Bolsa Chica Ecological Reserve is strictly off-limits. Beach only.' },
  { id:'13', name:'Aliso Beach County Park', city:'Laguna Beach', region:'OC', desc:'Beautiful cove beach with stunning cliff formations.', category:'Coastal', rating:4.8, flights:67, lat:33.5206, lng:-117.7603, maxAlt:400, notes:'OC Parks permit required. No flights during beach events.' },
  { id:'14', name:'Dana Point Harbor', city:'Dana Point', region:'OC', desc:'Scenic harbor with ocean views away from vessel traffic.', category:'Coastal', rating:4.7, flights:78, lat:33.4639, lng:-117.6981, maxAlt:400, notes:'No flights over marina or moving vessels.' },
  { id:'15', name:'Irvine Regional Park', city:'Orange', region:'OC', desc:'Large regional park with open meadows for drone operations.', category:'Park', rating:4.6, flights:45, lat:33.7919, lng:-117.7578, maxAlt:400, notes:'OC Parks permit required. No flights near equestrian areas.' },
  { id:'16', name:'Balboa Park Open Areas', city:'San Diego', region:'SD', desc:'Pre-approved open park areas with city skyline views.', category:'Park', rating:4.9, flights:178, lat:32.7341, lng:-117.1444, maxAlt:400, notes:'LAANC required near SAN. Only pre-approved open areas.' },
  { id:'17', name:'Torrey Pines State Beach', city:'La Jolla', region:'SD', desc:'Dramatic coastal cliffs. Best coastal views in California.', category:'Coastal', rating:4.9, flights:143, lat:32.9174, lng:-117.2545, maxAlt:400, notes:'Glider port nearby. Coordinate with operators before flying.' },
  { id:'18', name:'Mission Bay Park', city:'San Diego', region:'SD', desc:'Large aquatic park with open water and grass areas.', category:'Park', rating:4.7, flights:167, lat:32.7831, lng:-117.2282, maxAlt:400, notes:'San Diego city permit required. No flights over Sea World.' },
  { id:'19', name:'Sunset Cliffs Natural Park', city:'San Diego', region:'SD', desc:'Dramatic ocean cliffs. Most spectacular at golden hour.', category:'Coastal', rating:4.9, flights:89, lat:32.7157, lng:-117.2564, maxAlt:400, notes:'San Diego parks permit required. Avoid crowded sunset hours.' },
  { id:'20', name:'Cabrillo National Monument', city:'Point Loma', region:'SD', desc:'NPS site with panoramic bay and ocean views.', category:'Coastal', rating:4.8, flights:32, lat:32.6735, lng:-117.2425, maxAlt:400, notes:'NPS Section 6 permit required. Apply 2 weeks in advance.' },
  { id:'21', name:'Crissy Field', city:'San Francisco', region:'SF', desc:'National Recreation Area with Golden Gate Bridge views.', category:'Park', rating:4.9, flights:312, lat:37.8036, lng:-122.4681, maxAlt:200, notes:'Max 200ft due to SFO approach paths. NPS permit + LAANC mandatory.' },
  { id:'22', name:'Cesar Chavez Park', city:'Berkeley', region:'SF', desc:'Waterfront park with bay views. Drone-friendly park.', category:'Park', rating:4.7, flights:198, lat:37.8731, lng:-122.3187, maxAlt:400, notes:'Berkeley city permit required. Check LAANC for OAK proximity.' },
  { id:'23', name:'Shoreline Park', city:'Mountain View', region:'SF', desc:'Open park with lagoon views. Approved in open areas.', category:'Park', rating:4.6, flights:134, lat:37.4210, lng:-122.0821, maxAlt:400, notes:'Mountain View permit required. Avoid Moffett Federal Airfield airspace.' },
  { id:'24', name:'Point Reyes National Seashore', city:'Point Reyes', region:'SF', desc:'Remote NPS coastal area with lighthouse and dramatic scenery.', category:'Coastal', rating:4.9, flights:28, lat:38.0449, lng:-122.7996, maxAlt:400, notes:'NPS Section 6 permit required. Apply 30 days in advance.' },
  { id:'25', name:'Alviso Marina County Park', city:'San Jose', region:'SF', desc:'Wetlands and open water. Approved in designated open zones.', category:'Park', rating:4.5, flights:67, lat:37.4271, lng:-121.9776, maxAlt:400, notes:'Santa Clara County permit required. No flights over wetlands.' },
  { id:'26', name:'Folsom Lake SRA', city:'Folsom', region:'CV', desc:'Large reservoir with open water and shoreline.', category:'Park', rating:4.7, flights:89, lat:38.7196, lng:-121.1322, maxAlt:400, notes:'CA State Parks permit required for commercial operations.' },
  { id:'27', name:'Lake Natoma', city:'Rancho Cordova', region:'CV', desc:'Calm lake with open shoreline for recreational photography.', category:'Park', rating:4.6, flights:54, lat:38.6396, lng:-121.2108, maxAlt:400, notes:'Folsom Lake SRA permit applies. No flights during water events.' },
  { id:'28', name:'Lake Perris SRA', city:'Perris', region:'IE', desc:'Inland lake with open shores and hills.', category:'Park', rating:4.6, flights:76, lat:33.8535, lng:-117.1758, maxAlt:400, notes:'CA State Parks permit required. No flights over swimming areas.' },
  { id:'29', name:'Joshua Tree Open Desert', city:'Joshua Tree', region:'IE', desc:'Open desert areas outside National Park boundaries.', category:'Desert', rating:4.8, flights:64, lat:34.1350, lng:-116.3108, maxAlt:400, notes:'National Park boundary strictly enforced. BLM areas only.' },
  { id:'30', name:'Salton Sea SRA', city:'Mecca', region:'IE', desc:'Unique inland sea with vast open spaces.', category:'Desert', rating:4.5, flights:43, lat:33.5136, lng:-115.9118, maxAlt:400, notes:'No flights over wildlife refuge. Verify TFRs near military routes.' },
  { id:'31', name:'Pismo Beach', city:'Pismo Beach', region:'CC', desc:'Famous beach and sand dunes with ocean views.', category:'Coastal', rating:4.7, flights:98, lat:35.1428, lng:-120.6415, maxAlt:400, notes:'Pismo Beach city permit required.' },
  { id:'32', name:'Morro Bay State Park', city:'Morro Bay', region:'CC', desc:'Iconic bay with Morro Rock. Dramatic coastal scenery.', category:'Coastal', rating:4.8, flights:87, lat:35.3658, lng:-120.8530, maxAlt:400, notes:'CA State Parks permit required. Morro Rock TFR may apply.' },
  { id:'33', name:'Andrew Molera State Park', city:'Big Sur', region:'CC', desc:'Most spectacular coastal aerial photography in California.', category:'Coastal', rating:5.0, flights:45, lat:36.2832, lng:-121.8417, maxAlt:400, notes:'CA State Parks permit required. Condor habitat zone.' },
  { id:'34', name:'Carmel Beach', city:'Carmel', region:'CC', desc:'Pristine white sand beach with Pebble Beach views.', category:'Coastal', rating:4.9, flights:67, lat:36.5530, lng:-121.9233, maxAlt:400, notes:'Carmel city permit required. No flights during tournaments.' },
  { id:'35', name:'Lake Tahoe - Kings Beach', city:'Kings Beach', region:'NC', desc:'Crystal clear mountain lake with alpine views.', category:'Coastal', rating:4.9, flights:112, lat:39.2380, lng:-120.0240, maxAlt:400, notes:'Placer County permit required in summer.' },
  { id:'36', name:'Mount Shasta Open Areas', city:'Mount Shasta', region:'NC', desc:'Spectacular volcanic peak vistas. Open BLM areas only.', category:'Desert', rating:4.8, flights:38, lat:41.4099, lng:-122.1949, maxAlt:400, notes:'Wilderness areas prohibited. BLM open areas only. Check for fire TFRs.' },
];

const RESTRICTED = [
  { name:'LAX', lat:33.9425, lng:-118.4081, radiusKm:8, reason:'Class B Airspace' },
  { name:'SFO', lat:37.6213, lng:-122.3790, radiusKm:8, reason:'Class B Airspace' },
  { name:'SAN', lat:32.7338, lng:-117.1933, radiusKm:8, reason:'Class B Airspace' },
  { name:'OAK', lat:37.7213, lng:-122.2208, radiusKm:8, reason:'Class B Airspace' },
  { name:'SJC', lat:37.3626, lng:-121.9290, radiusKm:6, reason:'Class C Airspace' },
  { name:'BUR', lat:34.2007, lng:-118.3590, radiusKm:5, reason:'Class C Airspace' },
  { name:'SMO', lat:34.0158, lng:-118.4514, radiusKm:4, reason:'Class D Airspace' },
  { name:'TOA', lat:33.8034, lng:-118.3396, radiusKm:4, reason:'Class D Airspace' },
  { name:'Joshua Tree NP', lat:33.8734, lng:-115.9010, radiusKm:20, reason:'National Park - No Drones' },
  { name:'Yosemite NP', lat:37.8651, lng:-119.5383, radiusKm:25, reason:'National Park - No Drones' },
  { name:'Camp Pendleton', lat:33.3750, lng:-117.3573, radiusKm:12, reason:'Military Airspace' },
  { name:'Vandenberg SFB', lat:34.7370, lng:-120.5674, radiusKm:15, reason:'Military Airspace' },
  { name:'Edwards AFB', lat:34.9054, lng:-117.8836, radiusKm:15, reason:'Military Airspace' },
];

const CAT_COLORS = { Park:'#10b981', Coastal:'#06b6d4', Desert:'#f59e0b' };
const REGIONS = { All:'All California', LA:'Los Angeles', OC:'Orange County', SD:'San Diego', SF:'Bay Area', CV:'Central Valley', IE:'Inland Empire', NC:'Northern CA', CC:'Central Coast' };

export default function ZonesPage() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [region, setRegion] = useState('All');
  const [loaded, setLoaded] = useState(false);
  const [showRestricted, setShowRestricted] = useState(true);

  const filtered = CA_ZONES.filter(z =>
    (cat === 'All' || z.category === cat) &&
    (region === 'All' || z.region === region) &&
    (z.name.toLowerCase().includes(search.toLowerCase()) || z.city.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    if (mapInstance.current) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js';
    script.onload = () => {
      const mgl = (window as any).mapboxgl;
      mgl.accessToken = MAPBOX_TOKEN;
      const map = new mgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-119.5, 37.0],
        zoom: 5.5,
      });
      mapInstance.current = map;
      map.on('load', () => {
        setLoaded(true);
        map.addControl(new mgl.NavigationControl(), 'top-right');
        const POLY = {'1':[[-118.315,34.105],[-118.290,34.105],[-118.290,34.130],[-118.315,34.130],[-118.315,34.105]],'2':[[-118.515,34.008],[-118.470,34.008],[-118.470,34.020],[-118.515,34.020],[-118.515,34.008]],'3':[[-118.030,33.640],[-117.970,33.640],[-117.970,33.675],[-118.030,33.675],[-118.030,33.640]],'4':[[-118.460,33.915],[-118.420,33.915],[-118.420,33.950],[-118.460,33.950],[-118.460,33.915]],'5':[[-118.700,34.025],[-118.660,34.025],[-118.660,34.045],[-118.700,34.045],[-118.700,34.025]],'6':[[-118.905,34.020],[-118.860,34.020],[-118.860,34.038],[-118.905,34.038],[-118.905,34.020]],'7':[[-118.370,33.785],[-118.330,33.785],[-118.330,33.810],[-118.370,33.810],[-118.370,33.785]],'8':[[-118.375,33.990],[-118.340,33.990],[-118.340,34.015],[-118.375,34.015],[-118.375,33.990]],'9':[[-118.960,34.035],[-118.915,34.035],[-118.915,34.055],[-118.960,34.055],[-118.960,34.035]],'10':[[-118.260,34.070],[-118.220,34.070],[-118.220,34.095],[-118.260,34.095],[-118.260,34.070]],'11':[[-117.860,33.545],[-117.805,33.545],[-117.805,33.585],[-117.860,33.585],[-117.860,33.545]],'12':[[-118.100,33.700],[-118.020,33.700],[-118.020,33.740],[-118.100,33.740],[-118.100,33.700]],'13':[[-117.800,33.500],[-117.720,33.500],[-117.720,33.540],[-117.800,33.540],[-117.800,33.500]],'14':[[-117.730,33.445],[-117.665,33.445],[-117.665,33.480],[-117.730,33.480],[-117.730,33.445]],'15':[[-117.810,33.770],[-117.730,33.770],[-117.730,33.815],[-117.810,33.815],[-117.810,33.770]],'16':[[-117.175,32.715],[-117.125,32.715],[-117.125,32.755],[-117.175,32.755],[-117.175,32.715]],'17':[[-117.280,32.895],[-117.230,32.895],[-117.230,32.940],[-117.280,32.940],[-117.280,32.895]],'18':[[-117.260,32.760],[-117.195,32.760],[-117.195,32.810],[-117.260,32.810],[-117.260,32.760]],'19':[[-117.280,32.700],[-117.230,32.700],[-117.230,32.735],[-117.280,32.735],[-117.280,32.700]],'20':[[-117.270,32.655],[-117.220,32.655],[-117.220,32.695],[-117.270,32.695],[-117.270,32.655]],'21':[[-122.485,37.795],[-122.450,37.795],[-122.450,37.810],[-122.485,37.810],[-122.485,37.795]],'22':[[-122.340,37.860],[-122.295,37.860],[-122.295,37.885],[-122.340,37.885],[-122.340,37.860]],'23':[[-122.100,37.405],[-122.060,37.405],[-122.060,37.440],[-122.100,37.440],[-122.100,37.405]],'24':[[-123.050,37.995],[-122.950,37.995],[-122.950,38.095],[-123.050,38.095],[-123.050,37.995]],'25':[[-122.010,37.405],[-121.950,37.405],[-121.950,37.455],[-122.010,37.455],[-122.010,37.405]],'26':[[-121.200,38.690],[-121.070,38.690],[-121.070,38.760],[-121.200,38.760],[-121.200,38.690]],'27':[[-121.240,38.610],[-121.180,38.610],[-121.180,38.660],[-121.240,38.660],[-121.240,38.610]],'28':[[-117.220,33.820],[-117.130,33.820],[-117.130,33.885],[-117.220,33.885],[-117.220,33.820]],'29':[[-116.450,34.070],[-116.170,34.070],[-116.170,34.200],[-116.450,34.200],[-116.450,34.070]],'30':[[-116.150,33.400],[-115.650,33.400],[-115.650,33.650],[-116.150,33.650],[-116.150,33.400]],'31':[[-120.720,35.100],[-120.580,35.100],[-120.580,35.185],[-120.720,35.185],[-120.720,35.100]],'32':[[-120.920,35.325],[-120.800,35.325],[-120.800,35.410],[-120.920,35.410],[-120.920,35.325]],'33':[[-122.000,36.220],[-121.700,36.220],[-121.700,36.350],[-122.000,36.350],[-122.000,36.220]],'34':[[-121.970,36.520],[-121.890,36.520],[-121.890,36.580],[-121.970,36.580],[-121.970,36.520]],'35':[[-120.100,39.190],[-119.950,39.190],[-119.950,39.290],[-120.100,39.290],[-120.100,39.190]],'36':[[-122.350,41.350],[-122.050,41.350],[-122.050,41.470],[-122.350,41.470],[-122.350,41.350]]};
        const CC = { Park:'#10b981', Coastal:'#06b6d4', Desert:'#f59e0b' };
        CA_ZONES.forEach(z => {
          const p = POLY[z.id]; if(!p) return;
          const col = CC[z.category]||'#6366f1';
          map.addSource('zp'+z.id,{type:'geojson',data:{type:'Feature',geometry:{type:'Polygon',coordinates:[p]}}});
          map.addLayer({id:'zf'+z.id,type:'fill',source:'zp'+z.id,paint:{'fill-color':col,'fill-opacity':0.2}});
          map.addLayer({id:'zl'+z.id,type:'line',source:'zp'+z.id,paint:{'line-color':col,'line-width':2.5,'line-dasharray':[4,2]}});
        });


        // FAA Official UAS Facility Maps - real legal airspace data
        map.addSource('faa-uasfm', {
          type: 'raster',
          tiles: ['https://faa-maps.arcgis.com/arcgis/rest/services/NASR/UAS_Facility_Maps/MapServer/tile/{z}/{y}/{x}'],
          tileSize: 256,
          attribution: 'FAA UAS Facility Maps'
        });
        map.addLayer({ id: 'faa-uasfm-layer', type: 'raster', source: 'faa-uasfm', paint: { 'raster-opacity': 0.5 } });

        // FAA Class B/C/D Airspace from official ArcGIS
        map.addSource('faa-class-airspace', {
          type: 'raster',
          tiles: ['https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/Class_Airspace/FeatureServer/0/query?where=1%3D1&outFields=*&f=geojson'],
          tileSize: 256
        });

        // Restricted zone circles
        RESTRICTED.forEach((r, i) => {
          const pts = 64;
          const coords = Array.from({length: pts + 1}, (_, j) => {
            const a = (j / pts) * 2 * Math.PI;
            return [r.lng + (r.radiusKm / (111 * Math.cos(r.lat * Math.PI / 180))) * Math.cos(a),
                    r.lat + (r.radiusKm / 111) * Math.sin(a)];
          });
          map.addSource('res' + i, { type:'geojson', data:{ type:'Feature', geometry:{ type:'Polygon', coordinates:[coords] } } });
          map.addLayer({ id:'resf' + i, type:'fill', source:'res' + i, paint:{ 'fill-color':'#ef4444', 'fill-opacity':0.1 } });
          map.addLayer({ id:'resl' + i, type:'line', source:'res' + i, paint:{ 'line-color':'#ef4444', 'line-width':1.5, 'line-dasharray':[3,2] } });
          new mgl.Popup({ closeButton:false }).setLngLat([r.lng, r.lat]);
        });

        // Approved zone markers
        CA_ZONES.forEach(zone => {
          const color = CAT_COLORS[zone.category] || '#6366f1';
          const el = document.createElement('div');
          el.style.cssText = `width:34px;height:34px;background:${color};border:3px solid #fff;border-radius:50%;box-shadow:0 2px 10px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;`;
          el.innerHTML = zone.category === 'Coastal' ? '🌊' : zone.category === 'Desert' ? '🏜️' : '🌿';
          // Check if zone is near restricted airspace
          const LAANC_REQUIRED_ZONES = ['2','4','7','9','10']; // Near SMO, LAX, TOA
          const needsLAANC = LAANC_REQUIRED_ZONES.includes(zone.id);
          const approvalBadge = needsLAANC
            ? '<span style="font-size:10px;background:#fffbeb;color:#d97706;border:1px solid #fde68a;border-radius:99px;padding:2px 8px;font-weight:700;">⚠️ LAANC Required</span>'
            : '<span style="font-size:10px;background:#ecfdf5;color:#059669;border:1px solid #a7f3d0;border-radius:99px;padding:2px 8px;font-weight:600;">✓ Approved</span>';
          const conflictWarning = needsLAANC
            ? '<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:5px 7px;margin-bottom:6px;"><p style="font-size:10px;color:#92400e;margin:0;font-weight:600;">⚠️ This zone requires LAANC authorization before flying. Use the FAA button below to get instant approval.</p></div>'
            : '';

          const popup = new mgl.Popup({ offset:20, maxWidth:'280px' }).setHTML(`
            <div style="font-family:-apple-system,sans-serif;padding:10px;">
              <span style="font-size:10px;font-weight:700;color:${color};background:${color}20;padding:2px 8px;border-radius:99px;">${zone.category}</span>
              <h3 style="font-weight:800;font-size:14px;color:#1d1d1f;margin:6px 0 2px;">${zone.name}</h3>
              <p style="font-size:11px;color:#6e6e73;margin:0 0 6px;">${zone.city}, CA · Max ${zone.maxAlt}ft AGL · ★${zone.rating}</p>
              <p style="font-size:12px;color:#4a4a4f;line-height:1.5;margin:0 0 8px;">${zone.desc}</p>
              <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:6px 8px;margin-bottom:8px;">
                <p style="font-size:10px;color:#92400e;margin:0;line-height:1.4;">⚖️ ${zone.notes}</p>
              </div>
              \${conflictWarning}
              <a href="https://b4ufly.aloft.ai/?lat=${zone.lat}&lng=${zone.lng}" target="_blank" style="display:block;background:#1d1d1f;color:#fff;text-align:center;padding:7px;border-radius:6px;font-size:11px;font-weight:700;text-decoration:none;margin-bottom:6px;">🛡 Check LAANC Authorization — Official FAA</a>
              <div style="display:flex;gap:4px;">
                \${approvalBadge}
                <span style="font-size:10px;background:#f0f0ff;color:#6366f1;border-radius:99px;padding:2px 8px;font-weight:600;">From $15</span>
              </div>
              <a href="/auth/signup" style="display:block;background:#6366f1;color:#fff;text-align:center;padding:8px;border-radius:6px;font-size:12px;font-weight:700;text-decoration:none;margin-top:8px;">🚁 Book This Zone →</a>
              </div>
            </div>
          `);
          new mgl.Marker({ element: el })
            .setLngLat([zone.lng, zone.lat])
            .setPopup(popup)
            .addTo(map);
          el.addEventListener('click', () => setSelected(zone));
        });
      });
    };
    document.head.appendChild(script);
  }, []);

  const flyTo = (zone) => {
    setSelected(zone);
    if (mapInstance.current) {
      mapInstance.current.flyTo({ center:[zone.lng, zone.lat], zoom:13, duration:1200 });
    }
  };

  return (
    <div style={{ backgroundColor:'#f5f5f7', height:'100vh', display:'flex', flexDirection:'column', fontFamily:'-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', overflow:'hidden' }}>
      <nav style={{ padding:'0 2rem', height:'56px', display:'flex', alignItems:'center', justifyContent:'space-between', backgroundColor:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(0,0,0,0.06)', flexShrink:0, zIndex:200 }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:'0.5rem', textDecoration:'none', color:'#1d1d1f', fontWeight:'800', fontSize:'1rem' }}>🚁 Owletix</Link>
        <div style={{ display:'flex', gap:'1.5rem' }}>
          {[['How it works','/how-it-works'],['For Pilots','/for-pilots'],['Safety','/safety']].map(([l,h]) => (
            <Link key={l} href={h} style={{ color:'#6e6e73', textDecoration:'none', fontSize:'0.85rem', fontWeight:'500' }}>{l}</Link>
          ))}
        </div>
        <div style={{ display:'flex', gap:'0.5rem' }}>
          <Link href="/auth/login" style={{ color:'#1d1d1f', textDecoration:'none', fontSize:'0.85rem', fontWeight:'500', padding:'0.4rem 0.875rem' }}>Sign in</Link>
          <Link href="/auth/signup" style={{ backgroundColor:'#1d1d1f', color:'#fff', textDecoration:'none', fontSize:'0.85rem', fontWeight:'600', padding:'0.4rem 1rem', borderRadius:'980px' }}>Get started</Link>
        </div>
      </nav>

      <div style={{ backgroundColor:'#fffbeb', borderBottom:'1px solid #fde68a', padding:'0.4rem 2rem', flexShrink:0 }}>
        <p style={{ fontSize:'0.72rem', color:'#92400e', fontWeight:'500', margin:0 }}>⚖️ <strong>Legal:</strong> All pilots must hold FAA Part 107 certificate, carry proof of drone insurance, and comply with all FAA regulations (max 400ft AGL, visual line of sight). Local permits may also be required.</p>
      </div>

      <div style={{ flex:1, display:'grid', gridTemplateColumns:'300px 1fr', overflow:'hidden' }}>
        {/* Sidebar */}
        <div style={{ backgroundColor:'#fff', borderRight:'1px solid rgba(0,0,0,0.08)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
          <div style={{ padding:'0.875rem', borderBottom:'1px solid rgba(0,0,0,0.06)', flexShrink:0 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search zones..."
              style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.08)', borderRadius:'980px', padding:'0.55rem 0.875rem', color:'#1d1d1f', fontSize:'0.8rem', outline:'none', boxSizing:'border-box' as const, marginBottom:'0.5rem' }} />
            <select value={region} onChange={e => setRegion(e.target.value)} style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.08)', borderRadius:'0.5rem', padding:'0.45rem 0.75rem', color:'#1d1d1f', fontSize:'0.78rem', outline:'none', marginBottom:'0.5rem', fontFamily:'inherit' }}>
              {Object.entries(REGIONS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <div style={{ display:'flex', gap:'0.25rem', flexWrap:'wrap' }}>
              {['All','Park','Coastal','Desert'].map(c => (
                <button key={c} onClick={() => setCat(c)} style={{ backgroundColor:cat===c?'#1d1d1f':'#f5f5f7', color:cat===c?'#fff':'#6e6e73', border:'none', borderRadius:'980px', padding:'0.3rem 0.7rem', fontSize:'0.72rem', fontWeight:'500', cursor:'pointer' }}>{c}</button>
              ))}
              <button onClick={() => setShowRestricted(!showRestricted)} style={{ backgroundColor:showRestricted?'#fff2f2':'#f5f5f7', color:showRestricted?'#dc2626':'#6e6e73', border:'none', borderRadius:'980px', padding:'0.3rem 0.7rem', fontSize:'0.72rem', fontWeight:'500', cursor:'pointer' }}>🚫 Restricted</button>
            </div>
            <p style={{ fontSize:'0.68rem', color:'#6e6e73', margin:'0.4rem 0 0', fontWeight:'500' }}>{filtered.length} approved zones</p>
          </div>

          <div style={{ overflowY:'auto', flex:1, padding:'0.5rem' }}>
            {filtered.map(zone => {
              const color = CAT_COLORS[zone.category] || '#6366f1';
              return (
                <div key={zone.id} onClick={() => flyTo(zone)} style={{ backgroundColor:selected?.id===zone.id?'#f0f0ff':'transparent', border:'1px solid '+(selected?.id===zone.id?'#c7d2fe':'transparent'), borderRadius:'0.625rem', padding:'0.75rem', cursor:'pointer', marginBottom:'0.25rem', transition:'all 0.15s' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.2rem' }}>
                    <span style={{ fontSize:'0.6rem', fontWeight:'700', color, backgroundColor:color+'18', padding:'0.1rem 0.4rem', borderRadius:'980px' }}>{zone.category}</span>
                    <span style={{ fontSize:'0.65rem', color:'#f59e0b', fontWeight:'600' }}>★{zone.rating}</span>
                  </div>
                  <p style={{ fontWeight:'700', fontSize:'0.82rem', color:'#1d1d1f', margin:'0 0 0.1rem' }}>{zone.name}</p>
                  <p style={{ fontSize:'0.68rem', color:'#6e6e73', margin:'0 0 0.3rem' }}>{zone.city} · {zone.maxAlt}ft max</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:'0.62rem', color:'#6e6e73' }}>{zone.flights} flights</span>
                    <Link href="/auth/signup" onClick={e => e.stopPropagation()} style={{ fontSize:'0.65rem', color:'#6366f1', fontWeight:'700', textDecoration:'none', backgroundColor:'#f0f0ff', padding:'0.15rem 0.5rem', borderRadius:'980px' }}>Book $15+</Link>
                  </div>
                </div>
              );
            })}

            {showRestricted && (
              <div style={{ marginTop:'0.75rem', paddingTop:'0.625rem', borderTop:'1px solid rgba(0,0,0,0.06)' }}>
                <p style={{ fontSize:'0.62rem', fontWeight:'700', color:'#dc2626', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.375rem' }}>🚫 Restricted Airspace</p>
                {RESTRICTED.map(r => (
                  <div key={r.name} style={{ backgroundColor:'#fff2f2', borderRadius:'0.5rem', padding:'0.45rem 0.625rem', marginBottom:'0.25rem', border:'1px solid #fecaca' }}>
                    <p style={{ fontSize:'0.7rem', fontWeight:'700', color:'#dc2626', margin:'0 0 0.1rem' }}>{r.name}</p>
                    <p style={{ fontSize:'0.62rem', color:'#9b1c1c', margin:0 }}>{r.reason} · {r.radiusKm}km no-fly radius</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div style={{ position:'relative' }}>
          <div ref={mapRef} style={{ width:'100%', height:'100%' }} />
          {!loaded && (
            <div style={{ position:'absolute', inset:0, backgroundColor:'#f5f5f7', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'1rem' }}>
              <span style={{ fontSize:'3rem' }}>🚁</span>
              <p style={{ color:'#6e6e73', fontSize:'0.9rem', fontWeight:'500' }}>Loading California flight zones...</p>
            </div>
          )}
          {/* Legend */}
          <div style={{ position:'absolute', bottom:'1.5rem', left:'1rem', backgroundColor:'rgba(255,255,255,0.96)', borderRadius:'0.75rem', padding:'0.75rem 1rem', border:'1px solid rgba(0,0,0,0.08)', boxShadow:'0 2px 12px rgba(0,0,0,0.08)' }}>
            <p style={{ fontSize:'0.62rem', fontWeight:'700', color:'#1d1d1f', marginBottom:'0.4rem', textTransform:'uppercase', letterSpacing:'0.06em' }}>Legend</p>
            {[['🌿 Park Zone','#10b981'],['🌊 Coastal Zone','#06b6d4'],['🏜️ Desert Zone','#f59e0b']].map(([l,c]) => (
              <div key={l} style={{ display:'flex', alignItems:'center', gap:'0.4rem', marginBottom:'0.25rem' }}>
                <div style={{ width:'9px', height:'9px', borderRadius:'50%', backgroundColor:c, border:'2px solid #fff', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}></div>
                <span style={{ fontSize:'0.68rem', color:'#6e6e73', fontWeight:'500' }}>{l}</span>
              </div>
            ))}
            <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', marginTop:'0.25rem', paddingTop:'0.3rem', borderTop:'1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ width:'9px', height:'9px', borderRadius:'50%', backgroundColor:'#ef4444', border:'2px solid #fff' }}></div>
              <span style={{ fontSize:'0.68rem', color:'#dc2626', fontWeight:'500' }}>Restricted Airspace</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
