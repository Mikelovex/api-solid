import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';
import { hash } from 'bcryptjs';
import {expect, describe, it, beforeEach} from 'vitest';
import { GetUserProfileUseCase } from './getUserProfile';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get user profile Use Case', () => {

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new GetUserProfileUseCase(usersRepository);
	});

	it('should be able to get user profile', async () => {

		const userCreated = await usersRepository.create({
			name: 'nome',
			email: 'email@email.com',
			password_hash: await hash('123456', 6)
		});


		const { user } = await sut.execute({
			userId: userCreated.id
		});

		expect(user.name).toEqual('nome');

	});

	it('should not be able to get user profile with wrong id', async () => {

		await expect(() => sut.execute({
			userId: 'non-existing'
		})).rejects.toBeInstanceOf(Error);

	});

});