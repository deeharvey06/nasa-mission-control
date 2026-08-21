import { Button, Loading } from 'arwes';

import Clickable from '../../../../components/Clickable';
import Input from '../../../../components/Input';

import LaunchSelect from './components/LaunchSelect';

const LaunchForm = ({ planets, entered, submitLaunch, isPendingLaunch }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <form
      onSubmit={submitLaunch}
      style={{
        display: 'inline-grid',
        gridTemplateColumns: 'auto auto',
        gridGap: '10px 20px',
      }}
    >
      <Input
        type='date'
        name='launch-day'
        label='Launch Date'
        placeholder='Launch Date'
        min={today}
        max='2040-12-31'
        defaultValue={today}
      />

      <Input type='text' name='mission-name' label='Mission Name' />

      <Input
        type='text'
        name='rocket-name'
        label='Rocket Type'
        placeholder='Explorer IS1'
      />

      <LaunchSelect
        id='planets-selector'
        name='planets-selector'
        label='Destination Exoplanet'
        options={planets}
      />

      <Clickable>
        <Button
          animate
          show={entered}
          type='submit'
          layer='success'
          disabled={isPendingLaunch}
        >
          Launch Mission ✔
        </Button>
      </Clickable>
      {isPendingLaunch && <Loading animate small />}
    </form>
  );
};

export default LaunchForm;
