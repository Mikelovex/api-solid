import { PrismaCheckInRepository } from '@/repositories/prisma/prismaCheckInRepository';
import { FetchCheckInsHistoryUseCase } from '../fetchUserCheckInsHistory';

export function makeFetchUserCheckInsHistoryUseCase() {
	const checkInRepository = new PrismaCheckInRepository();
	const useCase = new FetchCheckInsHistoryUseCase(checkInRepository);

	return useCase;
}