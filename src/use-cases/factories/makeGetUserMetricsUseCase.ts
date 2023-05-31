import { PrismaCheckInRepository } from '@/repositories/prisma/prismaCheckInRepository';
import { GetUserMetricsUseCase } from '../getUserMetrics';

export function makeGetUserMetricsUseCase() {
	const checkInRepository = new PrismaCheckInRepository();
	const useCase = new GetUserMetricsUseCase(checkInRepository);

	return useCase;
}