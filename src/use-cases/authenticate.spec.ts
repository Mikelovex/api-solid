import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';
import { hash } from 'bcryptjs';
import {expect, describe, it, beforeEach} from 'vitest';
import { AuthenticateUseCase } from './authenticate';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new AuthenticateUseCase(usersRepository);
	});

	it('should be able to authenticate', async () => {

		await usersRepository.create({
			name:'name',
			email: 'email@email.com',
			password_hash: await hash('123456', 6)
		});

		const { user } = await sut.execute({
			email: 'email@email.com',
			password: '123456'
		});

		expect(user.id).toEqual(expect.any(String));

	});

	it('should not be able to authenticate with wrong email', async () => {

		expect(() => sut.execute({
			email: 'email@email.com',
			password: '123456'
		})).rejects.toBeInstanceOf(Error);

	});

	it('should not be able to authenticate with wrong password', async () => {


		await usersRepository.create({
			name:'name',
			email: 'email@email.com',
			password_hash: await hash('123456', 6)
		});

		expect(() => sut.execute({
			email: 'email@email.com',
			password: '1234567'
		})).rejects.toBeInstanceOf(Error);

	});
});