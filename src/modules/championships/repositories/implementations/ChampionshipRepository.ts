import { Championship } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';

import { ICreateChampionshipDTO } from '../../dtos/ICreateChampionshipDTO';
import { IChampionshipRepository } from '../IChampionshipRepository';

class ChampionshipRepository implements IChampionshipRepository {
  async create(data: ICreateChampionshipDTO): Promise<Championship> {
    const championship = await prisma.championship.create({
      data,
    });

    return championship;
  }

  async findByName(name: string): Promise<Championship | null> {
    const championship = await prisma.championship.findUnique({
      where: {
        name,
      },
    });

    return championship;
  }

  async findAll(): Promise<Championship[]> {
    const championships = await prisma.championship.findMany();

    return championships;
  }

  async update(id: string, name: string, description: string, award: number): Promise<Championship> {
    const championship = await prisma.championship.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        award,
      },
    });

    return championship;
  }
}

export { ChampionshipRepository };
