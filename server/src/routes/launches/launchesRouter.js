const express = require('express');

const {
  getAllLaunches,
  addNewLaunches,
} = require('../../controllers/launches/launchesControllers');

const launchesRouter = express.Router();

launchesRouter.get('/', getAllLaunches);
launchesRouter.post('/', addNewLaunches);

module.exports = launchesRouter;
