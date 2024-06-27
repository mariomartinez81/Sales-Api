import express from 'express';
import cors from 'cors';
import { config } from './config';

const { port } = config;

const app = express();

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
