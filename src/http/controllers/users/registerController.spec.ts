import { afterAll, beforeAll, describe, expect, it} from 'vitest';

import request from 'supertest';
import { app } from '@/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
// eslint-disable-next-line @typescript-eslint/no-empty-function
describe('Register (e2e)', () => {
	beforeAll(async () => {
		await app.listen();
		await prisma.$connect();
	});

	afterAll(async () => {
		await prisma.$disconnect();
		await app.listen().close();
	});

	it('should be able to register', async () => {
		const response = await request(app)
			.post('/user')
			.send({
				name: 'name',
				email: 'name@example.com',
				password: 'password'
			});

		expect(response.statusCode).toEqual(201);

	});
});