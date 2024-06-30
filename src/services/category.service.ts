import boom from '@hapi/boom';

import { Category } from '../db/models/category.model';
import { CategoryProps, CreateCategory } from './types/categories.types';

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

  async create(data: CreateCategory): Promise<Category> {
    const { name } = data;
    const categoryExists = await Category.findOne({ where: { name } });
    if (categoryExists) {
      throw boom.conflict('category already exists');
    }
    const newCategory = await Category.create(data as Partial<Category>);
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
    const [_, updatedCategories] = await Category.update(changes, {
      where: {
        id,
      },
      returning: true,
    });

    const updatedCategory = updatedCategories[0].toJSON();

    return updatedCategory;
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
