import { Championship, Match, Team } from '@prisma/client';
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

export interface IChampionshipWithMatchs extends Championship {
  matchs: Match[];
}

export interface IChampionshipCompleteInfo extends Championship {
  teams: Team[];
  matchs: Match[];
}

interface IChampionshipRepository {
  create(data: ICreateChampionshipDTO): Promise<Championship>;
  findByName(name: string): Promise<Championship | null>;
  findById(id: string): Promise<IChampionshipCompleteInfo | null>;
  findAll(): Promise<Championship[]>;
  update(id: string, name: string, description: string, award: number): Promise<Championship>;
  registerTeams({ name, teams }: IRegisterTeams): Promise<IChampionshipWithTeams | null>;
  findTeams(name: string): Promise<IChampionshipWithTeams | null>;
  findMatchs(championshipName: string): Promise<IChampionshipWithMatchs | null>;
  deleteTeam(championshipId: string, teamName: string): Promise<Championship>;
  updateStatus(name: string, status: string): Promise<Championship>;
  updateEliminated(id: string, eliminated: string[]): Promise<Championship>;
  updateChampion(id: string, winner: string): Promise<IChampionshipCompleteInfo>;
}

export { IChampionshipRepository };
