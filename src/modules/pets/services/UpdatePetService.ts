import { injectable, inject } from 'tsyringe';
import Pet from '@modules/pets/infra/typeorm/entities/Pet';
import AppError from '@shared/errors/AppError';
import IPetsRepository from '@modules/pets/repositories/IPetsRepository';

interface IRequest {
  id: string;
  userId: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  location: string;
}

@injectable()
class UpdatePetService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,
  ) {}

  public async execute({
    id,
    userId,
    name,
    species,
    breed,
    age,
    weight,
    location,
  }: IRequest): Promise<Pet> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) throw new AppError(`Pet ${id} not found`);

    pet.id = id;
    pet.userId = userId;
    pet.name = name;
    pet.species = species;
    pet.breed = breed;
    pet.age = age;
    pet.weight = weight;
    pet.location = location;

    await this.petsRepository.save(pet);

    return pet;
  }
}

export default UpdatePetService;
