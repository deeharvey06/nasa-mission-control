const http = require('http');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets/planetsModel');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
  });
}

startServer();
