import request from 'supertest';
import { app } from '../../app';
import { Server } from 'http';
import { productMock } from '../mocks/products.mock';
import ProductsService from '../../services/product.service';

jest.mock('../../services/category.service');

describe('GET /api/v1/products/:id', () => {
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
    findOneSpy = jest.spyOn(ProductsService.prototype, 'findOne');
  });

  afterEach(() => {
    findOneSpy.mockRestore();
    jest.clearAllMocks();
  });
  test('should respond with a 200 status code and return list of products', async () => {
    findOneSpy.mockResolvedValue(productMock);

    const response = await request(app).get('/api/v1/products/1').send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(productMock);
  });
});
