export default function Home() {
  return (
    <main >
      <div >
        <div >
          <span >🦉</span>
        </div>
        <h1 >
          Owletix
        </h1>
        <p >
          Lawful Live Aerial Visibility Marketplace
        </p>
        <p >
          Connect with verified drone pilots for live aerial views of approved public spaces and authorized properties. Safe, lawful, transparent.
        </p>
        <div >
          {[
            { icon: '✅', title: 'Verified Pilots', desc: 'FAA Part 107 certified pilots only' },
            { icon: '🔒', title: 'Lawful Only', desc: 'Approved public zones and authorized properties' },
            { icon: '📡', title: 'Live Streaming', desc: 'Real-time aerial views via secure stream' },
          ].map((f) => (
            <div key={f.title} >
              <div >{f.icon}</div>
              <h3 >{f.title}</h3>
              <p >{f.desc}</p>
            </div>
          ))}
        </div>
        <div >
          <a href="/auth/signup" >
            Get Started
          </a>
          <a href="/auth/login" >
            Sign In
          </a>
          <a href="/zones" >
            Browse Zones
          </a>
        </div>
        <div >
          ⚠️ Owletix is strictly for lawful aerial visibility only. Surveillance, tracking, or any illegal use is prohibited and will result in immediate account termination.
        </div>
      </div>
    </main>
  );
}
