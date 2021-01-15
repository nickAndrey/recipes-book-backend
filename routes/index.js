const productsRouter = require('./products.router');
const adminRouter = require('./admin.router');
const recipesRouter = require('./recipes.router');

const routes = {
  products: productsRouter,
  admin: adminRouter,
  recipes: recipesRouter,
};

module.exports = routes;
