import request from 'supertest';
import { app } from '../../app';
import { Server } from 'http';
import CategoryService from '../../services/category.service';
import { categoryMock } from '../mocks/categories.mock';

jest.mock('../../services/category.service');

describe('POST /api/v1/categories', () => {
  const port = Math.floor(Math.random() * 10000) + 1024;
  let server: Server;
  let createSpy: jest.SpyInstance;
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

  afterEach(() => {
    createSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('should respond with a 201 status code and return the created category', async () => {
    const newCategory = {
      name: 'HEALTH',
      image: 'https://example.com/health-category.jpg',
    };

    findOneSpy = jest.spyOn(CategoryService.prototype, 'findOne');
    createSpy = jest.spyOn(CategoryService.prototype, 'create');

    const createdCategory: any = {
      id: 4,
      ...newCategory,
      createdAt: '2024-06-29T00:00:47.136Z',
    };

    findOneSpy.mockResolvedValue(null);
    createSpy.mockResolvedValue(createdCategory);

    const response = await request(app)
      .post('/api/v1/categories')
      .send(newCategory);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdCategory);
  });

  test('should return error because the category exist', async () => {
    const newCategory = {
      name: 'HEALTH',
      image: 'https://example.com/health-category.jpg',
    };

    findOneSpy = jest.spyOn(CategoryService.prototype, 'findOne');
    createSpy = jest.spyOn(CategoryService.prototype, 'create');

    const createdCategory: any = {
      id: 4,
      ...newCategory,
      createdAt: '2024-06-29T00:00:47.136Z',
    };

    findOneSpy.mockResolvedValue(categoryMock);
    createSpy.mockResolvedValue(createdCategory);

    const response = await request(app)
      .post('/api/v1/categories')
      .send(newCategory);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdCategory);
  });
});
