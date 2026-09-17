import { useMemo, useState } from 'react';

const Launch = ({ planets = [], submitLaunch, isPendingLaunch }) => {
  const today = new Date().toISOString().split('T')[0];
  const [target, setTarget] = useState('');
  const selected = useMemo(() => planets.find(p => p.kepler_name === target) || planets[0], [planets, target]);
  const destination = target || selected?.kepler_name || '';
  return (
    <section className="page">
      <div className="page-heading">
        <div><p className="eyebrow">OPERATIONS / MISSION PLANNING</p><h1>Configure a new mission</h1><p>Schedule an interstellar research mission to a validated Kepler exoplanet.</p></div>
        <div className="online-badge"><span className="status-dot"></span>MISSION CONTROL · ONLINE</div>
      </div>
      <div className="mission-grid">
        <div className="panel form-panel">
          <div className="panel-title"><span>01</span><div><h2>Mission configuration</h2><p>Define launch parameters and destination.</p></div></div>
          <form onSubmit={submitLaunch} className="mission-form">
            <label><span>MISSION NAME</span><input name="mission-name" required placeholder="e.g. Kepler Pathfinder" /></label>
            <div className="field-row">
              <label><span>LAUNCH DATE</span><input type="date" name="launch-day" min={today} max="2040-12-31" defaultValue={today} required /></label>
              <label><span>LAUNCH VEHICLE</span><input name="rocket-name" required placeholder="Explorer IS1" /></label>
            </div>
            <label><span>DESTINATION</span><select name="planets-selector" value={destination} onChange={e => setTarget(e.target.value)}>{planets.map(p => <option value={p.kepler_name} key={p.kepid}>{p.kepler_name}</option>)}</select></label>
            <div className="form-actions"><p>Mission will be added to the active operations queue.</p><button className="primary-button" disabled={isPendingLaunch}>{isPendingLaunch ? 'SCHEDULING…' : 'SCHEDULE MISSION'} <span>→</span></button></div>
          </form>
        </div>
        <aside className="panel brief-panel">
          <div className="panel-title"><span>02</span><div><h2>Mission brief</h2><p>Destination eligibility telemetry.</p></div></div>
          {selected ? <>
            <div className="planet-visual"><div className="orbit"><div className="planet"></div></div><p>SELECTED TARGET</p><h3>{selected.kepler_name}</h3><span className="eligible">● ELIGIBLE</span></div>
            <div className="telemetry"><div><span>PLANET RADIUS</span><strong>{selected.koi_prad ?? '—'} <small>R⊕</small></strong></div><div><span>STELLAR FLUX</span><strong>{selected.koi_insol ?? '—'} <small>S⊕</small></strong></div></div>
          </> : <div className="empty-mini">Awaiting destination telemetry…</div>}
        </aside>
      </div>
      <div className="panel parameters"><div><p className="eyebrow">MISSION PARAMETERS</p><h2>Habitable-world screening criteria</h2></div><div className="parameter"><b>01</b><span>Planet radius</span><strong>&lt; 1.6 × Earth</strong></div><div className="parameter"><b>02</b><span>Stellar flux</span><strong>0.36–1.11 × Earth</strong></div><div className="parameter ok"><b>✓</b><span>Catalog</span><strong>Confirmed Kepler</strong></div></div>
    </section>
  );
};
export default Launch;
