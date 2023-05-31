import { afterAll, beforeAll, describe, expect, it} from 'vitest';

import request from 'supertest';
import { app } from '@/server';
import { PrismaClient } from '@prisma/client';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';


const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-empty-function
describe('Profile (e2e)', () => {
	beforeAll(async () => {
		await app.listen();
		await prisma.$connect();
	});

	afterAll(async () => {
		await prisma.$disconnect();
		await app.listen().close();
	});


	it('should be able to get user profile', async () => {
	
		const { token } = await createAndAuthenticateUser(app);

		const profileResponse = await request(app)
			.get('/me')
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(profileResponse.statusCode).toEqual(200);
		expect(profileResponse.body.user).toEqual(
			expect.objectContaining({
				email: 'name@example.com',
			})
		);

	});
});