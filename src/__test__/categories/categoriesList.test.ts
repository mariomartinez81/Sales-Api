import request from 'supertest';
import { app } from '../../app';
import { Server } from 'http';
import { categoriesMock } from '../mocks/categories.mock';
import CategoryService from '../../services/category.service';

jest.mock('../../services/category.service');

describe('GET /api/v1/categories', () => {
  const port = Math.floor(Math.random() * 10000) + 1024;
  let server: Server;
  let findSpy: jest.SpyInstance;

  beforeAll((done) => {
    server = app.listen(port, () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  beforeEach(() => {
    findSpy = jest.spyOn(CategoryService.prototype, 'find');
  });

  afterEach(() => {
    findSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('should respond with a 200 status code and return list of categories', async () => {
    findSpy.mockResolvedValue(categoriesMock);

    const response = await request(app).get('/api/v1/categories').send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(categoriesMock);
  });
});
