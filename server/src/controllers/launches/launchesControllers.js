const { launches } = require('../../models/launches/launchesModel');

const getAllLaunches = (req, res) => {
  return res.status(200).json(Array.from(launches.values()));
};

module.exports = {
  getAllLaunches,
};
