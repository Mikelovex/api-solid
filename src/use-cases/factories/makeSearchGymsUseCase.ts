import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository';
import { SearchGymsUseCase } from '../searchGyms';

export function makeSearchGymUseCase() {
	const gymsRepository = new PrismaGymsRepository();
	const useCase = new SearchGymsUseCase(gymsRepository);

	return useCase;
}