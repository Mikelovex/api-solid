import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository';
import {expect, describe, it, beforeEach} from 'vitest';
import { SearchGymsUseCase } from './searchGyms';


let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {

	beforeEach(async () => {
		gymsRepository = new InMemoryGymsRepository();
		sut = new SearchGymsUseCase(gymsRepository);
	});


	it('should be able to search for gyms', async () => {

		await gymsRepository.create({
			title: 'Javascript',
			description: null,
			phone: null,
			latitude: 0,
			longitude: 0
		});

		await gymsRepository.create({
			title: 'Typescript',
			description: null,
			phone: null,
			latitude: 0,
			longitude: 0

		});


		const { gyms } = await sut.execute({
			query: 'Javascript',
			page: 1
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([
			expect.objectContaining({title: 'Javascript'}),
		]);
	});

	it('should be able to fetch paginated check-in history', async () => {

		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `Typescript-${i}`,
				description: null,
				phone: null,
				latitude: 0,
				longitude: 0
			});
		}

		const { gyms } = await sut.execute({
			query: 'Typescript',
			page: 2
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({title: 'Typescript-21'}),
			expect.objectContaining({title: 'Typescript-22'})
		]);
	});

});