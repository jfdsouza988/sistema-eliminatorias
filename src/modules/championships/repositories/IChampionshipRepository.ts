import { Championship } from '@prisma/client';
import { ICreateChampionshipDTO } from '../dtos/ICreateChampionshipDTO';

interface ITeam {
  name: string;
  abbreviation: string;
}

export interface IRegisterTeams {
  name: string;
  teams: ITeam[];
}

interface IChampionshipRepository {
  create(data: ICreateChampionshipDTO): Promise<Championship>;
  findByName(name: string): Promise<Championship | null>;
  findAll(): Promise<Championship[]>;
  update(id: string, name: string, description: string, award: number): Promise<Championship>;
  registerTeams({ name, teams }: IRegisterTeams): Promise<Championship | null>;
  findTeams(name: string): Promise<Championship | null>;
  deleteTeam(championshipId: string, teamName: string): Promise<Championship>;
}

export { IChampionshipRepository };
