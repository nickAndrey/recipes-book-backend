const httpStatuses = require('http-status-codes');
const { Model } = require('../models/model');
const model = new Model('recipes');
const helpers = require('./helpers');

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
    const values = `
      '${req.body.name}',
      '${req.body.cooktime}',
      '${req.body.cookingmethod}',
      '${req.body.recipecategory}',
      '${req.body.recipecuisine}',
      '${helpers.setAsArray(req.body.recipeingredient)}',
      '${req.body.datecreated}',
      '${req.body.author}',
      '${req.body.image}',
      '${req.body.content}',
      '${req.body.description}'
    `;

    const data = await model.insert(tableColumns, values, true);

    res.status(httpStatuses.OK).json({
      message: 'Success! The recipe was added successfully.',
      rows: helpers.dataOutPrepare(data.rows),
    });
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.recipesRead = async (req, res) => {
  try {
    const data = await model.select('*');
    res
      .status(httpStatuses.OK)
      .json({ rows: helpers.dataOutPrepare(data.rows), rowCount: data.rowCount });
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.recipesReadById = async (req, res) => {
  try {
    const data = await model.select('*', ` where id = ${req.params.id}`);
    res.status(httpStatuses.OK).json(helpers.dataOutPrepare(data.rows));
  } catch (e) {
    res.status(httpStatuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.recipesUpdate = async (req, res) => {
  try {
    const values = `
      '${req.body.name}',
      '${req.body.cooktime}',
      '${req.body.cookingmethod}',
      '${req.body.recipecategory}',
      '${req.body.recipecuisine}',
      '${helpers.setAsArray(req.body.recipeingredient)}',
      '${req.body.datecreated}',
      '${req.body.author}',
      '${req.body.image}',
      '${req.body.content}',
      '${req.body.description}'
    `;

    const data = await model.update(tableColumns, values, req.body.id, true);
    res.status(httpStatuses.OK).json(helpers.dataOutPrepare(data.rows));
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
