import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePetService from '@modules/pets/services/CreatePetService';
import UpdatePetService from '@modules/pets/services/UpdatePetService';
import ListPetsService from '@modules/pets/services/ListPetsService';
import ListPetByIdService from '@modules/pets/services/ListPetByIdService';
import DeletePetService from '@modules/pets/services/DeletePetService';

export default class PetsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPets = container.resolve(ListPetsService);

    const pets = await listPets.execute();

    return response.json(pets);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listPetById = container.resolve(ListPetByIdService);

    const pet = await listPetById.execute(id);

    return response.json(pet);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      userId,
      name,
      species,
      breed,
      age,
      weight,
      location,
    } = request.body;

    const createPet = container.resolve(CreatePetService);

    const pet = await createPet.execute({
      userId,
      name,
      species,
      breed,
      age,
      weight,
      location,
    });

    return response.json(pet);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      userId,
      name,
      species,
      breed,
      age,
      weight,
      location,
    } = request.body;

    const updatePet = container.resolve(UpdatePetService);

    const pet = await updatePet.execute({
      id,
      userId,
      name,
      species,
      breed,
      age,
      weight,
      location,
    });

    return response.json(pet);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePet = container.resolve(DeletePetService);

    await deletePet.execute(id);

    return response.json({ message: `Pet ${id} deleted` });
  }
}
