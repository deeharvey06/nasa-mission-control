import { Appear } from 'arwes';

import HistoryParagraph from './components/HistoryParagraph';
import HistoryTable from './components/HistoryTable';

const History = ({ launches, entered }) => {
  const paragraph =
    'History of mission launches including SpaceX launches starting from the year 2006.';

  return (
    <article id='history'>
      <Appear animate show={entered}>
        <HistoryParagraph paragraph={paragraph} />

        <HistoryTable launches={launches} />
      </Appear>
    </article>
  );
};

export default History;
