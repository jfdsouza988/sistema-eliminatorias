import { Team } from '@prisma/client';

interface ITeamRepository {
  findAll(): Promise<Team[]>;
  findByName(name: string): Promise<Team | null>;
  update(id: string, name: string, abbreviation: string): Promise<Team>;
}

export { ITeamRepository };
