const bcrypt = require("bcrypt");
const jwtService = require("./jwtService")
const hashService = require('./hashService');
const { saltRounds } = require("../config");
const db = require("../db")

const usersService = {};

usersService.getUsers = async () => {
    const users = await db.query('SELECT id, firstName, lastName, email FROM user ')
    return users;
  };

usersService.getUserByEmail =  async (email) => {
    const user = await db.query('SELECT id,firstname, lastname, email, password, IsAdmin FROM user WHERE email = ? ', [email])
    return user[0];
  };
//login
usersService.login = async (login) => {
    const { email, password } = login;
    const user = await usersService.getUserByEmail(email);
    if (!user) return { error: 'No user found' };
    const match = await hashService.compare(password, user.password);
    if (!match) return { error: 'Wrong password' };   
    const token = await jwtService.sign(user);
    return { token };
  };
  
  module.exports = usersService;