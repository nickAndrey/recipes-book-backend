// Add imports
import { Model } from '../models/model';
import { IRecipeModel } from '../models/recipe.model';
import { dataOutPrepare, setAsArray } from '../shared/request.helpers';
import { StatusCodes } from 'http-status-codes';

// Init variables
const model = new Model('recipes');
const tableColumns =
  'name,' +
  'cooktime,' +
  'cookingmethod,' +
  'recipecategory,' +
  'recipecuisine,' +
  'recipeingredient,' +
  'datecreated,' +
  'author,' +
  'image,' +
  'content,' +
  'description';

// Define controllers
export const homeController = async (req: any, res: any) => {
  res.status(200).json({ message: 'success' });
};

export const recipeCreate = async (req: any, res: any) => {
  const body: IRecipeModel = req.body;

  try {
    const values = `
      '${body.name}',
      '${body.cooktime}',
      '${body.cookingmethod}',
      '${body.recipecategory}',
      '${body.recipecuisine}',
      '${setAsArray(body.recipeingredient)}',
      '${body.datecreated}',
      '${body.author}',
      '${body.image}',
      '${body.content}',
      '${body.description}'
    `;

    const data = await model.insert(tableColumns, values, true);

    res.status(StatusCodes.OK).json({
      message: 'Success! The recipe was added successfully.',
      rows: dataOutPrepare(data.rows),
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: e.stack });
  }
};

export const recipeRead = async (req: any, res: any) => {
  try {
    const data = await model.select('*');
    res.status(StatusCodes.OK).json({
      rows: dataOutPrepare(data.rows),
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: e.stack,
    });
  }
};

export const recipeReadOne = async (req: any, res: any) => {
  const { id }: IRecipeModel = req.params;

  try {
    const data = await model.select('*', ` where id = ${id}`);
    res.status(200).json({
      rows: dataOutPrepare(data.rows),
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: e.stack,
    });
  }
};

export const recipeUpdate = async (req: any, res: any) => {
  const body: IRecipeModel = req.body;

  try {
    const values = `
      '${body.name}',
      '${body.cooktime}',
      '${body.cookingmethod}',
      '${body.recipecategory}',
      '${body.recipecuisine}',
      '${setAsArray(body.recipeingredient)}',
      '${body.datecreated}',
      '${body.author}',
      '${body.image}',
      '${body.content}',
      '${body.description}'
    `;

    const data = await model.update(tableColumns, values, body.id, true);
    res.status(200).json({
      rows: dataOutPrepare(data.rows),
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: e.stack,
    });
  }
};

export const recipeDelete = async (req: any, res: any) => {
  const ids: IRecipeModel['id'][] = req.body.ids;

  try {
    await model.deleteMany(ids);
    res.status(StatusCodes.OK).json({
      message: 'Success! The recipes was deleted successfully.',
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: e.stack,
    });
  }
};

export const recipeDeleteOne = async (req: any, res: any) => {
  const id: IRecipeModel['id'] = req.params.id;

  try {
    await model.delete(id);
    res.status(StatusCodes.OK).json({
      message: `Success! The recipe ${id} was deleted successfully.`,
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: e.stack,
    });
  }
};
