import express from 'express';
import validatorHandler from '../middlewares/validator.handler';
import {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
} from '../schemas/category.schema';

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesById,
  updateCategory,
} from '../controllers/categories.controller';

const router = express.Router();

router.get('/', getCategories);

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  getCategoriesById,
);

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  createCategory,
);

router.put(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  updateCategory,
);

router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  deleteCategory,
);

export default router;
