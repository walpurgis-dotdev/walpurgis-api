import nock from 'nock';
// import request from 'supertest';
import appFunc from '../src';

describe('Users API', () => {
  let app;

  // Setup before each testCase
  beforeEach(async () => {
    app = await appFunc();
  });

  // Clean up after each testCase
  afterEach(async () => {
    nock.cleanAll();
    if (app) {
      await app.close();
    }
  });

  describe('GET /users', () => {
    it('should return a list of users', async () => {
      // Setup mock response
      nock('https://localhost:5000')
        .get('/v1/users/all_users')
        .reply(200, [
          {
            id: 'rober',
            name: 'Rober',
            username: 'rober',
            email: 'rober@dev.com',
          },
        ]);
    });
  });
});
