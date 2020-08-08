import { v4 } from 'uuid';
import AppError from '@shared/errors/AppError';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import ListPetByIdService from './ListPetByIdService';

let fakePetsRepository: FakePetsRepository;
let listPetById: ListPetByIdService;

describe('ListPetById', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    listPetById = new ListPetByIdService(fakePetsRepository);
  });

  it('should be able to list a pet by id', async () => {
    const pet = await fakePetsRepository.create({
      userId: v4(),
      name: 'Thor',
      species: 'dog',
      breed: 'Shepard',
      age: 2,
      weight: 5,
      location: 'São Paulo',
    });

    const returnedPet = await listPetById.execute(pet.id);

    expect(returnedPet.name).toEqual('Thor');
  });

  it('should not be able to list non-existing pet', async () => {
    expect(listPetById.execute('non-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
