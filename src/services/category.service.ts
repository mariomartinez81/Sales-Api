import boom from '@hapi/boom';

const { models } = require('./../libs/sequelize');

class CategoryService {
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
    const category = await models.Category.update(changes, {
      where: {
        id,
      },
    });
    return category;
  }

  async delete(id: number) {
    const category = await this.findOne(id);

    if (!category) {
      throw boom.notFound('category not found');
    }
    await models.Category.destroy({
      where: {
        id,
      },
    });
    return { id };
  }
}

export default CategoryService;
