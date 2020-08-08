import { container } from 'tsyringe';
import '@modules/users/providers';
import PetsRepository from '@modules/pets/infra/typeorm/repositories/PetsRepository';
import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IPetsRepository>('PetsRepository', PetsRepository);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
