const express = require('express');
const  transactionController  = require('../controllers/transactionController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router
  
 
  .post('/transaction', transactionController.newTransaction)
  .get('/transactiontype', transactionController.getTransactionType)
  .get('/transaction', transactionController.getCompanyTransactions)
  

module.exports = router;