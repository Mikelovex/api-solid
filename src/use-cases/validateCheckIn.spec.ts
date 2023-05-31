import { InMemoryCheckInRepository } from '@/repositories/inMemory/inMemoryCheckInRepository';
import {expect, describe, it, beforeEach, vi} from 'vitest';
import { ValidateCheckInUseCase } from './validateCheckIn';


let checkInsRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInUseCase;

describe('Validate Check in Use Case', () => {

	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInRepository();
		sut = new ValidateCheckInUseCase(checkInsRepository);

		vi.useFakeTimers();
	});


	it('should be able to validate check in', async () => {

		const createdCheckIn = await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});


		const {checkIn} = await sut.execute({
			checkInId: createdCheckIn.id
		});
	

		expect(checkIn.validated_at).toEqual(expect.any(Date));
		expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));

	});


	it('should not be able to validate an inexistent check in', async () => {
		await expect(() => 
			sut.execute({
				checkInId: 'inexistent-checkIn',
			})
		).rejects.toBeInstanceOf(Error);
	});

	it('sould not be able to valudate a check in after 20 minutes of its creation', async () => {
		vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

		const createdCheckIn = await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});

		const minutes = 1000 * 60 * 21; // 21 minutos

		vi.advanceTimersByTime(minutes);

		await expect(() => 
			sut.execute({
				checkInId: createdCheckIn.id
			})
		).rejects.toBeInstanceOf(Error);
	});
});