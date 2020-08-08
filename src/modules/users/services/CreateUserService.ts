import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  address: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    address,
    password,
  }: IRequest): Promise<User> {
    const checkuserExists = await this.usersRepository.findByEmail(email);

    if (checkuserExists) throw new AppError('Email address already used.');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      address,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
