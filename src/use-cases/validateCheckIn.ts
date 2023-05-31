import { CheckInsRepositoryInterface } from '@/repositories/checkInsRepositoryInterface';
import { CheckIn } from '@prisma/client';
import dayjs from 'dayjs';

interface ValidateCheckInUseCaseRequest {
   checkInId: string
}

interface ValidateCheckInUseCaseResponse {
	checkIn: CheckIn
}


export class ValidateCheckInUseCase {
	
	constructor(
		private checkInsRepository: CheckInsRepositoryInterface,
	) {}

	async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
		const checkIn = await this.checkInsRepository.findById(checkInId);

		if (!checkIn) {
			throw new Error;
		}

		const distanceInMinutes = dayjs(new Date()).diff(checkIn.created_at, 'minutes');


		if (distanceInMinutes > 20) {
			throw new Error;
		}

		checkIn.validated_at = new Date();

		await this.checkInsRepository.save(checkIn);

		return {
			checkIn
		};
	}
	
}





