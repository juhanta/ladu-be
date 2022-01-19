const express = require('express');
const  companyController  = require('../controllers/companyController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router
  
 
  .get('/company/', isLoggedIn, companyController.getCompanyForUser)
  
  

module.exports = router;