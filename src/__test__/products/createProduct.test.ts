import request from 'supertest';
import { app } from '../../app';
import { Server } from 'http';
import ProductsService from '../../services/product.service';
import { newProductDataMock } from '../mocks/products.mock';

jest.mock('../../services/category.service');

describe('POST /api/v1/products', () => {
  const port = Math.floor(Math.random() * 10000) + 1024;

  let server: Server;
  let createSpy: jest.SpyInstance;

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

  afterEach(() => {
    createSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('should respond with a 201 status code and return the created category', async () => {
    createSpy = jest.spyOn(ProductsService.prototype, 'create');

    const createdCategory: any = {
      id: 7,
      ...newProductDataMock,
      createdAt: '2024-06-28T23:59:25.674Z',
    };

    createSpy.mockResolvedValue(createdCategory);

    const response = await request(app)
      .post('/api/v1/products')
      .send(newProductDataMock);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdCategory);
  });
});
