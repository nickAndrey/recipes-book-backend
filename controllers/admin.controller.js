const statuses = require('http-status-codes');
const { Model } = require('../models/model');

exports.loginToAdminPanel = async (req, res) => {
  res.status(200).json({ws: true})
};
