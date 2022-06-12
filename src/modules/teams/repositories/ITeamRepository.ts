import { Team } from '@prisma/client';

interface ITeamRepository {
  findAll(): Promise<Team[]>;
  findByName(name: string): Promise<Team | null>;
}

export { ITeamRepository };
