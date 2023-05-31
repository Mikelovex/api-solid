import {Request, Response} from 'express';
import { z } from 'zod';

import { makeSearchGymUseCase } from '@/use-cases/factories/makeSearchGymsUseCase';

export async function searchGymController(req: Request, res: Response) {
	const searchGymQuerySchema = z.object({
		q: z.string(),
		page: z.coerce.number().min(1).default(1)
	});


	const {q, page} = searchGymQuerySchema.parse(req.query);

	const searchGymUseCase = makeSearchGymUseCase();

	const {gyms} =await searchGymUseCase.execute({
		query: q,
		page
	});

	return res.status(200).send({
		gyms
	});

}