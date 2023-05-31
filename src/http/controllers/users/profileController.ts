import { makeGetUserProfileUseCase } from '@/use-cases/factories/makeGetUserProfileUseCase';
import {Request, Response} from 'express';


export async function profileController(req: Request, res: Response) {

	const getUserProfile = makeGetUserProfileUseCase();

	const { user } = await getUserProfile.execute({
		userId: req.user.id
	});


	return res.status(200).send({
		user: {
			...user,
			password_hash: undefined
		}
	});
}