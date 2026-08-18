import { withSounds } from 'arwes';

import useClickable from './hooks/useClickable.js';

const Clickable = ({ children, sounds, onClick, ...rest }) => {
  const { clickWithSound } = useClickable(sounds, onClick);

  return (
    <span {...rest} onClick={clickWithSound}>
      {children}
    </span>
  );
};

export default withSounds()(Clickable);
