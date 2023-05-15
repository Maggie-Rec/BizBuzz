import express from "express";
import cors from "cors";
import { port } from "./config";
import { router } from "./router";
import multer from 'multer';
import cookieParser from 'cookie-parser';

const app = express();
const upload = multer({ dest: 'uploads/' });

app
  .use(cors({ origin: true, credentials: true }))
  .use(express.json())
  .use(cookieParser())
  .use(upload.single("file"))
  .use(router)
  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

module.exports = app;
