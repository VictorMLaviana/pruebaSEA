import { build } from '../helper';

describe('Test root endpoint', () => {
  let app;
  beforeAll((done) => {
    build().then((server) => {
      app = server;
      app.ready().then(() => {
        done();
      });
    });
  });
  afterAll((done) => {
    app.close();
    done();
  });
  test('root endpoint', async (done) => {
    const response = await app.inject({
      url: '/',
      method: 'GET',
    });
    expect(JSON.parse(response.payload)).toMatchObject({ ok: true });
    done();
  });
  test('root api endpoint', async (done) => {
    const response = await app.inject({
      url: '/api',
      method: 'GET',
    });
    expect(JSON.parse(response.payload)).toMatchObject({ ok: true });
    done();
  });
});
