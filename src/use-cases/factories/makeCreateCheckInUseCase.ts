import { PrismaCheckInRepository } from '@/repositories/prisma/prismaCheckInRepository';
import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository';
import { CheckInUseCase } from '../checkIn';

export function makeCreateCheckInUseCase() {
	const checkInRepository = new PrismaCheckInRepository();
	const gymsRepository = new PrismaGymsRepository();
	const useCase = new CheckInUseCase(checkInRepository, gymsRepository);

	return useCase;
}