import { v4 } from 'uuid';
import AppError from '@shared/errors/AppError';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import DeletePetService from './DeletePetService';

let fakePetsRepository: FakePetsRepository;
let deletePet: DeletePetService;

describe('DeletePet', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    deletePet = new DeletePetService(fakePetsRepository);
  });

  it('should be able to delete a pet', async () => {
    const pet = await fakePetsRepository.create({
      userId: v4(),
      name: 'Thor',
      species: 'dog',
      breed: 'Shepard',
      age: 2,
      weight: 5,
      location: 'São Paulo',
    });

    const response = await deletePet.execute(pet.id);

    expect(response).toBeUndefined();
  });

  it('should not be able to delete a non-existing pet id', async () => {
    expect(deletePet.execute('non-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
