import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

import * as homeController from './controllers/home';

const PORT = process.env.PORT;
const app: Express = express();


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', homeController.getIndex);

app.get('/about', homeController.getAbout);

export default app;