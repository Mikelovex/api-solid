import { makeGetUserProfileUseCase } from '@/use-cases/factories/makeGetUserProfileUseCase';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	const authheader = req.headers.authorization;


	if (!authheader) {
		throw new Error('Token is missing');
	}

	const [, token] = authheader.split(' ');


	try {
		const { sub: user_id } = verify(
			token,
			'jwt-secret-01',
		) as IPayload;



		const getUserProfile = makeGetUserProfileUseCase();


		const { user } = await getUserProfile.execute({
			userId: user_id
		});
        

		if (!user) {
			throw new Error('User does not exists');
		}

		req.user = {
			id: user_id,
		};

		next();
	} catch {
		throw new Error('invalid token');
	}
}