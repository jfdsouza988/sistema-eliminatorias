import { inject } from 'tsyringe';
import { IMatchRepository } from '../../../matchs/repositories/IMatchRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IChampionshipRepository } from '../../repositories/IChampionshipRepository';

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

    await Promise.all(
      championship.matchs.map(async (match) => {
        const currentIndex = championship.matchs.indexOf(match);

        await this.matchRepository.create({
          championshipId: championship.id,
          matchNumber,
          teamA: match.winner as string,
          teamB: championship.matchs[currentIndex + 1].winner as string,
        });

        matchNumber += 1;
      }),
    );

    const championshipUpdated = await this.championshipRepository.findMatchs(name);

    return championshipUpdated;
  }
}
