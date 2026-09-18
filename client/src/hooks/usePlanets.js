import { useEffect, useState } from 'react';
import { httpGetPlanets } from './requests';

export default function usePlanets() {
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    httpGetPlanets(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setPlanets(data);
      })
      .catch((error) => {
        if (!controller.signal.aborted) setError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);
  return { planets, error, isLoading };
}
