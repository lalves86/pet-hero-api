import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserByIdService from '@modules/users/services/ListUserByIdService';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listUserById = container.resolve(ListUserByIdService);

    const user = await listUserById.execute(id);

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, address, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, address, password });

    return response.json(classToClass(user));
  }
}
