const API_URL = 'http://localhost:8000';

async function httpGetPlanets() {
  try {
    const response = await fetch(`${API_URL}/planets`);
    return response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function httpGetLaunches() {
  try {
    const response = await fetch(`${API_URL}/launches`);
    const fetchLaunches = await response.json();

    return fetchLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
