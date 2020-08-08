import { v4 } from 'uuid';
import AppError from '@shared/errors/AppError';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import UpdatePetService from './UpdatePetService';

let fakePetsRepository: FakePetsRepository;
let updatePet: UpdatePetService;

describe('UpdatePet', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    updatePet = new UpdatePetService(fakePetsRepository);
  });

  it('should be able to update a pet', async () => {
    const pet = await fakePetsRepository.create({
      userId: v4(),
      name: 'Thor',
      species: 'dog',
      breed: 'Shepard',
      age: 2,
      weight: 5,
      location: 'São Paulo',
    });

    const updatedPet = await updatePet.execute({
      userId: v4(),
      id: pet.id,
      name: 'Thor',
      species: 'dog',
      breed: 'Shepard',
      age: 3,
      weight: 8,
      location: 'Campinas',
    });

    expect(updatedPet.location).toEqual('Campinas');
  });

  it('should not be able to update non existing pet', async () => {
    expect(
      updatePet.execute({
        id: 'Non-existing-id',
        userId: v4(),
        name: 'Thor',
        species: 'dog',
        breed: 'Shepard',
        age: 3,
        weight: 8,
        location: 'Campinas',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
