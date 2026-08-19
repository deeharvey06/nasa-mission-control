import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Clickable from '../../../../../../components/Clickable';

const UpcomingTableBody = ({ entered, launches, classes, abortLaunch }) => {
  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => launch.upcoming)
      .map((launch) => {
        return (
          <tr key={String(launch.flightNumber)}>
            <td>
              <Clickable style={{ color: 'red' }}>
                <Link
                  className={classes.link}
                  onClick={() => abortLaunch(launch.flightNumber)}
                >
                  ✖
                </Link>
              </Clickable>
            </td>
            <td>{launch.flightNumber}</td>
            <td>{new Date(launch.launchDate).toDateString()}</td>
            <td>{launch.mission}</td>
            <td>{launch.rocket}</td>
            <td>{launch.target}</td>
          </tr>
        );
      });
  }, [launches, abortLaunch, classes.link]);

  return <tbody>{tableBody}</tbody>;
};

export default UpcomingTableBody;
