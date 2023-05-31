import {Request, Response} from 'express';
import { z } from 'zod';

import { makeRegisterUseCase } from '@/use-cases/factories/makeRegisterUseCase';

export async function registerController(req: Request, res: Response) {
	const registerBodoSchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	});


	const {name, email, password} = registerBodoSchema.parse(req.body);

	try {
		const registerUseCase = makeRegisterUseCase();

		await registerUseCase.execute({
			name, email, password
		});

		return res.status(201).send();

	}catch (err) {
		return res.status(409).send();
	}

}