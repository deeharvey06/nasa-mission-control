const express = require('express');
const path = require('node:path');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planetsRouter');
const launchesRouter = require('./routes/launches/launchesRouter');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use(morgan('combined'));
app.use(express.json());

app.use(['/planets', '/api/planets'], planetsRouter);
app.use(['/launches', '/api/launches'], launchesRouter);
app.use('/api', (req, res) =>
  res.status(404).json({ error: 'API route not found' }),
);

const clientBuild = path.join(__dirname, '../../client/build');
app.use(express.static(clientBuild));
app.get(['/', '/launch', '/upcoming', '/history'], (req, res, next) => {
  res.sendFile(path.join(clientBuild, 'index.html'), (error) => {
    if (error) next(error);
  });
});

module.exports = app;
