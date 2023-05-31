import {Router} from 'express';
import { ensureAuthenticated } from '../../middlewares/verifyJWT';
import { createGymController } from './create';
import { nearbyGymController } from './nearby';
import { searchGymController } from './search';


const gymRouter = Router();

gymRouter.use(ensureAuthenticated);
gymRouter.post('/gyms', createGymController);
gymRouter.get('/gyms/nearby', nearbyGymController);
gymRouter.get('/gyms/search', searchGymController);


export { gymRouter };