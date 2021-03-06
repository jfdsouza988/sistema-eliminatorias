import { inject, injectable } from 'tsyringe';
import { IMatchRepository } from '../../../matchs/repositories/IMatchRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IChampionshipRepository } from '../../repositories/IChampionshipRepository';

@injectable()
export class StartNewPhaseOfChampionshipUseCase {
  constructor(
    @inject('ChampionshipRepository')
    private championshipRepository: IChampionshipRepository,
    @inject('MatchRepository')
    private matchRepository: IMatchRepository,
  ) {}

  async execute(name: string) {
    const championship = await this.championshipRepository.findMatchs(name);

    if (!championship) {
      throw new AppError('Championship does not exists');
    }

    if (championship.status === 'FINISHED') {
      throw new AppError('Championship has already finished');
    }

    const matchsInProgress = await this.matchRepository.findMatchsInProgressByChampionship(championship.id);

    if (matchsInProgress.length > 0) {
      throw new AppError('Exists matchs that have not been finished yet');
    }

    let matchNumber = championship.matchs.length + 1;
    let count = 0;

    (async () => {
      while (count < championship.matchs.length - 1) {
        await this.matchRepository.create({
          championshipId: championship.id,
          matchNumber,
          teamA: championship.matchs[count].winner as string,
          teamB: championship.matchs[count + 1].winner as string,
        });

        matchNumber += 1;
        count += 1;
      }
    })();

    const championshipUpdated = await this.championshipRepository.findMatchs(name);

    return championshipUpdated;
  }
}
