const request = require('supertest');
const app = require('./app');

test('lists launches', async () => {
  const response = await request(app).get('/launches').expect(200);
  expect(Array.isArray(response.body)).toBe(true);
});

test('rejects an incomplete launch', async () => {
  const response = await request(app)
    .post('/launches')
    .send({ mission: 'Explorer' })
    .expect(400);
  expect(response.body).toEqual({ error: 'Missing required launch property' });
});

test('exposes the same API under the frontend proxy prefix', async () => {
  const response = await request(app).get('/api/launches').expect(200);
  expect(Array.isArray(response.body)).toBe(true);
  await request(app)
    .get('/api/missing')
    .expect(404)
    .expect('Content-Type', /json/);
});
