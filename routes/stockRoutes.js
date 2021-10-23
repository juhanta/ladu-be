const express = require('express');
const  stockController  = require('../controllers/stockController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router
  
 
  .get('/stock/:id', stockController.getStockByCompany)
  .post('/stock', stockController.addStockToCompany)
  
  

module.exports = router;