const express = require('express');
const  usersController  = require('../controllers/usersController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router
  
 
  .get('/users',isLoggedIn, usersController.getUsers)
  .post('/login', usersController.login)
  

module.exports = router;