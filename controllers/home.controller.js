const statuses = require('http-status-codes');

exports.getHomePage = async (req, res) => {
  res.status(statuses.OK).json({ message: 'success' });
};
