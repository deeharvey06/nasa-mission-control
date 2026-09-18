import { httpGetLaunches, httpSubmitLaunch, httpAbortLaunch } from './requests';
beforeEach(() => {
  globalThis.fetch = jest.fn();
});
afterEach(() => {
  delete globalThis.fetch;
});

test('sorts launches by flight number and forwards cancellation', async () => {
  const signal = new AbortController().signal;
  fetch.mockResolvedValue({
    ok: true,
    json: async () => [{ flightNumber: 102 }, { flightNumber: 100 }],
  });
  await expect(httpGetLaunches(signal)).resolves.toEqual([
    { flightNumber: 100 },
    { flightNumber: 102 },
  ]);
  expect(fetch).toHaveBeenCalledWith('/api/launches', { signal });
});

test('surfaces validation errors when scheduling fails', async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 400,
    json: async () => ({ error: 'Invalid launch date' }),
  });
  await expect(httpSubmitLaunch({ mission: 'Explorer' })).rejects.toThrow(
    'Invalid launch date',
  );
});

test('does not report success for an unsuccessful abort', async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 404,
    json: async () => ({ error: 'Launch not found' }),
  });
  await expect(httpAbortLaunch(42)).rejects.toThrow('Launch not found');
});

test('provides a readable error for non-JSON server failures', async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 502,
    json: async () => {
      throw new SyntaxError();
    },
  });
  await expect(httpGetLaunches()).rejects.toThrow(
    'Unable to read the server response (502)',
  );
});
