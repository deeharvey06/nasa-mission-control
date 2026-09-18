import { Link } from 'react-router-dom';

const History = ({ launches = [] }) => {
  const missions = launches.filter((l) => !l.upcoming);
  const vehicles = new Set(missions.map((m) => m.rocket)).size;
  const destinations = new Set(missions.map((m) => m.target).filter(Boolean))
    .size;

  return (
    <section className='page'>
      <div className='page-heading'>
        <div>
          <p className='eyebrow'>OPERATIONS / MISSION ARCHIVE</p>
          <h1>Mission history</h1>
          <p>Historical record of completed and archived flight operations.</p>
        </div>
        <div className='archive-mark'>ARCHIVE / {new Date().getFullYear()}</div>
      </div>
      <div className='metrics metrics-three'>
        <div>
          <span>TOTAL MISSIONS</span>
          <strong>{missions.length}</strong>
          <small>archived records</small>
        </div>
        <div>
          <span>VEHICLES</span>
          <strong>{vehicles}</strong>
          <small>vehicle types</small>
        </div>
        <div>
          <span>DESTINATIONS</span>
          <strong>{destinations}</strong>
          <small>recorded targets</small>
        </div>
      </div>
      <div className='panel table-panel'>
        <div className='table-heading'>
          <div>
            <h2>Flight archive</h2>
            <p>Completed mission lifecycle records.</p>
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
                  <th>LAUNCH DATE</th>
                  <th>VEHICLE</th>
                  <th>DESTINATION / CUSTOMER</th>
                  <th>STATUS</th>
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
                      {new Date(m.launchDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td>{m.rocket}</td>
                    <td>
                      {m.target ||
                        (Array.isArray(m.customers)
                          ? m.customers.join(', ')
                          : m.customers) ||
                        '—'}
                    </td>
                    <td>
                      <span className='archive-badge'>ARCHIVED</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='empty-state'>
            <div className='empty-orbit'>◎</div>
            <p className='eyebrow'>MISSION ARCHIVE EMPTY</p>
            <h3>No completed missions yet</h3>
            <p>
              Completed missions will appear here after their mission lifecycle
              has finished.
            </p>
            <Link className='primary-button link-button' to='/launch'>
              SCHEDULE MISSION <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
export default History;
