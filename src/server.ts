import express from 'express';
import { env } from './env';


const app = express();


app.get('/', (req, res) => { 
	res.send('Hello World!');
});


app.listen(env.PORT, () => console.log('listening on port 8080'));