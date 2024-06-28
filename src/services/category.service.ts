import boom from '@hapi/boom';

import { Category } from '../db/models/category.model';

class CategoryService {
  async find() {
    const categories = await Category.findAll();
    return categories;
  }

  async findOne(id: number) {
    const category = await Category.findByPk(id, {
      include: ['products'],
    });
    return category;
  }

  async create(data: any) {
    const newCategory = await Category.create(data);
    return newCategory;
  }

  async update(id: number, changes: any) {
    const category = await Category.update(changes, {
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
    await Category.destroy({
      where: {
        id,
      },
    });
    return { id };
  }
}

export default CategoryService;
