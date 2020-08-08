import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser || undefined;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser || undefined;
  }

  public async create({
    name,
    email,
    address,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, address, password });

    this.users.push(user);

    return user;
  }

  public async save({
    id,
    name,
    email,
    address,
    password,
  }: User): Promise<User> {
    const findIndex = this.users.findIndex(user => user.id === id);

    const user = new User();

    Object.assign(user, { id, name, email, address, password });

    this.users[findIndex] = user;

    return user;
  }
}

export default UsersRepository;
