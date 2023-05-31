import {Request, Response} from 'express';
import { z } from 'zod';

import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/makeFetchUserCheckInsHistoryUseCase';

export async function checkInHistoryController(req: Request, res: Response) {
	const checkInHistoryGymQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1)
	});


	const { page} = checkInHistoryGymQuerySchema.parse(req.query);

	const checkInHistoryGymUseCase = makeFetchUserCheckInsHistoryUseCase();

	const {checkIns} =await checkInHistoryGymUseCase.execute({
		userId: req.user.id,
		page
	});

	return res.status(200).send({
		checkIns
	});

}