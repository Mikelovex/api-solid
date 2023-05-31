import { CheckInsRepositoryInterface } from '@/repositories/checkInsRepositoryInterface';

interface GetUserMetricsUseCaseRequest {
   userId: string;
}

interface GetUserMetricsUseCaseResponse {
	checkInsCount: number;
}


export class GetUserMetricsUseCase {
	
	constructor(
		private checkInsRepository: CheckInsRepositoryInterface
	) {}

	async execute({userId}: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
		const checkInsCount = await this.checkInsRepository.countByUserId(userId);


		return {
			checkInsCount
		};
	}
	
}





