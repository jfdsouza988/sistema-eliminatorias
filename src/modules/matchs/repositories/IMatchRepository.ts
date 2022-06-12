import { Match } from '@prisma/client';
import { ICreateMatchDTO } from '../dtos/ICreateMatchDTO';

interface IMatchRepository {
  create(data: ICreateMatchDTO): Promise<Match>;
}

export { IMatchRepository };
