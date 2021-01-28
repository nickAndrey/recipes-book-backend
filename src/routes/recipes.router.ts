import { Router } from 'express';
import {
  recipeCreate,
  recipeRead,
  recipeReadOne,
  recipeUpdate,
  recipeDelete,
  recipeDeleteOne,
} from '../controllers/controllers';

const recipeRouter: Router = Router();

recipeRouter.get('/', recipeRead);

recipeRouter.get('/:id', recipeReadOne);

recipeRouter.post('/', recipeCreate);

recipeRouter.delete('/', recipeDelete);

recipeRouter.delete('/:id', recipeDeleteOne);

recipeRouter.put('/:id', recipeUpdate);

export default recipeRouter;
