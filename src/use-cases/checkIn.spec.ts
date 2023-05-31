import { InMemoryCheckInRepository } from '@/repositories/inMemory/inMemoryCheckInRepository';
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository';
import { Decimal } from '@prisma/client/runtime/library';
import {expect, describe, it, beforeEach, vi} from 'vitest';
import { CheckInUseCase } from './checkIn';


let checkInsRepository: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check in Use Case', () => {

	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInRepository();
		gymsRepository = new InMemoryGymsRepository();
		sut = new CheckInUseCase(checkInsRepository, gymsRepository);

		await gymsRepository.create({
			id: 'gym-01',
			title: 'gym',
			description: '',
			phone: '',
			latitude: 0,
			longitude: 0
		});
	});


	it('should be able to check in', async () => {

		const { checkIn } = await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: 0,
			userLongitude: 0
		});

		expect(checkIn.id).toEqual(expect.any(String));

	});

	it('should not be able to check in twice in the same day', async () => {

		vi.setSystemTime(new Date(2022, 0, 28, 8, 0, 0));

		await sut.execute({gymId: 'gym-01', userId: 'user-01', userLatitude: 0,
			userLongitude: 0});

		await expect(() => sut.execute({gymId: 'gym-01', userId: 'user-01', userLatitude: 0,
			userLongitude: 0})).rejects.toBeInstanceOf(Error);

	});

	it('should be able to check in twice in different days', async () => {

		vi.setSystemTime(new Date(2022, 0, 28, 8, 0, 0));

		await sut.execute({gymId: 'gym-01', userId: 'user-01', userLatitude: 0,
			userLongitude: 0});


		vi.setSystemTime(new Date(2022, 0, 29, 8, 0, 0));

		const {checkIn} = await sut.execute({gymId: 'gym-01', userId: 'user-01', userLatitude: 0,
			userLongitude: 0});

		expect(checkIn.id).toEqual(expect.any(String));
		
	});

	it('should not be able to check in on distant gym', async () => {

		gymsRepository.items.push({
			id: 'gym-01',
			title: 'gym',
			description: '',
			phone: '',
			latitude: new Decimal(-23.5600757),
			longitude: new Decimal(-46.623921)
		});


		await expect(() => sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -23.6745721,
			userLongitude: -46.6415811
		})).rejects.toBeInstanceOf(Error);

	});


});