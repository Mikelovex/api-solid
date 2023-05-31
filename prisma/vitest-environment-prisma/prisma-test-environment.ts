import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import 'dotenv/config';
import {Environment} from 'vitest';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

// FUNÇÃO PARA GERAR UMA NOVA URL DO POSTGRESS MUDANDO O VALOR DO SCHEMA
function generateDatabaseURL(schema: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error('No DATABASE_URL environment variable');
	}

	const url = new URL(process.env.DATABASE_URL);

	url.searchParams.set('schema', schema);

	return url.toString();
}


export default <Environment> {
	name: 'prisma',
	async setup() {
		const schema = randomUUID();
		const databaseURL = generateDatabaseURL(schema);

		// SOBRESCREVENDO A VARIAVEL DE AMBIENTE
		process.env.DATABASE_URL = databaseURL;

		// EXECUTANDO UM COMANDO DE TERMINAL USANDO NODE
		// COMANDO PARA RODAR AS MIGRATIONS E GERAR NOVOS AMBIENTES NO COMEÇO DE CADA TESTE
		execSync('yarn prisma migrate deploy');

		return{
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			async teardown() {
				// COMANDO PARA DELETAR OS NOVOS AMBIENTES NO FINAL DE CADA TESTE
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`
				);

				await prisma.$disconnect();
			},
		};
	}
};