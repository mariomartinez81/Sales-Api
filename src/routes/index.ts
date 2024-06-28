import express, { Express } from 'express';
import productsRouter from './products.router';
import categoriesRouter from './categories.router';

export default function routerApi(app: Express): void {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
}
