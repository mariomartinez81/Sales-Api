import request from 'supertest';
import { app } from '../../app';
import { Server } from 'http';
import ProductsService from '../../services/product.service';
import { productMock } from '../mocks/products.mock';

jest.mock('../../services/category.service');

describe('DELETE /api/v1/categories', () => {
  const port = Math.floor(Math.random() * 10000) + 1024;
  let server: Server;
  let deleteSpy: jest.SpyInstance;
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
    findOneSpy = jest
      .spyOn(ProductsService.prototype, 'findOne')
      .mockResolvedValue(productMock as any);
    deleteSpy = jest.spyOn(ProductsService.prototype, 'delete');
  });

  afterEach(() => {
    findOneSpy.mockRestore();
    deleteSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('should respond with a 201 status code and return the created category', async () => {
    deleteSpy.mockResolvedValue({ id: 1 });

    const response = await request(app).delete('/api/v1/products/1').send();

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: '1' });
  });
});
