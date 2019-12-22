import { Router } from 'express';
import SessionController from './app/controller/SessionController';
import StudentsController from './app/controller/StudentsController';
import PlanController from './app/controller/PlanController';
import EnrollController from './app/controller/EnrollController';
// eslint-disable-next-line import/no-named-as-default
import authMiddleware from './app/middlewares/auth';


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

export default routes;
