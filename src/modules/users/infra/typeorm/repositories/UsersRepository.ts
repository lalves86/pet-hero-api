import { getRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser || undefined;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ where: { email } });

    return findUser || undefined;
  }

  public async create({
    name,
    email,
    address,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, address, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save({
    id,
    name,
    email,
    address,
    password,
  }: User): Promise<User> {
    const user = this.ormRepository.save({
      id,
      name,
      email,
      address,
      password,
    });

    return user;
  }
}

export default UsersRepository;
