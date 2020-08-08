import { Router } from 'express';
import petsRouter from '@modules/pets/infra/http/routes/pets.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/pets', petsRouter);

export default routes;
