import express from 'express';
import cors from 'cors';
import { port } from './config';
import { router } from './router';

const app = express();

app.use(cors())
  .use(express.json())
  .use(router)
  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  })

module.exports = app;