import "./lib/env";
import "./models";
import express, { Express } from 'express';
import helmet from 'helmet';

import * as homeController from './controllers/home';

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', homeController.getIndex);
app.get('/about', homeController.getAbout);

export default app;