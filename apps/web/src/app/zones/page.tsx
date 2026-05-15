export default function ZonesPage() {
  return (
    <main >
      <div >
        <h1 >Public Zones</h1>
        <p >Browse approved locations for aerial viewing sessions.</p>
        <div >
          {['Griffith Park, LA', 'Santa Monica Pier, LA', 'Golden Gate Park, SF', 'Central Park, NYC'].map(zone => (
            <div key={zone} >
              <h3 >{zone}</h3>
              <p >Approved public zone for aerial viewing</p>
              <a href="/auth/signup" >
                Request Live View
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
