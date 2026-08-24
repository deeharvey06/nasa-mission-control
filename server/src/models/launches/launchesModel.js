const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function findLaunchById(id) {
  return launches.has(id);
}

function getAllLaunchesDB() {
  return Array.from(launches.values());
}

function addNewLaunchesDB(launch) {
  latestFlightNumber++;

  const newLaunch = Object.assign(launch, {
    flightNumber: latestFlightNumber,
    upcoming: true,
    success: true,
    customer: ['ZTM', 'NASA'],
  });

  launches.set(latestFlightNumber, newLaunch);

  return newLaunch;
}

function abortLaunchById(id) {
  const aborted = launches.get(id);

  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}

module.exports = {
  findLaunchById,
  getAllLaunchesDB,
  addNewLaunchesDB,
  abortLaunchById,
};
