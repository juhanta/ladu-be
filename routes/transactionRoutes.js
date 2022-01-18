const express = require('express');
const  transactionController  = require('../controllers/transactionController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router
  
 
  .post('/transaction', isLoggedIn, transactionController.newTransaction)
  .get('/transactiontype/:companyID', transactionController.getTransactionType)
  .get('/transaction/:companyID', transactionController.getCompanyTransactions)
  .get('/transaction/:companyID/:partID', transactionController.getPartTransactions)
  

module.exports = router;