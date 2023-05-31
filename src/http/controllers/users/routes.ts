import {Router} from 'express';
import { authenticateController } from './authenticateController';
import { profileController } from './profileController';
import { registerController } from './registerController';
import { ensureAuthenticated } from '../../middlewares/verifyJWT';


const userRouter = Router();


userRouter.post('/user', registerController);
userRouter.post('/sessions', authenticateController);

userRouter.get('/me', ensureAuthenticated, profileController);

export { userRouter };