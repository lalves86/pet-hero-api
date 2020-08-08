import Pet from '../infra/typeorm/entities/Pet';
import ICreatePetDTO from '../dtos/ICreatePetDTO';

interface IHeroesRepository {
  findByName(name: string): Promise<Pet | undefined>;
  findById(id: string): Promise<Pet | undefined>;
  all(): Promise<Pet[]>;
  create(data: ICreatePetDTO): Promise<Pet>;
  save(Pet: Pet): Promise<Pet>;
  delete(id: string): Promise<void>;
}

export default IHeroesRepository;
