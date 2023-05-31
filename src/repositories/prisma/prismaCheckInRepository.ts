import { prisma } from '@/lib/prisma';
import { Prisma, CheckIn } from '@prisma/client';
import { CheckInsRepositoryInterface } from '../checkInsRepositoryInterface';

export class PrismaCheckInRepository implements CheckInsRepositoryInterface {
	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn = await prisma.checkIn.create({data});

		return checkIn;
	}
	async findById(id: string) {
		const checkIn = await prisma.checkIn.findUnique({
			where: {
				id
			}
		});

		return checkIn;
	}

	async findByUserIdOnDate(
		userId: string,
		date: Date,
	): Promise<CheckIn | null> {
		const checkIn = await prisma.checkIn.findFirst({
			where: {
				user_id: userId,
				created_at: {
					equals: new Date(
						date.getFullYear(),
						date.getMonth() - 1,
						date.getDay(),
					),
				},
			},
		});
		return checkIn;
	}
      
	async findManyByUserId(userId: string, page: number) {
		const checkIns = await prisma.checkIn.findMany({
			where: {
				user_id: userId
			}, 
			take: 20,
			skip: (page - 1) * 20
		});

		return checkIns;
	}
	async countByUserId(userId: string) {
		const count = await prisma.checkIn.count({
			where: {
				user_id: userId
			}
		});

		return count;
	}
	async save(data: CheckIn) {
		const checkIn = await prisma.checkIn.update({
			where: {
				id: data.id
			},
			data
		});

		return checkIn;
	}
    
}