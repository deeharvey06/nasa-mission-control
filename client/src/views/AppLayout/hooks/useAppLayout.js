import usePlanets from '../../../hooks/usePlanets';
import useLaunches from '../../../hooks/useLaunches';
import useFrameVisible from '../../../hooks/useFrameVisible';

const useAppLayout = (sounds) => {
  const { frameVisible, animateFrame } = useFrameVisible();

  const onSuccessSound = () => sounds.success && sounds.success.play();
  const onAbortSound = () => sounds.abort && sounds.abort.play();
  const onFailureSound = () => sounds.warning && sounds.warning.play();

  const { launches, isPendingLaunch, submitLaunch, abortLaunch } = useLaunches(
    onSuccessSound,
    onAbortSound,
    onFailureSound,
  );

  const planets = usePlanets();

  return {
    frameVisible,
    animateFrame,
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
    planets,
  };
};

export default useAppLayout;
