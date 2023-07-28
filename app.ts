import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './src/routes';
import mongoose from 'mongoose';
import expressJSDocSwagger from 'express-jsdoc-swagger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`App is running on port ${port}`);
  await mongoose.connect(process.env.MONGO_URL ?? 'mongodb://localhost/test')
});

app.disable('etag');
app.use(express.json());
app.use(router);
const options = {
  info: {
    version: '1.0.0',
    title: 'Live Library',
    description: 'A online simple library',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  baseUrl: 'http://127.0.0.1:3000/',
  baseDir: './src',
  filesPattern: './**/**/*.*.ts',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: '/v3/api-docs',
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
  multiple: true,
};
expressJSDocSwagger(app)(options);
export default app;
