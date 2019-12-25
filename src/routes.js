import { Router } from 'express';
import SessionController from './app/controller/SessionController';
import StudentsController from './app/controller/StudentsController';
import PlanController from './app/controller/PlanController';
import EnrollController from './app/controller/EnrollController';
import CheckinsController from './app/controller/CheckinsController';
// eslint-disable-next-line import/no-named-as-default
import authMiddleware from './app/middlewares/auth';
import HelpOrdersController from './app/controller/HelpOrdersController';
import AnswersController from './app/controller/AnswersController';

const routes = new Router();

routes.post('/login', SessionController.store);

routes.get('/students', authMiddleware, StudentsController.index);
routes.post('/students', authMiddleware, StudentsController.store);
routes.put('/students/:id', authMiddleware, StudentsController.update);
routes.delete('/students/:id', authMiddleware, StudentsController.delete);

routes.get('/plans', authMiddleware, PlanController.index);
routes.post('/plans', authMiddleware, PlanController.store);
routes.put('/plans/:id', authMiddleware, PlanController.update);
routes.delete('/plans/:id', authMiddleware, PlanController.delete);

routes.get('/enroll', authMiddleware, EnrollController.index);
routes.post('/enroll', authMiddleware, EnrollController.store);
routes.put('/enroll/:id_stud', authMiddleware, EnrollController.update);
routes.delete('/enroll/:id_stud', authMiddleware, EnrollController.delete);

routes.get('/students/:id/checkins', CheckinsController.index);
routes.post('/students/:id/checkins', CheckinsController.store);

routes.get('/students/:id/help-orders', HelpOrdersController.index);
routes.post('/students/:id/help-orders', HelpOrdersController.store);

routes.get('/help-orders', authMiddleware, AnswersController.index);
routes.post('/help-orders/:id/answer', authMiddleware, AnswersController.store);

export default routes;
