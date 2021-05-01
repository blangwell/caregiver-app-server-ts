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

// clients
app.get('user/:userId/clients', clientController.getAllClients);
app.get('user/:userId/clients/:clientId', clientController.getClient);
app.post('/clients/new', clientController.postClient);
app.put('user/:userId/clients/:clientId', clientController.putClient);
app.delete('user/:userId/clients/:clientId', clientController.deleteClient);

// client charts
app.get('user/:userId/clients/:clientId/charts/', chartController.getAllCharts);
app.get('user/:userId/clients/:clientId/charts/:chartId', chartController.getChart);
app.post('user/:userId/clients/:clientId/charts/new', chartController.postChart);
app.put('user/:userId/clients/:clientId/charts/:chartId', chartController.putChart);
app.delete('user/:userId/clients/:clientId/charts/:chartId', chartController.deleteChart);

// auth
app.post('/login', authController.postLogin);
app.post('/signup', authController.postSignup);

export default app;