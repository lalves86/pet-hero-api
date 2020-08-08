import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IPetsRepository from '@modules/pets/repositories/IPetsRepository';

@injectable()
class DeletePetService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) throw new AppError(`Pet ${id} not found`);

    await this.petsRepository.delete(id);
  }
}

export default DeletePetService;
