const express = require('express');
const userController = require('../controllers/user');
const fileUpload = require("../middleware/file-uploades");

const route = express.Router();

route.get('/', userController.GetAll );

route.get('/:id', userController.FindById );

route.patch('/:id', fileUpload.single("avatar"),  userController.UpdateUser);

route.delete('/:id', userController.Deleteuser);

route.post('/register', fileUpload.single("avatar"), userController.register);

route.post('/login', userController.login);

module.exports = route;