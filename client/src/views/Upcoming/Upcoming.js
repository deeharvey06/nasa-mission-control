import { withStyles, Appear } from 'arwes';

import UpcomingText from './components/UpcomingText';
import UpcomingTable from './components/UpcomingTable';

import { styles } from './styles';

const Upcoming = ({ entered, launches, classes, abortLaunch }) => {
  return (
    <Appear id='upcoming' animate show={entered}>
      <UpcomingText />
      <UpcomingTable
        entered={entered}
        launches={launches}
        classes={classes}
        abortLaunch={abortLaunch}
      />
    </Appear>
  );
};

export default withStyles(styles)(Upcoming);
