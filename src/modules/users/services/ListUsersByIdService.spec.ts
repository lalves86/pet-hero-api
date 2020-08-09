import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListUserByIdService from './ListUserByIdService';

let fakeusersRepository: FakeUsersRepository;
let listUserById: ListUserByIdService;

describe('ListUsersById', () => {
  it('should be able to list a user by id', async () => {
    fakeusersRepository = new FakeUsersRepository();
    listUserById = new ListUserByIdService(fakeusersRepository);

    const user = await fakeusersRepository.create({
      name: 'Fulano de Tal',
      email: 'fulano@test.com',
      address: 'Rua teste, 99 - B. Teste, São Paulo/SP',
      password: '123456',
    });

    const returnedUser = await listUserById.execute(user.id);

    expect(returnedUser.name).toEqual('Fulano de Tal');
  });

  it('should not be able to list non-existing user', async () => {
    expect(listUserById.execute('wrong-id')).rejects.toBeInstanceOf(AppError);
  });
});
