import express from 'express';
import cors from 'cors';
import { config } from './config';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
  ormErrorHandler,
} from './middlewares/error.handler';
import routerApi from './routes';

const { port } = config;

const app = express();

app.use(cors());

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

routerApi(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
