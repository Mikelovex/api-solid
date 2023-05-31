import {Router} from 'express';
import { ensureAuthenticated } from '../../middlewares/verifyJWT';
import { createCheckInController } from './create';
import { checkInHistoryController } from './history';
import { userMetricsController } from './metrics';
import { validateCheckInController } from './validate';


const checkInRouter = Router();

checkInRouter.use(ensureAuthenticated);
checkInRouter.get('/check-ins/history', checkInHistoryController);
checkInRouter.get('/check-ins/metrics', userMetricsController);
checkInRouter.post('/gyms/:gymId/check-ins', createCheckInController);
checkInRouter.patch('/check-ins/:checkInId/validate', validateCheckInController);


export { checkInRouter };