const express = require('express');
const  stockController  = require('../controllers/stockController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router
  
 
  .get('/stock/:id', stockController.getStockByCompany)
  .get('/stock', stockController.getStockByPart)
  .post('/stock', stockController.addStockToCompany)
  .get('/stock/part/:partID', stockController.getStockWithAllLots)
  

module.exports = router;