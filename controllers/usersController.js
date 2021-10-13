const  usersService   = require('../services/usersService');

const usersController = {};

usersController.getUsers = async (req, res) => {
    const users = await usersService.getUsers();
    res.status(200).json({
      users,
    });
  };

usersController.login = async (req, res) => {
    const {
      email, password,
    } = req.body;
    if (!email && !password) {
      return res.status(400).json({
        error: 'Email or password missing',
      });
    }
    const login = {
      email,
      password,
    };
    const data = await usersService.login(login);
    if (data.error) {
      return res.status(403).json({
        error: data.error,
      });
    }
    return res.status(200).json({
      token: data.token,
    });
  };
  
    
    module.exports = usersController;