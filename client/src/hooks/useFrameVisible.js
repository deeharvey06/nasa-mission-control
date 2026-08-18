import { useState } from 'react';

const useFrameVisible = (delay = 600) => {
  const [frameVisible, setFrameVisible] = useState(true);

  const animateFrame = () => {
    setFrameVisible(false);

    setTimeout(() => {
      setFrameVisible(true);
    }, delay);
  };

  return { frameVisible, animateFrame };
};

export default useFrameVisible;
