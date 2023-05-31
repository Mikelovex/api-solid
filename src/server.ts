import express from 'express';
import { env } from './env';
import { checkInRouter } from './http/controllers/check-ins/route';
import { gymRouter } from './http/controllers/gyms/routes';
import { userRouter } from './http/controllers/users/routes';


export const app = express();

app.use(express.json());

app.use(userRouter);
app.use(gymRouter);
app.use(checkInRouter);

app.listen(env.PORT, () => console.log('listening on port 8080'));