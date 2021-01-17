const httpStatuses = require('http-status-codes');
const { Model } = require('../models/model');
const model = new Model('recipes');

exports.createTable = async (req, res) => {
  try {
    await model.createTable();
    res.status(httpStatuses.OK).json({ message: 'Success! The table was successfully added.' });
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.dropTable = async (req, res) => {
  try {
    const data = await model.dropTable(req.body['reason']);
    let message;

    if (typeof data === 'string') {
      message = data;
    } else {
      message = 'the table was dropped successfully.';
    }
    res.status(httpStatuses.OK).json({ message });
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.recipesCreate = async (req, res) => {
  try {
    const {
      name,
      cooktime,
      cookingmethod,
      recipecategory,
      recipecuisine,
      recipeingredient,
      datecreated,
      author,
      image,
      content,
    } = req.body;
    const columns =
      'name, cooktime, cookingmethod, recipecategory, recipecuisine, recipeingredient, datecreated, author, image, content';
    const values = `
      '${name}',
      '${cooktime}',
      '${cookingmethod}',
      '${recipecategory}',
      '${recipecuisine}',
      '${recipeingredient}',
      '${datecreated}',
      '${author}',
      '${image}',
      '${content}'
    `;

    const data = await model.insert(columns, values, true);
    res.status(httpStatuses.OK).json({
      message: 'Success! The recipe was added successfully.',
      rows: data.rows,
    });
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack, rb: req.body });
  }
};

exports.recipesRead = async (req, res) => {
  try {
    const data = await model.select('*');
    res.status(httpStatuses.OK).json({ rows: data.rows, rowCount: data.rowCount });
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
    const {
      id,
      name,
      cooktime,
      cookingmethod,
      recipecategory,
      recipecuisine,
      recipeingredient,
      datecreated,
      author,
      image,
      content,
    } = req.body;
    const columns =
      'name, cooktime, cookingmethod, recipecategory, recipecuisine, recipeingredient, datecreated';
    const values = `
      '${name}',
      '${cooktime}',
      '${cookingmethod}',
      '${recipecategory}',
      '${recipecuisine}',
      '${recipeingredient}',
      '${datecreated}',
      '${author}',
      '${image}',
      '${content}'
    `;

    const data = await model.update(columns, values, id, true);
    res.status(httpStatuses.OK).json(data.rows);
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack, rb: req.body });
  }
};

exports.recipesDelete = async (req, res) => {
  try {
    const { ids } = req.body;
    await model.deleteMany(ids);
    res.status(httpStatuses.OK).json({
      message: 'Success! The recipes was deleted successfully.',
    });
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};
