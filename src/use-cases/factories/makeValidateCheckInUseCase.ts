import { PrismaCheckInRepository } from '@/repositories/prisma/prismaCheckInRepository';
import { ValidateCheckInUseCase } from '../validateCheckIn';

export function makeValidateCheckInUseCase() {
	const checkInRepository = new PrismaCheckInRepository();
	const useCase = new ValidateCheckInUseCase(checkInRepository);

	return useCase;
}