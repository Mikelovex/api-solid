import {Request, Response} from 'express';
import { z } from 'zod';

import { makeAuthenticateUseCase } from '@/use-cases/factories/makeAuthenticateUseCase';
import { sign } from 'jsonwebtoken';

export async function authenticateController(req: Request, res: Response) {
	const registerBodoSchema = z.object({
		email: z.string().email(),
		password: z.string().min(6)
	});

	const { email, password } = registerBodoSchema.parse(req.body);

	try {
	
		const authenticateUseCase = makeAuthenticateUseCase();

		const { user } = await authenticateUseCase.execute({
			email, password
		});


		const token = sign({}, 'jwt-secret-01',  {
			subject: user.id,
			expiresIn: '10m',
			
		});


		return res.status(200).send({token});


	}catch (err) {
		return res.status(409).send();
	}

}