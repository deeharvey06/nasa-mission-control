import usePlanets from '../../../hooks/usePlanets';
import useLaunches from '../../../hooks/useLaunches';

export default function useAppLayout() {
  const launches = useLaunches();
  const { planets, error: planetsError, isLoading } = usePlanets();
  return {
    ...launches,
    planets,
    isLoading,
    error: launches.error || planetsError,
  };
}
