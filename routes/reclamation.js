const express = require('express');
const reclamationController = require('../controllers/reclamation');
const fileUpload = require("../middleware/file-uploades");

const route = express.Router();

route.get('/', reclamationController.GetAll );

route.get('/:id', reclamationController.FindById );

route.patch('/:id', reclamationController.Updatereclamation);

route.delete('/:id', reclamationController.Deletereclamation);

route.post('/add', fileUpload.single("image"), reclamationController.Ajout);


module.exports = route;