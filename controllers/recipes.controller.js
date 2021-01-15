const httpStatuses = require('http-status-codes');
const { Model } = require('../models/model');
const model = new Model('recipes');

exports.createTable = async (req, res) => {
  try {
    await model.createTable();
    res.status(httpStatuses.OK).json({
      message: 'Success! The table was successfully added.',
    });
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.dropTable = async (req, res) => {
  try {
    await model.dropTable(req.body['reason']);
    res.status(httpStatuses.OK).json({ message: 'Success! Table was successfully dropped.' });
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.recipesCreate = async (req, res) => {
  try {
    const { cookTime, cookingMethod, recipeCategory, recipeCuisine, recipeIngredient, dateCreated } = req.body;
    const columns = 'cookTime, cookingMethod, recipeCategory, recipeCuisine, recipeIngredient, dateCreated';
    const values = `'${cookTime}', '${cookingMethod}', '${recipeCategory}', '${recipeCuisine}', '${recipeIngredient}', '${dateCreated}'`;

    await model.insert(columns, values);
    res.status(httpStatuses.OK).json({
      message: 'Success! The recipe was added successfully.',
    });
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.recipesRead = async (req, res) => {
  try {
    const data = await model.select('*');
    res.status(httpStatuses.OK).json(data);
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.recipesReadById = async (req, res) => {
  try {
    const data = await model.select('*', ` where id = ${req.params.id}`);
    res.status(httpStatuses.OK).json(data.rows);
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.recipesUpdate = async (req, res) => {
  try {
    const { id, cookTime, cookingMethod, recipeCategory, recipeCuisine, recipeIngredient, dateCreated } = req.body;
    const columns = 'cookTime, cookingMethod, recipeCategory, recipeCuisine, recipeIngredient, dateCreated';
    const values = `'${cookTime}', '${cookingMethod}', '${recipeCategory}', '${recipeCuisine}', '${recipeIngredient}', '${dateCreated}'`;

    const data = await model.update(columns, values, id, true);
    res.status(httpStatuses.OK).json(data.rows);
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.recipesDelete = async (req, res) => {
  try {
    const { ids } = req.params;
    await model.deleteMany(ids);
    res.status(httpStatuses.OK).json({
      message: 'Success! The recipes was deleted successfully.',
    });
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};
