import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate an user', async () => {
    const fakeusersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeusersRepository,
      fakeHashProvider,
    );
    const auhenticateUser = new AuthenticateUserService(
      fakeusersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Fulano de Tal',
      email: 'fulano@test.com',
      address: 'Rua teste, 99 - B. Teste, São Paulo/SP',
      password: '123456',
    });

    const user = await auhenticateUser.execute({
      email: 'fulano@test.com',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
  });

  it('should not be able to authenticate with incorrect e-mail', async () => {
    const fakeusersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const auhenticateUser = new AuthenticateUserService(
      fakeusersRepository,
      fakeHashProvider,
    );

    expect(
      auhenticateUser.execute({
        email: 'fulano@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const fakeusersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeusersRepository,
      fakeHashProvider,
    );
    const auhenticateUser = new AuthenticateUserService(
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
      auhenticateUser.execute({
        email: 'fulano@test.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
