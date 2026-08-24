const express = require('express');

const {
  getAllLaunches,
  addNewLaunches,
  abortLaunch,
} = require('../../controllers/launches/launchesControllers');

const launchesRouter = express.Router();

launchesRouter.get('/', getAllLaunches);
launchesRouter.post('/', addNewLaunches);
launchesRouter.delete('/:id', abortLaunch);

module.exports = launchesRouter;
