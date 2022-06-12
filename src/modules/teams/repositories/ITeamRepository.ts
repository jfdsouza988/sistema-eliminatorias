import { Championship, Team } from '@prisma/client';

export interface ITeamWithChampionships extends Team {
  championships: Championship[];
}

interface ITeamRepository {
  findAll(): Promise<Team[]>;
  findByName(name: string): Promise<ITeamWithChampionships | null>;
  update(id: string, name: string, abbreviation: string): Promise<Team>;
  delete(name: string): Promise<Team>;
}

export { ITeamRepository };
