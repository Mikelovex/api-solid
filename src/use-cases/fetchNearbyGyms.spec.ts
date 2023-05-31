import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository';
import {expect, describe, it, beforeEach} from 'vitest';
import { FetchNearbyGymsUseCase } from './fetchNearbyGyms';


let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch nearby Gyms Use Case', () => {

	beforeEach(async () => {
		gymsRepository = new InMemoryGymsRepository();
		sut = new FetchNearbyGymsUseCase(gymsRepository);
	});


	it('should be able to featch nearby gyms', async () => {

		await gymsRepository.create({
			title: 'near gym',
			description: null,
			phone: null,
			latitude: -23.6555087,
			longitude: -46.641581
		});

		await gymsRepository.create({
			title: 'far gym',
			description: null,
			phone: null,
			latitude: -21.933241,
			longitude: -46.6753361

		});


		const { gyms } = await sut.execute({
			userLatitude: -23.6555087,
			userLongitude: -46.641581
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([
			expect.objectContaining({title: 'near gym'}),
		]);
	});
});