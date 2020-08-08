import { getRepository, Repository } from 'typeorm';
import Pet from '@modules/pets/infra/typeorm/entities/Pet';
import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import ICreatePetDTO from '@modules/pets/dtos/ICreatePetDTO';

class PetsRepository implements IPetsRepository {
  private ormRepository: Repository<Pet>;

  constructor() {
    this.ormRepository = getRepository(Pet);
  }

  public async findByName(name: string): Promise<Pet | undefined> {
    const findPet = await this.ormRepository.findOne({
      where: { name },
    });

    return findPet || undefined;
  }

  public async findById(id: string): Promise<Pet | undefined> {
    const findPet = await this.ormRepository.findOne(id);

    return findPet || undefined;
  }

  public async all(): Promise<Pet[]> {
    const pets = await this.ormRepository.find();

    return pets;
  }

  public async create({
    userId,
    name,
    species,
    breed,
    age,
    weight,
    location,
  }: ICreatePetDTO): Promise<Pet> {
    const pet = this.ormRepository.create({
      userId,
      name,
      species,
      breed,
      age,
      weight,
      location,
    });

    await this.ormRepository.save(pet);

    return pet;
  }

  public async save({
    id,
    userId,
    name,
    species,
    breed,
    age,
    weight,
    location,
  }: Pet): Promise<Pet> {
    const pet = this.ormRepository.save({
      id,
      userId,
      name,
      species,
      breed,
      age,
      weight,
      location,
    });

    return pet;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default PetsRepository;
