import { useState } from 'react';

const Upcoming = ({ launches = [], abortLaunch }) => {
  const missions = launches.filter((l) => l.upcoming);

  const [confirm, setConfirm] = useState(null);

  const next = [...missions].sort(
    (a, b) => new Date(a.launchDate) - new Date(b.launchDate),
  )[0];

  const destinations = new Set(missions.map((m) => m.target)).size;
  const rockets = new Set(missions.map((m) => m.rocket)).size;

  return (
    <section className='page'>
      <div className='page-heading'>
        <div>
          <p className='eyebrow'>OPERATIONS / MISSION QUEUE</p>
          <h1>Upcoming missions</h1>
          <p>
            Monitor scheduled launches and manage the active mission manifest.
          </p>
        </div>
        <div className='online-badge'>
          <span className='status-dot'></span>QUEUE ACTIVE
        </div>
      </div>
      <div className='metrics'>
        <div>
          <span>SCHEDULED</span>
          <strong>{missions.length}</strong>
          <small>active missions</small>
        </div>
        <div>
          <span>NEXT LAUNCH</span>
          <strong className='metric-date'>
            {next
              ? new Date(next.launchDate).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })
              : '—'}
          </strong>
          <small>{next?.mission || 'No launch scheduled'}</small>
        </div>
        <div>
          <span>DESTINATIONS</span>
          <strong>{destinations}</strong>
          <small>unique targets</small>
        </div>
        <div>
          <span>VEHICLES</span>
          <strong>{rockets}</strong>
          <small>rocket types</small>
        </div>
      </div>
      <div className='panel table-panel'>
        <div className='table-heading'>
          <div>
            <h2>Active manifest</h2>
            <p>Scheduled missions awaiting launch.</p>
          </div>
          <span>
            {missions.length} RECORD{missions.length === 1 ? '' : 'S'}
          </span>
        </div>
        {missions.length ? (
          <div className='table-scroll'>
            <table className='data-table'>
              <thead>
                <tr>
                  <th>FLIGHT</th>
                  <th>MISSION</th>
                  <th>STATUS</th>
                  <th>LAUNCH DATE</th>
                  <th>VEHICLE</th>
                  <th>DESTINATION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {missions.map((m) => (
                  <tr key={m.flightNumber}>
                    <td className='mono'>#{m.flightNumber}</td>
                    <td>
                      <strong>{m.mission}</strong>
                    </td>
                    <td>
                      <span className='status-badge'>● SCHEDULED</span>
                    </td>
                    <td>
                      {new Date(m.launchDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td>{m.rocket}</td>
                    <td>{m.target}</td>
                    <td>
                      <button
                        className='danger-link'
                        onClick={() => setConfirm(m)}
                      >
                        Abort
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty />
        )}
      </div>

      {confirm && (
        <div
          className='modal-backdrop'
          role='presentation'
          onMouseDown={() => setConfirm(null)}
        >
          <div
            className='modal'
            role='dialog'
            aria-modal='true'
            aria-labelledby='abort-title'
            onMouseDown={(e) => e.stopPropagation()}
          >
            <span className='danger-icon'>!</span>
            <p className='eyebrow'>DESTRUCTIVE ACTION</p>
            <h2 id='abort-title'>Abort mission?</h2>
            <p>
              You are about to abort <strong>{confirm.mission}</strong>. This
              action cannot be undone.
            </p>
            <div>
              <button
                className='secondary-button'
                onClick={() => setConfirm(null)}
              >
                Cancel
              </button>
              <button
                className='danger-button'
                onClick={() => {
                  abortLaunch(confirm.flightNumber);
                  setConfirm(null);
                }}
              >
                Abort Mission
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Empty = () => (
  <div className='empty-state'>
    <div className='empty-orbit'>◌</div>
    <h3>No missions in queue</h3>
    <p>Scheduled missions will appear here when they are created.</p>
  </div>
);

export default Upcoming;
