const express = require('express');
const suggestionController = require('../controllers/suggestion');
const route = express.Router();

route.get('/', suggestionController.GetAll );

route.get('/:id', suggestionController.FindById );

route.patch('/:id', suggestionController.Updatesuggestion);

route.delete('/:id', suggestionController.Deletesuggestion);

route.post('/add', suggestionController.Ajout);


module.exports = route;