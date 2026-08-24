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
  try {
    const response = await fetch(`${API_URL}/launches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    });

    return response.json();
  } catch (err) {
    console.error(err);
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    await fetch(`${API_URL}/launches/${id}`, {
      method: 'DELETE',
    });

    return {
      ok: true,
    };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
