import { Match } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';
import { ICreateMatchDTO } from '../../dtos/ICreateMatchDTO';
import { IMatchRepository } from '../IMatchRepository';

class MatchRepository implements IMatchRepository {
  async create(data: ICreateMatchDTO): Promise<Match> {
    const match = await prisma.match.create({
      data,
    });

    return match;
  }
}

export { MatchRepository };
