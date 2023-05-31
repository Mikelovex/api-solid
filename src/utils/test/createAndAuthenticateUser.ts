import request from 'supertest';

export async function createAndAuthenticateUser(app: any) {
	await request(app)
		.post('/user')
		.send({
			name: 'name',
			email: 'name@example.com',
			password: 'password'
		});


	const authResponse = await request(app)
		.post('/sessions')
		.send({
			email: 'name@example.com',
			password: 'password'
		});


	const {token} = authResponse.body;
    
	return {token};
}