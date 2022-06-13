import { Championship, ChampionshipStatus, Team, Match } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ICreateChampionshipDTO } from 'modules/championships/dtos/ICreateChampionshipDTO';
import {
  IChampionshipCompleteInfo,
  IChampionshipRepository,
  IChampionshipWithMatchs,
  IChampionshipWithTeams,
  IRegisterTeams,
} from '../IChampionshipRepository';

interface IChampionshipProps {
  id: string;
  name: string;
  description: string;
  award: number;
  champion: string | null;
  status: ChampionshipStatus;
  teams: Team[];
  matchs: Match[];
  eliminated: string[];
  updatedAt: Date;
  createdAt: Date;
}

class ChampionshipRepositoryInMemory implements IChampionshipRepository {
  championships: IChampionshipProps[] = [];

  async create(data: ICreateChampionshipDTO): Promise<Championship> {
    const championship = {
      id: randomUUID(),
      description: data.description,
      name: data.name,
      award: data.award,
      eliminated: [],
      teams: [],
      matchs: [],
      champion: null,
      status: ChampionshipStatus.PENDING,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    this.championships.push(championship);

    return championship;
  }

  async findByName(name: string): Promise<Championship | null> {
    const championship = this.championships.find((championship) => championship.name === name) as Championship;

    return championship;
  }

  async findById(id: string): Promise<IChampionshipCompleteInfo | null> {
    const championship = this.championships.find((championship) => championship.id === id) as IChampionshipCompleteInfo;

    return championship;
  }

  async findAll(): Promise<Championship[]> {
    const all = this.championships;

    return all;
  }

  async update(id: string, name: string, description: string, award: number): Promise<Championship> {
    const championship = this.championships.find((championship) => championship.id === id) as Championship;

    championship.name = name;
    championship.description = description;
    championship.award = award;

    return championship;
  }

  async registerTeams({ name, teams }: IRegisterTeams): Promise<IChampionshipWithTeams | null> {
    const championship = this.championships.find(
      (championship) => championship.name === name,
    ) as IChampionshipWithTeams;

    teams.forEach((team) => {
      championship.teams.push({
        id: randomUUID(),
        name: team.name,
        abbreviation: team.abbreviation,
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    });

    return championship;
  }

  async findTeams(name: string): Promise<IChampionshipWithTeams | null> {
    const championship = this.championships.find(
      (championship) => championship.name === name,
    ) as IChampionshipWithTeams;

    return championship;
  }

  async findMatchs(championshipName: string): Promise<IChampionshipWithMatchs | null> {
    const championship = this.championships.find(
      (championship) => championship.name === championshipName,
    ) as IChampionshipWithMatchs;

    return championship;
  }

  async deleteTeam(championshipId: string, teamName: string): Promise<Championship> {
    const championship = this.championships.find(
      (championship) => championship.id === championshipId,
    ) as IChampionshipWithTeams;

    championship.teams.filter((team) => team.name !== teamName);

    const championshipReturn = {
      id: championship.id,
      name: championship.name,
      description: championship.description,
      award: championship.award,
      champion: championship.champion,
      status: championship.status,
      eliminated: championship.eliminated,
      updatedAt: championship.updatedAt,
      createdAt: championship.createdAt,
    };

    return championshipReturn;
  }

  async updateStatus(name: string, status: string): Promise<Championship> {
    const championship = this.championships.find((championship) => championship.name === name) as Championship;

    if (status === 'start') {
      championship.status = ChampionshipStatus.INITIATED;
    } else if (status === 'finish') {
      championship.status = ChampionshipStatus.FINISHED;
    }

    return championship;
  }

  async updateEliminated(id: string, eliminated: string[]): Promise<Championship> {
    const championship = this.championships.find((championship) => championship.id === id) as Championship;

    championship.eliminated = eliminated;

    return championship;
  }

  async updateChampion(id: string, winner: string): Promise<IChampionshipCompleteInfo> {
    const championship = this.championships.find((championship) => championship.id === id) as IChampionshipCompleteInfo;

    championship.champion = winner;

    return championship;
  }
}

export { ChampionshipRepositoryInMemory };
