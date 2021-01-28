import { Router } from 'express';
import { homeController } from '../controllers/controllers';

const homeRouter: Router = Router();

homeRouter.get('/', homeController);

export default homeRouter;
