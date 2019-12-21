import { Router } from 'express';
import SessionController from './app/controller/SessionController';
import StudentsController from './app/controller/StudentsController';
// eslint-disable-next-line import/no-named-as-default
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/login', SessionController.store);

routes.get('/students', authMiddleware, StudentsController.index);
routes.post('/students', authMiddleware, StudentsController.store);
routes.put('/students/:id', authMiddleware, StudentsController.update);
routes.delete('/students/:id', authMiddleware, StudentsController.delete);

export default routes;
