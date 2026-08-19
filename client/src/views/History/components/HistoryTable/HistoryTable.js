import { Table } from 'arwes';

import HistoryTableHeader from './components/HistoryTableHeader';
import HistoryTableBody from './components/HistoryTableBody';

const HistoryTable = ({ launches }) => {
  const tableHeader = [
    { label: '', width: '2rem' },
    { label: 'No.', width: '3rem' },
    { label: 'Date', width: '9rem' },
    { label: 'Mission', width: '' },
    { label: 'Rocket', width: '7rem' },
    { label: 'Customers', width: '' },
  ];

  return (
    <Table animate>
      <table style={{ tableLayout: 'fixed' }}>
        <HistoryTableHeader tableHeader={tableHeader} />
        <HistoryTableBody launches={launches} />
      </table>
    </Table>
  );
};

export default HistoryTable;
