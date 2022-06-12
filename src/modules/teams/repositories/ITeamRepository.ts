import { Team } from '@prisma/client';

interface ITeamRepository {
  findAll(): Promise<Team[]>;
}

export { ITeamRepository };
