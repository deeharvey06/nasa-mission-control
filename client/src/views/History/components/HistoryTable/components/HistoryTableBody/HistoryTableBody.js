import { useMemo } from 'react';

import HistoryTableBodyItems from '../HistoryTableBodyItems';

const HistoryTableBody = ({ launches }) => {
  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => !launch.upcoming)
      .map((launch) => (
        <HistoryTableBodyItems
          key={String(launch.flightNumber)}
          launch={launch}
        />
      ));
  }, [launches]);

  return <tbody>{tableBody}</tbody>;
};

export default HistoryTableBody;
