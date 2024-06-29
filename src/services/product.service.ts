import { Op } from 'sequelize';
import boom from '@hapi/boom';
import { Product } from '../db/models/product.model';
import { CreateProductProps, ProductQuery } from './types/products.types';
import { DEFAULT_IMAGE } from '../utils/constanst';

class ProductsService {
  async find(query: Partial<ProductQuery>): Promise<Product[] | []> {
    const options: Partial<ProductQuery | any> = {
      include: ['category'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const products = await Product.findAll(options);
    return products ?? [];
  }

  async findOne(id: number): Promise<Product> {
    const product = await Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async create(data: CreateProductProps): Promise<Product> {
    const newData = data;
    if (!data.image) {
      newData.image = DEFAULT_IMAGE;
    }
    const newProduct = await Product.create(data as any);
    return newProduct;
  }

  async update(
    id: number,
    changes: CreateProductProps,
  ): Promise<Partial<Product> | null> {
    const product = await this.findOne(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    const affectedRows = await Product.update(changes, {
      where: {
        id,
      },
    });

    return affectedRows ? { ...product.toJSON(), ...changes } : null;
  }

  async delete(id: number): Promise<{ id: number }> {
    const product = await this.findOne(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    await Product.destroy({
      where: {
        id,
      },
    });

    return { id };
  }
}

export default ProductsService;
