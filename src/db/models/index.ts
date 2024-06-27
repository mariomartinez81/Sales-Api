import { Sequelize } from 'sequelize';
import { Category, CategorySchema } from './category.model';
import { Product, ProductSchema } from './product.model';

export function setupModels(sequelize: Sequelize): void {
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}
