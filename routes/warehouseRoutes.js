const express = require('express');
const  warehouseController  = require('../controllers/warehouseController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router
  
 
  .get('/warehouse', warehouseController.getWarehouse)
  .post('/warehouse', warehouseController.addWarehouse)
  .post('/warehouse/part', warehouseController.addPartToWarehouse)
  

module.exports = router;