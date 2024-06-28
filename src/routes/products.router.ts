import * as express from 'express';
import ProductsService from '../services/product.service';
import validatorHandler from '../middlewares/validator.handler';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} from '../schemas/product.schema';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/products.controller';

const router = express.Router();
const service = new ProductsService();

router.get('/', validatorHandler(queryProductSchema, 'query'), getProducts);

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  getProductById,
);

router.post('/', validatorHandler(createProductSchema, 'body'), createProduct);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  updateProduct,
);

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  deleteProduct,
);

export default router;
