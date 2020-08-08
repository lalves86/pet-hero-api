import { v4 } from 'uuid';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import ListPetsService from './ListPetsService';

let fakePetsRepository: FakePetsRepository;
let listPets: ListPetsService;

describe('ListPets', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    listPets = new ListPetsService(fakePetsRepository);
  });

  it('should be able to list all the pets', async () => {
    const pet1 = await fakePetsRepository.create({
      userId: v4(),
      name: 'Thor',
      species: 'dog',
      breed: 'Shepard',
      age: 2,
      weight: 5,
      location: 'São Paulo',
    });

    const pet2 = await fakePetsRepository.create({
      userId: v4(),
      name: 'Isis',
      species: 'cat',
      breed: 'siamese',
      age: 1,
      weight: 2,
      location: 'São Paulo',
    });

    const pets = await listPets.execute();

    expect(pets).toEqual([pet1, pet2]);
  });
});
