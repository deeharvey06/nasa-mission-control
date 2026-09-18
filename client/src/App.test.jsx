import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
} from './hooks/requests';
import { useBleeps } from '@arwes/react-bleeps';

jest.mock('./hooks/requests');
jest.mock('@arwes/react-bleeps', () => ({
  BleepsProvider: ({ children }) => children,
  useBleeps: jest.fn(),
}));
const bleeps = {
  success: { play: jest.fn() },
  warning: { play: jest.fn() },
  abort: { play: jest.fn() },
  click: { play: jest.fn() },
};

beforeEach(() => {
  window.history.replaceState({}, '', '/');
  useBleeps.mockReturnValue(bleeps);
  httpGetPlanets.mockResolvedValue([
    { kepid: 442, kepler_name: 'Kepler-442 b' },
  ]);
  httpGetLaunches.mockResolvedValue([]);
});

test('redirects home to planning and supports navigation', async () => {
  const user = userEvent.setup();
  render(<App />);
  await screen.findByRole('option', { name: 'Kepler-442 b' });
  expect(window.location.pathname).toBe('/launch');
  expect(
    screen.getByRole('link', { name: /Mission Planning/ }),
  ).toHaveAttribute('aria-current', 'page');
  await user.click(screen.getByRole('link', { name: /Mission Queue/ }));
  expect(
    screen.getByRole('heading', { name: 'Upcoming missions' }),
  ).toBeInTheDocument();
  await user.click(screen.getByRole('link', { name: /Archive/ }));
  expect(
    screen.getByRole('heading', { name: 'Mission history' }),
  ).toBeInTheDocument();
});

test('plays Arwes warning on failure and success on retry, unlocking the form', async () => {
  const user = userEvent.setup();
  httpSubmitLaunch
    .mockRejectedValueOnce(new Error('Launch service unavailable'))
    .mockResolvedValueOnce({
      flightNumber: 101,
      mission: 'Explorer',
      upcoming: true,
    });
  render(<App />);
  await screen.findByRole('option', { name: 'Kepler-442 b' });
  await user.type(
    screen.getByRole('textbox', { name: 'MISSION NAME' }),
    'Explorer',
  );
  await user.type(
    screen.getByRole('textbox', { name: 'LAUNCH VEHICLE' }),
    'Falcon',
  );
  const submit = screen.getByRole('button', { name: /SCHEDULE MISSION/ });
  await user.click(submit);
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Launch service unavailable',
  );
  expect(submit).toBeEnabled();
  expect(bleeps.warning.play).toHaveBeenCalledTimes(1);
  expect(bleeps.success.play).not.toHaveBeenCalled();
  await user.click(submit);
  await waitFor(() =>
    expect(screen.queryByRole('alert')).not.toBeInTheDocument(),
  );
  expect(screen.getByRole('status')).toHaveTextContent(
    'Mission scheduled successfully',
  );
  expect(bleeps.success.play).toHaveBeenCalledTimes(1);
  await user.click(
    screen.getByRole('button', { name: 'Dismiss notification' }),
  );
  expect(
    screen.queryByText('Mission scheduled successfully.'),
  ).not.toBeInTheDocument();
});

test('plays the Arwes abort sound after a successful abort', async () => {
  window.history.replaceState({}, '', '/upcoming');
  const mission = {
    flightNumber: 101,
    mission: 'Explorer',
    rocket: 'Falcon',
    target: 'Kepler-442 b',
    launchDate: '2030-12-27',
    upcoming: true,
  };
  httpGetLaunches.mockResolvedValue([mission]);
  httpAbortLaunch.mockResolvedValue({ ...mission, upcoming: false });
  const user = userEvent.setup();
  render(<App />);
  await user.click(await screen.findByRole('button', { name: 'Abort' }));
  await user.click(screen.getByRole('button', { name: 'Abort Mission' }));
  await screen.findByText('No missions in queue');
  expect(bleeps.abort.play).toHaveBeenCalledTimes(1);
});

test('disables scheduling when destinations fail to load', async () => {
  httpGetPlanets.mockRejectedValueOnce(new Error('Destinations unavailable'));
  render(<App />);
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Destinations unavailable',
  );
  expect(
    screen.getByRole('button', { name: /SCHEDULE MISSION/ }),
  ).toBeDisabled();
});

test('offers a recovery link for unknown routes', async () => {
  window.history.replaceState({}, '', '/missing');
  render(<App />);
  expect(
    screen.getByRole('heading', { name: 'Page not found' }),
  ).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.queryByText('Loading destinations…')).not.toBeInTheDocument(),
  );
  expect(
    screen.getByRole('link', { name: 'Return to mission planning' }),
  ).toHaveAttribute('href', '/launch');
});

test('automatically dismisses success feedback after five seconds', async () => {
  httpSubmitLaunch.mockResolvedValueOnce({
    flightNumber: 101,
    mission: 'Explorer',
    upcoming: true,
  });
  const { unmount } = render(<App />);
  await screen.findByRole('option', { name: 'Kepler-442 b' });
  jest.useFakeTimers();
  try {
    await act(async () => {
      fireEvent.submit(
        screen
          .getByRole('button', { name: /SCHEDULE MISSION/ })
          .closest('form'),
      );
    });
    expect(screen.getByRole('status')).toHaveTextContent(
      'Mission scheduled successfully',
    );
    act(() => jest.advanceTimersByTime(4999));
    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(1));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  } finally {
    unmount();
    jest.useRealTimers();
  }
});
