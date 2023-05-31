import {Request, Response} from 'express';

import { makeGetUserMetricsUseCase } from '@/use-cases/factories/makeGetUserMetricsUseCase';

export async function userMetricsController(req: Request, res: Response) {

	const userMetricsGymUseCase = makeGetUserMetricsUseCase();

	const {checkInsCount} =await userMetricsGymUseCase.execute({
		userId: req.user.id,
	});

	return res.status(200).send({
		checkInsCount
	});

}