import { Table } from 'arwes';

import UpcomingTableHeader from './components/UpcomingTableHeader';
import UpcomingTableBody from './components/UpcomingTableBody';

const UpcomingTable = ({ entered, launches, classes, abortLaunch }) => {
  const tableHeader = [
    { label: '', width: '3rem' },
    { label: 'No.', width: '3rem' },
    { label: 'Date', width: '10rem' },
    { label: 'Mission', width: '11rem' },
    { label: 'Rocket', width: '11rem' },
    { label: 'Destination', width: '' },
  ];

  return (
    <Table animate>
      <table style={{ tableLayout: 'fixed' }}>
        <UpcomingTableHeader tableHeader={tableHeader} />

        <UpcomingTableBody
          entered={entered}
          launches={launches}
          classes={classes}
          abortLaunch={abortLaunch}
        />
      </table>
    </Table>
  );
};

export default UpcomingTable;
