import { Switch, Route } from 'react-router-dom';
import { withSounds } from 'arwes';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Launch from '../Launch';
import History from '../History';
import Upcoming from '../Upcoming';
import useAppLayout from './hooks/useAppLayout';

const AppLayout = ({ sounds }) => {
  const { launches, isPendingLaunch, submitLaunch, abortLaunch, planets } =
    useAppLayout(sounds);

  return (
    <div className='app-shell'>
      <Header />
      <main className='workspace'>
        <Switch>
          <Route exact path={['/', '/launch']}>
            <Launch
              planets={planets}
              submitLaunch={submitLaunch}
              isPendingLaunch={isPendingLaunch}
            />
          </Route>
          <Route exact path='/upcoming'>
            <Upcoming launches={launches} abortLaunch={abortLaunch} />
          </Route>
          <Route exact path='/history'>
            <History launches={launches} />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default withSounds()(AppLayout);
