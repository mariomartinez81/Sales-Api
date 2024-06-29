import boom from '@hapi/boom';

import { Category } from '../db/models/category.model';
import { CategoryProps } from './types/categories.types';

class CategoryService {
  async find(): Promise<Category[] | []> {
    const categories = await Category.findAll();
    return categories ?? [];
  }

  async findOne(id: number): Promise<Category | null> {
    const category = await Category.findByPk(id, {
      include: ['products'],
    });
    return category;
  }

  async create(data: Partial<Category>): Promise<Category> {
    const newCategory = await Category.create(data);
    return newCategory;
  }

  async update(
    id: number,
    changes: CategoryProps,
  ): Promise<Category | Partial<Category> | null> {
    const category = await this.findOne(id);
    if (!category) {
      throw boom.notFound('category not found');
    }
    const affectedRows = await Category.update(changes, {
      where: {
        id,
      },
    });

    return affectedRows ? { ...category.toJSON(), ...changes } : null;
  }

  async delete(id: number): Promise<{ id: number }> {
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
