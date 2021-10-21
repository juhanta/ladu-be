const express = require('express');
const  partController  = require('../controllers/partController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router
  
 
  .get('/part', partController.getPartById)
  
  

module.exports = router;