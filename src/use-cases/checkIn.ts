import { CheckInsRepositoryInterface } from '@/repositories/checkInsRepositoryInterface';
import { GymsRepositoryInterface } from '@/repositories/gymsRepositoryInterface';
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCordinates';
import { CheckIn } from '@prisma/client';

interface CheckInUseCaseRequest {
   userId: string;
   gymId: string;
   userLatitude: number;
   userLongitude: number;
}

interface CheckInUseCaseResponse {
	checkIn: CheckIn
}


export class CheckInUseCase {
	
	constructor(
		private checkInsRepository: CheckInsRepositoryInterface,
		private gymsRepository: GymsRepositoryInterface
	) {}

	async execute({userId, gymId, userLatitude, userLongitude}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymsRepository.findById(gymId);

		if (!gym) {
			throw new Error;
		}

		const distance = getDistanceBetweenCoordinates(
			{latitude: userLatitude, longitude: userLongitude},
			{latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
		);

		const MAX_DISTANCE = 0.1; // 100 metros

		if (distance > MAX_DISTANCE) {
			throw new Error;
		}

		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());


		if (checkInOnSameDay) {
			throw new Error();
		}
		
		const checkIn = await this.checkInsRepository.create({
			gym_id: gymId,
			user_id: userId
		});

		return {
			checkIn
		};
	}
	
}





