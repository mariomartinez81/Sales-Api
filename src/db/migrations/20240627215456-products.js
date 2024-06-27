import { PRODUCT_TABLE, ProductSchema } from '../models/product.model';

module.exports = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction;
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await transaction.commit();
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction;
    try {
      await queryInterface.dropTable(PRODUCT_TABLE);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
