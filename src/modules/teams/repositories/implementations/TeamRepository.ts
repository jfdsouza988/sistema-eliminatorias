import { Team } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';
import { ITeamRepository } from '../ITeamRepository';

class TeamRepository implements ITeamRepository {
  async findAll(): Promise<Team[]> {
    const allTeams = await prisma.team.findMany();

    return allTeams;
  }

  async findByName(name: string): Promise<Team | null> {
    const team = await prisma.team.findUnique({
      where: {
        name,
      },
      include: {
        championships: true,
      },
    });

    return team;
  }

  async update(id: string, name: string, abbreviation: string): Promise<Team> {
    const team = await prisma.team.update({
      where: {
        id,
      },
      data: {
        name,
        abbreviation,
      },
    });

    return team;
  }
}

export { TeamRepository };
