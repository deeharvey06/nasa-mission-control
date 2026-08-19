const HistoryTableHeader = ({ tableHeader }) => (
  <thead>
    <tr>
      {tableHeader.map(({ label, width }, index) => (
        <th key={`${label}-${index}`} style={{ width: width }}>
          {label}
        </th>
      ))}
    </tr>
  </thead>
);

export default HistoryTableHeader;
