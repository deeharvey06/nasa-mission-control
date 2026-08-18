import { Switch, Route } from 'react-router-dom';
import { Frame, withSounds, withStyles } from 'arwes';

import Centered from '../../components/Centered';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

import Launch from '../Launch';
import History from '../History';
import Upcoming from '../Upcoming';

import useAppLayout from './hooks/useAppLayout';

import { styles } from './styles.js';

const AppLayout = ({ sounds, classes }) => {
  const {
    frameVisible,
    animateFrame,
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
    planets,
  } = useAppLayout(sounds);

  return (
    <div className={classes.content}>
      <Header onNav={animateFrame} />
      <Centered className={classes.centered}>
        <Frame
          animate
          show={frameVisible}
          corners={4}
          style={{ visibility: frameVisible ? 'visible' : 'hidden' }}
        >
          {(anim) => (
            <div style={{ padding: '20px' }}>
              <Switch>
                <Route exact path='/'>
                  <Launch
                    entered={anim.entered}
                    planets={planets}
                    submitLaunch={submitLaunch}
                    isPendingLaunch={isPendingLaunch}
                  />
                </Route>
                <Route exact path='/launch'>
                  <Launch
                    entered={anim.entered}
                    planets={planets}
                    submitLaunch={submitLaunch}
                    isPendingLaunch={isPendingLaunch}
                  />
                </Route>
                <Route exact path='/upcoming'>
                  <Upcoming
                    entered={anim.entered}
                    launches={launches}
                    abortLaunch={abortLaunch}
                  />
                </Route>
                <Route exact path='/history'>
                  <History entered={anim.entered} launches={launches} />
                </Route>
              </Switch>
            </div>
          )}
        </Frame>
      </Centered>
      <Footer />
    </div>
  );
};

export default withSounds()(withStyles(styles)(AppLayout));
