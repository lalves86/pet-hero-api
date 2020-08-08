import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeusersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeusersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Fulano de Tal',
      email: 'fulano@test.com',
      address: 'Rua teste, 99 - B. Teste, São Paulo/SP',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same e-mail', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeusersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeusersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Fulano de Tal',
      email: 'fulano@test.com',
      address: 'Rua teste, 99 - B. Teste, São Paulo/SP',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Cicrano de Tal',
        email: 'fulano@test.com',
        address: 'Rua teste, 50 - B. Teste, Campinas/SP',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
