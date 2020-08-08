import { injectable, inject } from 'tsyringe';
import Pet from '@modules/pets/infra/typeorm/entities/Pet';
import IPetsRepository from '../repositories/IPetsRepository';

interface IRequest {
  userId: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  location: string;
}

@injectable()
class CreateHeroService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute({
    userId,
    name,
    species,
    breed,
    age,
    weight,
    location,
  }: IRequest): Promise<Pet> {
    const hero = await this.petsRepository.create({
      userId,
      name,
      species,
      breed,
      age,
      weight,
      location,
    });

    return hero;
  }
}

export default CreateHeroService;
