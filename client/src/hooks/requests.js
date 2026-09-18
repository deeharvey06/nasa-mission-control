const API_URL = __API_URL__.replace(/\/$/, '');

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options);
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(`Unable to read the server response (${response.status}).`);
  }
  if (!response.ok)
    throw new Error(data.error || `Request failed (${response.status}).`);
  return data;
}
export const httpGetPlanets = (signal) => request('/planets', { signal });
export const httpGetLaunches = async (signal) => {
  const launches = await request('/launches', { signal });
  return launches.sort((a, b) => a.flightNumber - b.flightNumber);
};
export const httpSubmitLaunch = (launch) =>
  request('/launches', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(launch),
  });
export const httpAbortLaunch = (id) =>
  request(`/launches/${id}`, { method: 'DELETE' });
