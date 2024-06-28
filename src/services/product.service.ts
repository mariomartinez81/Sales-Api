import { Op } from 'sequelize';
import boom from '@hapi/boom';
import { Product } from '../db/models/product.model';

class ProductsService {
  async find(query: any) {
    const options: any = {
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

  async findOne(id: number) {
    const product = await Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async create(data: any) {
    const newProduct = await Product.create(data);
    return newProduct;
  }

  async update(id: number, changes: any) {
    const product = await Product.update(changes, {
      where: {
        id,
      },
    });
    return product;
  }

  async delete(id: number) {
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
