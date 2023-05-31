import {Request, Response} from 'express';
import { z } from 'zod';

import { makeCreateGymUseCase } from '@/use-cases/factories/makeCreateGymUseCase';

export async function createGymController(req: Request, res: Response) {
	const createGymBodySchema = z.object({
		title: z.string(),
		description: z.string(),
		phone: z.string().nullable(),
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90;
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180;
		})
	});


	const {title, description, phone, latitude, longitude} = createGymBodySchema.parse(req.body);

	const createGymUseCase = makeCreateGymUseCase();

	await createGymUseCase.execute({
		title, description, phone, latitude, longitude
	});

	return res.status(201).send();

}