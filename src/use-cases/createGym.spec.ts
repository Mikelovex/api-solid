import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository';
import {expect, describe, it, beforeEach} from 'vitest';
import { CreateGymUseCase } from './createGym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {

	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository();
		sut = new CreateGymUseCase(gymsRepository);
	});

	it('should be able to create gym', async () => {

		const { gym } = await sut.execute({
			title: 'javascript',
			description: null,
			phone: null,
			latitude: 0,
			longitude: 0
		});

		expect(gym.id).toEqual(expect.any(String));

	});

	// it('should hash user password upon registration', async () => {

	// 	const { user } = await sut.execute({
	// 		name: 'nome',
	// 		email: 'email@email.com',
	// 		password: '123456'
	// 	});


	// 	const isPasswordHashed = await compare('123456', user.password_hash);

	// 	expect(isPasswordHashed).toBe(true);

	// });
});