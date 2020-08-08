import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensuseAuthenticated';
import PetsController from '../controllers/PetsController';

const petsRouter = Router();
const petsController = new PetsController();

// petsRouter.use(ensureAuthenticated);

petsRouter.get('/', petsController.index);

petsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  petsController.show,
);

petsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      userId: Joi.string().required(),
      name: Joi.string().required(),
      species: Joi.string().required(),
      breed: Joi.string().required(),
      age: Joi.number().required(),
      weight: Joi.number().required(),
      location: Joi.string().required(),
    },
  }),
  petsController.create,
);

petsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      userId: Joi.string().required(),
      name: Joi.string(),
      species: Joi.string(),
      breed: Joi.string(),
      age: Joi.number(),
      weight: Joi.number(),
      location: Joi.string(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  petsController.update,
);

petsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  petsController.delete,
);

export default petsRouter;
