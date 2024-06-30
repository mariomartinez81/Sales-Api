import request from 'supertest';
import { app } from '../../app';
import { Server } from 'http';
import { categoryMock } from '../mocks/categories.mock';
import CategoryService from '../../services/category.service';

jest.mock('../../services/category.service');

describe('GET /api/v1/categories/:id', () => {
  const port = Math.floor(Math.random() * 10000) + 1024;
  let server: Server;
  let findOneSpy: jest.SpyInstance;

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
    findOneSpy = jest.spyOn(CategoryService.prototype, 'findOne');
  });

  afterEach(() => {
    findOneSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('should respond with a 200 status code and specific category', async () => {
    findOneSpy.mockResolvedValue(categoryMock);

    const response = await request(app).get('/api/v1/categories/1').send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(categoryMock);
  });

  test('should respond with a 200 and return null', async () => {
    findOneSpy.mockResolvedValue(null);

    const response = await request(app).get('/api/v1/categories/2').send();
    expect(response.status).toBe(200);
    expect(response.body).toBeNull();
  });
});
