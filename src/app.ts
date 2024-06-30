import express from 'express';
import cors from 'cors';

import {
  boomErrorHandler,
  errorHandler,
  logErrors,
  ormErrorHandler,
} from './middlewares/error.handler';
import routerApi from './routes';
import setupSequalize from './libs/sequelize';

setupSequalize();

export const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
app.use(ormErrorHandler);

routerApi(app);
