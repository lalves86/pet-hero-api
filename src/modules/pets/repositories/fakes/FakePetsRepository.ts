import { uuid } from 'uuidv4';
import Pet from '@modules/pets/infra/typeorm/entities/Pet';
import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import ICreatePetDTO from '@modules/pets/dtos/ICreatePetDTO';

class PetsRepository implements IPetsRepository {
  private pets: Pet[] = [];

  public async findByName(name: string): Promise<Pet | undefined> {
    const findPet = this.pets.find(pet => pet.name === name);

    return findPet;
  }

  public async findById(id: string): Promise<Pet | undefined> {
    const findPet = this.pets.find(pet => pet.id === id);

    return findPet;
  }

  public async all(): Promise<Pet[]> {
    return this.pets;
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
    const pet = new Pet();

    Object.assign(pet, {
      id: uuid(),
      userId,
      name,
      species,
      breed,
      age,
      weight,
      location,
    });

    this.pets.push(pet);

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
    const findIndex = this.pets.findIndex(pet => pet.id === id);

    const pet = new Pet();

    Object.assign(pet, {
      id,
      userId,
      name,
      species,
      breed,
      age,
      weight,
      location,
    });

    this.pets[findIndex] = pet;

    return pet;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.pets.findIndex(pet => pet.id === id);

    this.pets.splice(findIndex, 1);
  }
}

export default PetsRepository;
