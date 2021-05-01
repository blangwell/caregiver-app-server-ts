import "./lib/env";
import "./models";
import express, { Express } from 'express';
import helmet from 'helmet';

import * as userController from './controllers/user';
import * as chartController from './controllers/chart';
import * as homeController from './controllers/home';

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', homeController.getIndex);
app.get('/about', homeController.getAbout);
app.get('/chart/new', chartController.getNewChart);
app.post('/chart/new', chartController.postNewChart);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);

export default app;