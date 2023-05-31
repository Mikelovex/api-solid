import { UsersRepositoryInterface } from '@/repositories/usersRepositoryInterface';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

interface registerUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

interface registerUseCaseResponse {
	user: User
}


export class RegisterUseCase {
	
	constructor(private usersRepository: UsersRepositoryInterface) {}

	async execute({name, email, password}: registerUseCaseRequest): Promise<registerUseCaseResponse> {
		const password_hash = await hash(password, 6);
	
		const userWithSameEmail = await this.usersRepository.findByEmail(email);
	
		if (userWithSameEmail) {
			throw new Error('Email already exists');
		}
		
		const user = await this.usersRepository.create({
			name, email, password_hash
		});


		return { user };
	}
	
}





