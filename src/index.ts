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

const port = process.env.PORT ?? 3008;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

routerApi(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
