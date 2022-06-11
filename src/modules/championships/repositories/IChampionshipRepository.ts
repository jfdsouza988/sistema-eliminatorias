import { Championship } from '@prisma/client';
import { ICreateChampionshipDTO } from '../dtos/ICreateChampionshipDTO';

interface IChampionshipRepository {
  create(data: ICreateChampionshipDTO): Promise<Championship>;
  findByName(name: string): Promise<Championship | null>;
  findAll(): Promise<Championship[]>;
  update(id: string, name: string, description: string, award: number): Promise<Championship>;
}

export { IChampionshipRepository };
