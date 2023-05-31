import { afterAll, beforeAll, describe, expect, it} from 'vitest';

import request from 'supertest';
import { app } from '@/server';
import { PrismaClient } from '@prisma/client';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';


const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-empty-function
describe('Create checkIn (e2e)', () => {
	beforeAll(async () => {
		await app.listen();
		await prisma.$connect();
	});

	afterAll(async () => {
		await prisma.$disconnect();
		await app.listen().close();
	});


	it('should be able to create a checkIn', async () => {
	
		const { token } = await createAndAuthenticateUser(app);

		const gym = await prisma.gym.create({
			data: {
				title: 'Javascript',
				latitude: -21.933241,
				longitude: -46.6753361
			}
		});

		const response = await request(app)
			.post(`/gyms/${gym.id}/check-ins`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: -21.933241,
				longitude: -46.6753361
			});

		expect(response.statusCode).toEqual(201);

	});
});