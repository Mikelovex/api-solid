import { afterAll, beforeAll, describe, expect, it} from 'vitest';

import request from 'supertest';
import { app } from '@/server';
import { PrismaClient } from '@prisma/client';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';


const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-empty-function
describe('Validate checkIn (e2e)', () => {
	beforeAll(async () => {
		await app.listen();
		await prisma.$connect();
	});

	afterAll(async () => {
		await prisma.$disconnect();
		await app.listen().close();
	});


	it('should be able to validate a checkIn', async () => {
	
		const { token } = await createAndAuthenticateUser(app);

		const user = await prisma.user.findFirstOrThrow();

		const gym = await prisma.gym.create({
			data: {
				title: 'Javascript',
				latitude: -21.933241,
				longitude: -46.6753361
			}
		});


		let checkIn = await prisma.checkIn.create({
			data: {
				gym_id: gym.id,
				user_id: user.id,
			},
		});

		const response = await request(app)
			.patch(`/check-ins/${checkIn.id}/validate`)
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(204);

		checkIn = await prisma.checkIn.findUniqueOrThrow({
			where: {
				id: checkIn.id,
			}
		});

		expect(checkIn.validated_at).toEqual(expect.any(Date));

	});
});