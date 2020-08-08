import { injectable, inject } from 'tsyringe';

import IPetsRepository from '@modules/pets/repositories/IPetsRepository';

import Pet from '@modules/pets/infra/typeorm/entities/Pet';

@injectable()
class ListPetsService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute(): Promise<Pet[]> {
    const pets = await this.petsRepository.all();

    return pets;
  }
}

export default ListPetsService;
