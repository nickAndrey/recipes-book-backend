const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipes.controller');

//System endpoints.
router.get('/create_table', controller.createTable);
router.post('/drop_table', controller.dropTable);

router.get('/', controller.recipesRead);
router.get('/:id', controller.recipesReadById);
router.post('/', controller.recipesCreate);
router.delete('/', controller.recipesDelete);
router.put('/:id', controller.recipesUpdate);

module.exports = router;
