const express = require('express');
const  stockController  = require('../controllers/stockController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router
  
 
  .get('/stock/:id',isLoggedIn, stockController.getStockByCompany)
  .get('/stock/:companyID/:warehouseID/:partID', stockController.getStockByPart)
  .post('/stock', stockController.addStockToCompany)
  .get('/stock/:companyID/:partID', stockController.getStockWithAllLots)
  

module.exports = router;