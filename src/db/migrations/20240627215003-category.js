import { CATEGORY_TABLE, CategorySchema } from '../models/category.model';

module.exports = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction;
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await transaction.commit();
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction;
    try {
      await queryInterface.dropTable(CATEGORY_TABLE);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
