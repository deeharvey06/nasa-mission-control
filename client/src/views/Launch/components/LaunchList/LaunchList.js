const LaunchList = ({ launchList }) => (
  <ul>
    {launchList?.map((item, index) => (
      <li key={`${item[0]}-${index}`}>{item}</li>
    ))}
  </ul>
);

export default LaunchList;
