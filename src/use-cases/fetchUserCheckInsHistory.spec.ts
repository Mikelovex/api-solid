import { InMemoryCheckInRepository } from '@/repositories/inMemory/inMemoryCheckInRepository';
import {expect, describe, it, beforeEach, vi} from 'vitest';
import { FetchCheckInsHistoryUseCase } from './fetchUserCheckInsHistory';


let checkInsRepository: InMemoryCheckInRepository;
let sut: FetchCheckInsHistoryUseCase;

describe('Fecth user Check in history Use Case', () => {

	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInRepository();
		sut = new FetchCheckInsHistoryUseCase(checkInsRepository);
	});


	it('should be able to check in', async () => {

		await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});

		await checkInsRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		});


		const { checkIns } = await sut.execute({
			userId: 'user-01',
			page: 1
		});

		expect(checkIns).toHaveLength(2);
		expect(checkIns).toEqual([
			expect.objectContaining({gym_id: 'gym-01'}),
			expect.objectContaining({gym_id: 'gym-02'})
		]);
	});

	it('should be able to fetch paginated check-in history', async () => {

		for (let i = 1; i <= 22; i++) {
			await checkInsRepository.create({
				gym_id: `gym-${i}`,
				user_id: 'user-01',
			});
		}

		const { checkIns } = await sut.execute({
			userId: 'user-01',
			page: 2
		});

		expect(checkIns).toHaveLength(2);
		expect(checkIns).toEqual([
			expect.objectContaining({gym_id: 'gym-21'}),
			expect.objectContaining({gym_id: 'gym-22'})
		]);
	});

});