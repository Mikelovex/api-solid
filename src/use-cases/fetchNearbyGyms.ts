import { GymsRepositoryInterface } from '@/repositories/gymsRepositoryInterface';
import { Gym } from '@prisma/client';

interface FetchNearbyGymsUseCaseRequest {
   userLatitude: number;
   userLongitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
	gyms: Gym[]
}


export class FetchNearbyGymsUseCase {
	
	constructor(private gymsRepository: GymsRepositoryInterface) {}

	async execute({userLatitude, userLongitude}: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
		
		
		const gyms = await this.gymsRepository.findManyNearby({
			latitude: userLatitude,
			longitude: userLongitude
		});


		return { gyms };
	}
	
}





