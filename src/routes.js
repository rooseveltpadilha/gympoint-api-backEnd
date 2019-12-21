import { Router } from 'express';
import User from './app/models/User';
import SessionController from './app/controller/SessionController';

const routes = new Router();

routes.post('/login', SessionController.store);

export default routes;
