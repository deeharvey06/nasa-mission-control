const planets = require('../../models/planets/planetsModel');

const getAllPlanets = (req, res) => {
  return res.status(200).json(planets);
};

const getPlanet = (req, res) => {};

module.exports = {
  getAllPlanets,
  getPlanet,
};
