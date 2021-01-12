const statuses = require('http-status-codes');
const { Model } = require('../models/model');

const productsModel = new Model('products');

exports.addProducts = async (req, res) => {
  try {
    const { name, price, description, rating } = req.body;
    const values = `'${name}', '${price}', '${description}', '${rating}'`;
    const columns = 'name, price, description, rating';

    const data = await productsModel.insert(columns, values, true);
    res.status(statuses.OK).json(data.rows);
  } catch (e) {
    res.status(statuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const data = await productsModel.select('*');
    res.status(statuses.OK).json(data.rows);
  } catch (e) {
    res.status(statuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const data = await productsModel.select('*', ` where id = ${req.params.id}`);
    res.status(statuses.OK).json(data.rows[0]);
  } catch (e) {
    res.status(statuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      body: { name, price, description, rating },
      params: { id },
    } = req;
    const values = `'${name}', '${price}', '${description}', '${rating}'`;
    const columns = 'name, price, description, rating';

    const data = await productsModel.update(columns, values, id);
    res.status(statuses.OK).json(data.rows);
  } catch (e) {
    res.status(statuses.BAD_REQUEST).json({ message: e.stack });
  }
};

exports.deleteProduct = async (req, res) => {
	try {
		await productsModel.delete(req.params.id);
		res.status(statuses.OK).json({message: `product with id ${req.params.id} was deleted.`})
	} catch (e) {
		res.status(statuses.BAD_REQUEST).json({ message: e.stack });
	}
}
