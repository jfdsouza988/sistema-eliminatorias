import { Championship, Team } from '@prisma/client';
import { ICreateChampionshipDTO } from '../dtos/ICreateChampionshipDTO';

interface ITeam {
  name: string;
  abbreviation: string;
}

export interface IRegisterTeams {
  name: string;
  teams: ITeam[];
}

export interface IChampionshipWithTeams extends Championship {
  teams: Team[];
}

interface IChampionshipRepository {
  create(data: ICreateChampionshipDTO): Promise<Championship>;
  findByName(name: string): Promise<Championship | null>;
  findAll(): Promise<Championship[]>;
  update(id: string, name: string, description: string, award: number): Promise<Championship>;
  registerTeams({ name, teams }: IRegisterTeams): Promise<Championship | null>;
  findTeams(name: string): Promise<IChampionshipWithTeams | null>;
  deleteTeam(championshipId: string, teamName: string): Promise<Championship>;
  updateStatus(name: string, status: string): Promise<Championship>;
}

export { IChampionshipRepository };
