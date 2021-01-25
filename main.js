const express = require('express');
const app = express();
const cors = require('cors');

const homeController = require('./controllers/home.controller');

const routes = require('./routes/index');

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', homeController.getHomePage);

app.use('/admin', routes.admin);
app.use('/recipes', routes.recipes);

app.listen(app.get('port'), () => {
  console.log(`Server was running on the port ${app.get('port')}`);
});
