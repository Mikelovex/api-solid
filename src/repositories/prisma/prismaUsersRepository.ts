import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UsersRepositoryInterface } from '../usersRepositoryInterface';

export class PrismaUsersRepository implements UsersRepositoryInterface{

	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data
		});


		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		return user;
	}

	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id: id
			}
		});

		return user;
	}

}