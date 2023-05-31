import { CheckInsRepositoryInterface } from '@/repositories/checkInsRepositoryInterface';
import { CheckIn } from '@prisma/client';

interface FetchUserCheckInHistoryUseCaseRequest {
   userId: string;
   page: number;
}

interface FetchUserCheckInHistoryUseCaseResponse {
	checkIns: CheckIn[]
}


export class FetchCheckInsHistoryUseCase {
	
	constructor(
		private checkInsRepository: CheckInsRepositoryInterface
	) {}

	async execute({userId, page}: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
		const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);


		return {
			checkIns
		};
	}
	
}





