const {
  getAllLaunchesDB,
  addNewLaunchesDB,
} = require('../../models/launches/LaunchesModel');

function getAllLaunches(req, res) {
  return res.status(200).json(getAllLaunchesDB());
}

function addNewLaunches(req, res) {
  const { mission, rocket, launchDate, target } = req.body;

  if (!mission || !rocket || !launchDate || !target) {
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  const launchDateObj = new Date(launchDate);

  if (isNaN(launchDateObj)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  const newLaunch = {
    mission,
    rocket,
    launchDate: launchDateObj,
    target,
    ok: true,
  };

  const newLaunchRes = addNewLaunchesDB(newLaunch);

  return res.status(201).json(newLaunchRes);
}

module.exports = {
  getAllLaunches,
  addNewLaunches,
};
