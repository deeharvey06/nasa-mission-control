const express = require('express');

const {
  getAllLaunches,
} = require('../../controllers/launches/launchesControllers');

const launchesRouter = express.Router();

launchesRouter.get('/', getAllLaunches);

module.exports = launchesRouter;
