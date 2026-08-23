const { getAllPlanetsDB } = require('../../models/planets/planetsModel');

const getAllPlanets = (req, res) => {
  return res.status(200).json(getAllPlanetsDB());
};

module.exports = {
  getAllPlanets,
};
