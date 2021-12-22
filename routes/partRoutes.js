const express = require('express');
const  partController  = require('../controllers/partController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router
  
 
  .get('/part', partController.getPartByPartNum)
  .post('/part', partController.addPart)
  .patch('/part/:partNum', partController.changePart)
  .get('/part/:id',partController.getPartsByCompany)

module.exports = router;