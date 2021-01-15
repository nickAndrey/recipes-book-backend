const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');
const productsController = require('../controllers/products.controller');

router.get('/', controller.loginToAdminPanel);
router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProductById);


module.exports = router;
