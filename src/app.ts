import "./lib/env";
import "./models";
import express, { Express } from 'express';
import helmet from 'helmet';

import * as authController from './controllers/auth';
import * as chartController from './controllers/chart';
import * as clientController from './controllers/client';

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/charts/new', chartController.postChart);
app.put('/charts/:id', chartController.putChart);
app.delete('/charts/:id', chartController.deleteChart);
app.post('/clients/new', clientController.postClient);
app.put('/clients/:id', clientController.putClient);
app.delete('/clients/:id', clientController.deleteClient);

app.post('/login', authController.postLogin);
app.post('/signup', authController.postSignup);

export default app;