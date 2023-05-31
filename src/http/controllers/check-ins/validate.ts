import {Request, Response} from 'express';
import { z } from 'zod';

import { makeValidateCheckInUseCase } from '@/use-cases/factories/makeValidateCheckInUseCase';

export async function validateCheckInController(req: Request, res: Response) {
	const validateCheckInParamsSchema = z.object({
		checkInId: z.string().uuid()
	});

	const {checkInId} = validateCheckInParamsSchema.parse(req.params);

	const validateCheckInUseCase = makeValidateCheckInUseCase();

	await validateCheckInUseCase.execute({
		checkInId
	});

	return res.status(204).send();

}