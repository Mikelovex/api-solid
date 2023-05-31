import { UsersRepositoryInterface } from '@/repositories/usersRepositoryInterface';
import { User } from '@prisma/client';

interface GetUserProfileUseCaseRequest {
    userId: string;
}

interface GetUserProfileUseCaseResponse {
    user: User;
}


export class GetUserProfileUseCase {

	constructor(private usersRepository: UsersRepositoryInterface) {}

	async execute({ userId }:GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.usersRepository.findById(userId);

		if(!user) {
			throw new Error('User does not exist');
		}

		return { user };

	}
}
