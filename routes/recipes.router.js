const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipes.controller');

router.get('/', controller.recipesRead);
router.post('/', controller.recipesCreate);
router.delete('/', controller.recipesDelete);
router.get('/:id', controller.recipesReadById);
router.put('/:id', controller.recipesUpdate);

//System endpoints.
router.get('/create_table', controller.createTable);
router.post('/drop_table', controller.dropTable);

module.exports = router;
