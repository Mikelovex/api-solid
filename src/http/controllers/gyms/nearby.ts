import {Request, Response} from 'express';
import { z } from 'zod';

import { makeFetchNearbyUseCase } from '@/use-cases/factories/makeFetchNearbyUseCase';

export async function nearbyGymController(req: Request, res: Response) {
	const nearbyGymsQuerySchema = z.object({
		latitude: z.coerce.number().refine((value) => {
			return Math.abs(value) <= 90;
		}),
		longitude: z.coerce.number().refine((value) => {
			return Math.abs(value) <= 180;
		})
	});


	const {latitude, longitude} = nearbyGymsQuerySchema.parse(req.query);

	const nearbyGymUseCase = makeFetchNearbyUseCase();

	const {gyms} =await nearbyGymUseCase.execute({
		userLatitude: latitude,
		userLongitude: longitude
	});

	return res.status(200).send({
		gyms
	});

}