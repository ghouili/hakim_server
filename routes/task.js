const express = require('express');
const taskController = require('../controllers/task');
const route = express.Router();

route.get('/', taskController.GetAll );

route.get('/assistant/:id', taskController.GetAll_assistant );

route.get('/done', taskController.GetAll_done );

route.get('/:id', taskController.FindById );

route.patch('/:id', taskController.Updatetask);

route.delete('/:id', taskController.Deletetask);

route.post('/add', taskController.Ajout);


module.exports = route;