import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository';
import { FetchNearbyGymsUseCase } from '../fetchNearbyGyms';

export function makeFetchNearbyUseCase() {
	const gymsRepository = new PrismaGymsRepository();
	const useCase = new FetchNearbyGymsUseCase(gymsRepository);

	return useCase;
}