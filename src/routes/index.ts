import express, { Express } from 'express';
import productsRouter from './products.router';

export default function routerApi(app: Express): void {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
}
