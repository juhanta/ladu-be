const express = require('express');
const  partClassController  = require('../controllers/partClassController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router
  
 
  .get('/partclass/:id', partClassController.getPartClass)
  .post('/partclass', partClassController.addPartClass)
  

module.exports = router;