import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IPetsRepository from '@modules/pets/repositories/IPetsRepository';

import Pet from '@modules/pets/infra/typeorm/entities/Pet';

@injectable()
class ListPetsService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute(id: string): Promise<Pet> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) throw new AppError(`Pet ${id} not found`);

    return pet;
  }
}

export default ListPetsService;
