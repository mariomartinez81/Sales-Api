import request from 'supertest';
import { app } from '../../app';
import { Server } from 'http';
import CategoryService from '../../services/category.service';
import { categoryMock, updatedCategoryMock } from '../mocks/categories.mock';

jest.mock('../../services/category.service');

describe('PUT /api/v1/categories/:id', () => {
  const port = Math.floor(Math.random() * 10000) + 1024;
  let server: Server;
  let updateSpy: jest.SpyInstance;
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
      .spyOn(CategoryService.prototype, 'findOne')
      .mockResolvedValue(categoryMock as any);
    updateSpy = jest.spyOn(CategoryService.prototype, 'update');
  });

  afterEach(() => {
    findOneSpy.mockRestore();
    updateSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('should respond with a 500 status because dont exit category to update', async () => {
    const dataUpdate = {
      name: 'TECHNOLOGY_UPDATED',
      image: 'https://example.com/technology-category.jpg',
    };

    const updatedCategory: any = {
      ...updatedCategoryMock,
      ...dataUpdate,
    };

    updateSpy.mockResolvedValue(updatedCategory);

    const response = await request(app)
      .put('/api/v1/categories/1')
      .send(dataUpdate);

    expect(response.status).toBe(500);
  });
});
