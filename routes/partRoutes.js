const express = require('express');
const  partController  = require('../controllers/partController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router
  
 
  .get('/part/:companyID/:partID', partController.getPartByPartNum)
  .post('/part', partController.addPart)
  .patch('/part/:partID', partController.changePart)
  .get('/part/:id',partController.getPartsByCompany)
  .post('/part/warehouse', partController.addParToWarehouse)
  .delete('/part/warehouse', partController.removePartFromWarehouse)
  .get('/partlot/:companyID/:partID',partController.getLotsByPart)
  .post('/partlot',partController.addLot)

module.exports = router;