import { useCallback, useEffect, useState } from 'react';
import { useBleeps } from '@arwes/react-bleeps';
import { httpGetLaunches, httpSubmitLaunch, httpAbortLaunch } from './requests';

export default function useLaunches() {
  const [launches, setLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const bleeps = useBleeps();
  const dismissStatus = useCallback(() => setStatus(''), []);

  useEffect(() => {
    if (!status) return;
    const timeout = setTimeout(dismissStatus, 5000);
    return () => clearTimeout(timeout);
  }, [status, dismissStatus]);

  useEffect(() => {
    const controller = new AbortController();
    httpGetLaunches(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setLaunches(data);
      })
      .catch((error) => {
        if (!controller.signal.aborted) setError(error.message);
      });
    return () => controller.abort();
  }, []);

  const submitLaunch = useCallback(
    async (event) => {
      event.preventDefault();
      setPendingLaunch(true);
      setError('');
      setStatus('');
      const data = new FormData(event.currentTarget);
      try {
        const launch = await httpSubmitLaunch({
          launchDate: data.get('launch-day'),
          mission: data.get('mission-name'),
          rocket: data.get('rocket-name'),
          target: data.get('planets-selector'),
        });
        setLaunches((current) =>
          [...current, launch].sort((a, b) => a.flightNumber - b.flightNumber),
        );
        setStatus('Mission scheduled successfully.');
        bleeps.success?.play();
      } catch (error) {
        setError(error.message);
        bleeps.warning?.play();
      } finally {
        setPendingLaunch(false);
      }
    },
    [bleeps],
  );

  const abortLaunch = useCallback(
    async (id) => {
      setError('');
      setStatus('');
      try {
        const updated = await httpAbortLaunch(id);
        setLaunches((current) =>
          current.map((launch) =>
            launch.flightNumber === id ? updated : launch,
          ),
        );
        setStatus('Mission aborted.');
        bleeps.abort?.play();
        return true;
      } catch (error) {
        setError(error.message);
        bleeps.warning?.play();
        return false;
      }
    },
    [bleeps],
  );
  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
    error,
    status,
    dismissStatus,
  };
}
