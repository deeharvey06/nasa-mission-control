import { Appear } from 'arwes';

import LaunchParagraphs from './components/LaunchParagraphs';
import LaunchList from './components/LaunchList';
import LaunchForm from './components/LaunchForm';

const Launch = ({ planets, entered, submitLaunch, isPendingLaunch }) => {
  const launchParagraphs = [
    ' Schedule a mission launch for interstellar travel to one of the Kepler Exoplanets.',
    'Only confirmed planets matching the following criteria are available for the earliest scheduled missions:',
  ];

  const launchList = [
    "Planetary radius < 1.6 times Earth's radius",
    "Effective stellar flux > 0.36 times Earth's value and < 1.11 times Earth's value",
  ];

  console.log('Launch.js: planets', planets);

  return (
    <Appear id='launch' animate show={entered}>
      <LaunchParagraphs launchParagraphs={launchParagraphs} />
      <LaunchList launchList={launchList} />
      <LaunchForm
        planets={planets}
        submitLaunch={submitLaunch}
        entered={entered}
        isPendingLaunch={isPendingLaunch}
      />
    </Appear>
  );
};

export default Launch;
