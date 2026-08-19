const HistoryTableBodyItems = ({ launch }) => (
  <tr>
    <td>
      <span style={{ color: launch.success ? 'greenyellow' : 'red' }}>█</span>
    </td>
    <td>{launch.flightNumber}</td>
    <td>{new Date(launch.launchDate).toDateString()}</td>
    <td>{launch.mission}</td>
    <td>{launch.rocket}</td>
    <td>{launch.customers?.join(', ')}</td>
  </tr>
);

export default HistoryTableBodyItems;
