import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';
import { compare } from 'bcryptjs';
import {expect, describe, it, beforeEach} from 'vitest';
import { RegisterUseCase } from './register';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new RegisterUseCase(usersRepository);
	});

	it('should be able to create user', async () => {

		const { user } = await sut.execute({
			name: 'nome',
			email: 'email@email.com',
			password: '123456'
		});

		expect(user.id).toEqual(expect.any(String));

	});

	it('should hash user password upon registration', async () => {

		const { user } = await sut.execute({
			name: 'nome',
			email: 'email@email.com',
			password: '123456'
		});


		const isPasswordHashed = await compare('123456', user.password_hash);

		expect(isPasswordHashed).toBe(true);

	});

	it('should not be able to register with the same email twice', async () => {

		const email = 'email@email.com';

		await sut.execute({
			name: 'nome',
			email,
			password: '123456'
		});

		await expect(() => sut.execute({
			name: 'nome',
			email,
			password: '123456'
		})
		).rejects.toBeInstanceOf(Error);
	});
});