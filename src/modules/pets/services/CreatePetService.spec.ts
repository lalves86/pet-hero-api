import { v4 } from 'uuid';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import CreatePetService from './CreatePetService';

let fakePetsRepository: FakePetsRepository;
let createPet: CreatePetService;

describe('CreatePet', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    createPet = new CreatePetService(fakePetsRepository);
  });

  it('should be able to create a new pet', async () => {
    const pet = await createPet.execute({
      userId: v4(),
      name: 'Thor',
      species: 'dog',
      breed: 'Shepard',
      age: 2,
      weight: 5,
      location: 'São Paulo',
    });

    expect(pet).toHaveProperty('id');
  });
});
