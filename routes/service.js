const express = require('express');
const serviceController = require('../controllers/service');
const fileUpload = require("../middleware/file-uploades");

const route = express.Router();

route.get('/', serviceController.GetAll );

route.post('/', serviceController.GetAll_for_Client );

route.get('/:id', serviceController.FindById );

route.patch('/:id',  fileUpload.single("image"), serviceController.Updateservice);

route.delete('/:id', serviceController.Deleteservice);

route.post('/add', fileUpload.single("image"), serviceController.Ajout);


module.exports = route;