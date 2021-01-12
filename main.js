const express = require('express');
const app = express();
const cors = require('cors');

const homeController = require('./controllers/home.controller');

const routes = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', routes.products);

app.get('/', homeController.getHomePage);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server was running on the port ${port}`);
});
