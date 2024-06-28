import boom from '@hapi/boom';

const { models } = require('./../libs/sequelize');

class CategoryService {
  constructor() {}
  async create(data: any) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id: number) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    return category;
  }

  async update(id: number, changes: any) {
    return {
      id,
      changes,
    };
  }

  async delete(id: number) {
    return { id };
  }
}

export default CategoryService;
