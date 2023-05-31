import { afterAll, beforeAll, describe, expect, it} from 'vitest';

import request from 'supertest';
import { app } from '@/server';
import { PrismaClient } from '@prisma/client';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';


const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-empty-function
describe('Search gym (e2e)', () => {
	beforeAll(async () => {
		await app.listen();
		await prisma.$connect();
	});

	afterAll(async () => {
		await prisma.$disconnect();
		await app.listen().close();
	});


	it('should be able to search a gym by title', async () => {
	
		const { token } = await createAndAuthenticateUser(app);

		await request(app)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Javascript',
				description: 'description',
				phone: '119999999',
				latitude: -23.6555087,
				longitude: -46.641581
			});

		await request(app)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Typescript',
				description: 'description',
				phone: '119999999',
				latitude: -21.933241,
				longitude: -46.6753361
			});


		const response = await request(app)
			.get('/gyms/nearby')
			.query({
				latitude: -23.6555087,
				longitude: -46.641581
			})
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: 'Javascript'
			})
		]);

	});
});