import { UsersRepositoryInterface } from '@/repositories/usersRepositoryInterface';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User;
}


export class AuthenticateUseCase {

	constructor(private usersRepository: UsersRepositoryInterface) {}

	async execute({email, password}:AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if(!user) {
			throw new Error('User does not exist');
		}


		const passwordsMatches = await compare(password, user.password_hash);


		if(!passwordsMatches) {
			throw new Error('User does not exist');
		}

		return { user };

	}
}
